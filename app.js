// Header hesgiig compinent bolgow
class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
    <style>    
header {
    width: 100%;
    padding: 0px;
    background-color: #D8A7A1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #3B1F1A;
    font-weight: italic;
    font-family: cursive;
}

header nav a {
    margin: 0 15px;
    color: #3B1F1A;
    text-decoration: none;
    font-size: 18px;
    transition: color 0.2s;
}

header nav a:hover {
    color: #7B4B47;
}

header .iconcard{
    position: relative;
    cursor: pointer;
}

header .iconcard span{
    display: flex;
    height: 25px;
    width: 25px;
    background-color: #F5E1DC;
    justify-content: center;
    align-items: center;
    color: #000;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    font-family: Arial, Helvetica, sans-serif;
}
            </style>
            <header>
                <a href="home.html">
                    <img src="/image/Bakery Bread Illustration.png" alt="Company Logo" style="width: 80px; height: auto;">
                </a>
                <nav>
                    <a href="home.html">Нүүр</a>
                    <a href="app.html">Бүтээгдэхүүн</a>
                    <a href="salbar.html">Салбарын мэдээлэл</a>
                    <a href="login.html">Нэвтрэх</a>
                </nav>
                <div class="iconcard">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
                    </svg>
                    <span id="cart-counter">0</span>
                </div>
            </header>
        `;
  }
}

// Category hesgiig component bolgow
class CategorySidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
            <style>
  
.container {
    display: flex;
    width: 100%;
    margin: 20px auto;
}
.sidebar {
    width: 220px;
    background-color: #F5E1DC;
    color: #E0BA76;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    margin-left: 50px;
}

.sidebar h2 {
    font-size: 22px;
    margin-bottom: 20px;
    border-bottom: 1px solid #E0BA76;
    padding-bottom: 10px;
}
.category-list {
    list-style-type: none;
}

.category-list li {
    font-size: 16px;
    margin: 10px 0;
    cursor: pointer;
}

.category-list li:hover {
    color: #FFF;
}

.extra-info {
    margin-top: 20px;
    padding: 10px;
    background-color: #E0BA76;
    color: #D8A7A1;
    border-radius: 5px;
    font-weight: bold;
}

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
    color: #D8A7A1;
    margin-top: 10px;
}
    </style>
        <label for="category">Бүтээгдэхүүний төрөл:</label>
            <select id="category">
                <option value="all">Бүгд</option>
                <option value="Dessert">Дессерт</option>
                <option value="Cake">Бялуу</option>
                <option value="Bread">Талх</option>
                <option value="Salad">Салат</option>
                <option value="Food">Хоол</option>
            </select>
        `;
    this.addEventListeners();
  }

  addEventListeners() {
    this.shadowRoot
      .querySelector("#category")
      .addEventListener("change", this.onCategoryChange.bind(this));
      console.log()
  }

  onCategoryChange(event) {
    const selectedCategory = event.target.value;
    const url = new URL(window.location);
    url.searchParams.set('category', selectedCategory);
    window.history.pushState({}, '', url);
    // this.dispatchEvent(
    //   new CustomEvent("category-changed", {
    //     detail: selectedCategory,
    //     bubbles: true,
    //     composed: true,
    //   })
    // );
  }
}

customElements.define("category-sidebar", CategorySidebar);

// Product List Component
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

customElements.define("product-list", ProductList);
customElements.define("header-component", HeaderComponent);
customElements.define("category-sidebar", CategorySidebar);
customElements.define("product-list", ProductList);
document
  .querySelector("category-sidebar")
  .addEventListener("category-change", (event) => {
    const productList = document.querySelector("product-list");
    productList.filterProducts(event.detail.category);
  });
