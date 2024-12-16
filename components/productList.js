class ProductList extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.products = [];
    }
  
    connectedCallback() {
      this.render();
      window.addEventListener(
        "category-changed",
        this.onCategoryChanged.bind(this)
      );
      this.loadProducts();
    }
  
    async loadProducts() {
      try {
        const response = await fetch("products.json"); // jsin file tataj awch bn
        this.products = await response.json();
        this.renderProducts(this.products);
      } catch (error) {
        console.error("error", error);
      }
    }
  
    renderProducts(products) {
      const productList = this.shadowRoot.querySelector(".product-list"); //product listees json file-aar daraah value nuudig awj bn
      productList.innerHTML = products
        .map(
          (product) => `
              <div class="product-item">
                  <img src="${product.image}" alt="${product.name}">
                  <h3>${product.name}</h3>
                  <p>Үнэ: ${product.price}</p>
              </div>
          `
        )
        .join("");
    }
  
    onCategoryChanged(event) {
      const category = event.detail;
      this.filterProducts(category);
    }
  
    filterProducts(category) {
      const filteredProducts =
        category === "all"
          ? this.products
          : this.products.filter((product) => product.category === category);
      this.renderProducts(filteredProducts);
    }
  
    render() {
      this.shadowRoot.innerHTML = `
              <style>
                .product-section {
                    flex-grow: 1;
                    margin-left: 20px;
                }
  
                .product-section h1 {
                    font-size: 26px;
                    color: #222;
                    text-align: center;
                    margin-bottom: 30px;
                    margin-top: 10px;
                }
  
                .product-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    justify-content: center;
                }
  
                .product-item {
                    width: 220px;
                    background-color: #F5E1DC;
                    border: 1px solid #E0BA76;
                    border-radius: 10px;
                    padding: 10px;
                    text-align: center;
                    transition: transform 0.2s;
                }
  
                .product-item:hover{
                    transform: scale(1.05);
                }
  
                .product-item img {
                    width: 100%;
                    height: auto;
                    border-radius: 8px;
                    margin-bottom: 10px;
                }
  
                .product-item h3 {
                    font-size: 18px;
                    color: #D8A7A1;
                    margin-bottom: 5px;
                }
  
                .product-category {
                    display: inline-block;
                    background-color: #E0BA76;
                    color: #FFF;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 14px;
                    margin-bottom: 10px;
                }
  
                .description {
                    font-size: 14px;
                    color: #D8A7A1;s
                    margin-top: 10px;
                }
                </style>
                <div class="product-list"></div>
              `;
                  }
  }

  document
  .querySelector("category-sidebar")
  .addEventListener("category-change", (event) => {
    const productList = document.querySelector("product-list");
    productList.filterProducts(event.detail.category);
  });

  customElements.define("product-list", ProductList);