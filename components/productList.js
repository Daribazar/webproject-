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
      const response = await fetch("products.json");
      this.products = await response.json();
      this.renderProducts(this.products);
    } catch (error) {
      console.error("error", error);
    }
  }

  renderProducts(products) {
    const productList = this.shadowRoot.querySelector(".product-list");
    productList.innerHTML = products
      .map(
        (product) => `
          <div class="product-item" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Үнэ: ${product.price}</p>
          </div>
        `
      )
      .join("");
  }

  filterProducts(category) {
    const filteredProducts = category === "all" ? this.products : this.products.filter((product) => product.category === category);
    this.renderProducts(filteredProducts);
  }

  addEventListeners() {
    this.shadowRoot.addEventListener("click", (event) => {
      const target = event.target.closest(".product-item");
      if (target) {
        const product = this.products.find((prod) => prod.name === target.querySelector("h3").textContent);
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
      <style>
        .product-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          margin: 20px 250px;
        }
        .product-item {
          width: 220px;
          background-color: #f5e1dc;
          border: 1px solid #e0ba76;
          border-radius: 10px;
          padding: 10px;
          text-align: center;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .product-item:hover {
          transform: scale(1.05);
        }
        .product-item img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          margin-bottom: 10px;
        }
      </style>
      <div class="product-list"></div>
    `;
  }
}

customElements.define("product-list", ProductList);