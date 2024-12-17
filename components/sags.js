class ShopCart extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.render();
      this.updateCartDisplay();
      this.addEventListeners();
    }
  
    updateCartDisplay() {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const cartTotal = localStorage.getItem("cartTotal") || 0;
  
      const cartItemsDiv = this.shadowRoot.querySelector("#cart-items");
      cartItemsDiv.innerHTML = cartItems.map(item => `
        <div>${item.name} - $${item.price}</div>
      `).join("");
  
      this.shadowRoot.querySelector("#cart-total").textContent = `Нийт: $${cartTotal}`;
    }
  
    addEventListeners() {
      document.addEventListener("cart-updated", () => this.updateCartDisplay());
      document.addEventListener("open-cart", () => this.openCart());
      this.shadowRoot.querySelector(".closee").addEventListener("click", () => this.closeCart());
    }
  
    openCart() {
      this.shadowRoot.querySelector(".cardtab").style.display = "grid";
    }
  
    closeCart() {
      this.shadowRoot.querySelector(".cardtab").style.display = "none";
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .cardtab { display: none; background-color: #353432; color: white; }
          #cart-items { padding: 10px; }
          #cart-total { text-align: right; padding: 10px; }
        </style>
        <div class="cardtab">
          <h1>Сагс</h1>
          <div id="cart-items"></div>
          <div id="cart-total">Нийт: $0</div>
          <button class="closee">Хаах</button>
        </div>
      `;
    }
  }
  customElements.define("sags.js", ShopCart);
  