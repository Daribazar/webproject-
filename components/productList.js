class ProductList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.products = [];
  }

  connectedCallback() {
    this.render();
    this.loadProducts();
    this.addEventListeners();
  }

  async loadProducts() {
    try {
      const response = await fetch("http://192.168.0.102:3000/product/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const response = await fetch('products.json');
      this.products = await response.json();
      this.renderProducts(this.products);
    } catch (error) {
      console.error("error", error);
    }
  }

renderProducts(products) {
  const productList = this.shadowRoot.querySelector(".product-list");
  productList.innerHTML = "";  
  


  products.forEach((product) => {
    const productCard = document.createElement("product-card");
    productCard.setAttribute("image", product.image);
    productCard.setAttribute("name", product.name);
    productCard.setAttribute("price", product.price);
    productCard.setAttribute("description", product.description);

    productList.appendChild(productCard);
  });
}

  filterProducts(category) {
    const filteredProducts =
      category === "all"
        ? this.products
        : this.products.filter((product) => product.category === category);
    this.renderProducts(filteredProducts);
  }

  addEventListeners() {
    this.shadowRoot.addEventListener("click", (event) => {
      const target = event.target.closest(".product-item");
      if (target) {
        const product = this.products.find(
          (prod) => prod.name === target.querySelector("h3").textContent
        );
        if (product) {
          this.dispatchEvent(
            new CustomEvent("product-click", {
              detail: product,
              bubbles: true,
              composed: true,
            })
          );
        }
      }
    });

    document.addEventListener("category-changed", (event) => {
      this.filterProducts(event.detail);
    });
  }
  render() {
    this.shadowRoot.innerHTML = `
      <div class="product-list"></div>
      <style>
          .product-list {
              margin-left: 250px;
              margin-bottom: 50px;
              display: flex;
              flex-wrap: wrap;
              gap: 20px;
              justify-content: center;
          }
      </style>

    `;
  }
}

customElements.define("product-list", ProductList);
