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
            align-items: flex-start; 
            }
                .sidebar {
    width: 220px;
    background-color: #F5E1DC;
    color: #E0BA76;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    margin: 0; 
    position: fixed; 
    top: 20px; 
    left: 0;
    height: calc(100vh - 40px); 
    overflow-y: auto; 
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
                margin-left: 250px;

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
    }
  
    onCategoryChange(event) {
      const selectedCategory = event.target.value;
      const url = new URL(window.location);
      url.searchParams.set('category', selectedCategory);
      window.history.pushState({}, '', url);
      this.dispatchEvent(
        new CustomEvent("category-changed", {
          detail: selectedCategory,
          bubbles: true,
          composed: true,
        })
      );
    }
  }
  
  document
  .querySelector("category-sidebar")
  .addEventListener("category-change", (event) => {
    const productList = document.querySelector("product-list");
    productList.filterProducts(event.detail.category);
  });

  customElements.define("category-sidebar", CategorySidebar);