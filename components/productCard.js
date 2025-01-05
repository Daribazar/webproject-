class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.image = "";
    this.name = "";
    this.price = "";
    this.overlayVisible = false;
  }

  connectedCallback() {
    this.image = this.getAttribute("image") || "";
    this.name = this.getAttribute("name") || "";
    this.price = this.getAttribute("price") || "";
    this.render();
    this.addEventListener("click", this.toggleOverlay.bind(this));
  }

  static get observedAttributes() {
    return ["image", "name", "price"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
      this.render();
    }
  }

  set image(value) {
    this._image = value;
  }

  get image() {
    return this._image;
  }

  set name(value) {
    this._name = value;
  }

  get name() {
    return this._name;
  }

  set price(value) {
    this._price = value;
  }

  get price() {
    return this._price;
  }

  toggleOverlay() {
    this.overlayVisible = !this.overlayVisible;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <div class="product-item">
          <img src="${this._image}" alt="${this._name}">
          <h3>${this._name}</h3>
          <p>Үнэ: ${this._price}</p>
        </div>
  
        <div class="overlay ${this.overlayVisible ? "visible" : ""}">
          <div class="overlay-content">
            <img src="${this._image}" alt="${this._name}">
            <h3>${this._name}</h3>
            <p>Detailed information about the product...</p>
            <button class="order-btn">Захиалах</button>
          </div>
        </div>
  
        <style>
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
          .product-item img , .overlay-content img{
            width: 100%;
            height: auto;
            border-radius: 8px;
            margin-bottom: 10px;
          }
  
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .overlay.visible {
            display: flex;
          }
  
          .overlay-content {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            width: 300px;
          }
  
          .order-btn {
            background-color: #e0ba76;
            border: none;
            padding: 10px;
            margin-top: 10px;
            cursor: pointer;
            border-radius: 5px;
          }
          .order-btn:hover {
            background-color: #c7a45b;
          }
        </style>
      `;

    const orderButton = this.shadowRoot.querySelector(".order-btn");
    orderButton.addEventListener("click", () => {
      console.log("zahiallaa");
      this.render();
    });
  }
}

customElements.define("product-card", ProductCard);
