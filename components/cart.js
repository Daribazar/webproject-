class Cart extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.items = [];
      this.overlayVisible = false;
    }
  
    connectedCallback() {
      this.loadItems(); 
      this.render();
      document.addEventListener("add-to-cart", this.receiveItems.bind(this));
      this.addEventListener("click", this.toggleOverlay.bind(this)); 
    }
  
    disconnectedCallback() {
      document.removeEventListener("add-to-cart", this.receiveItems.bind(this));
    }
  
    toggleOverlay() {
      this.overlayVisible = !this.overlayVisible;
      this.render();
    }
  
    receiveItems(event) {
      const productData = event.detail;
      console.log("Received product data:", productData);
      this.items.push(productData);
      this.saveItems(); 
      this.render();
    }
  
    removeItem(index) {
      this.items.splice(index, 1); 
      this.saveItems(); 
      this.render(); 
    }

    saveItems() {
      localStorage.setItem("cartItems", JSON.stringify(this.items));
    }

    loadItems() {
      const storedItems = localStorage.getItem("cartItems");
      if (storedItems) {
        this.items = JSON.parse(storedItems);
      }
    }

    calculateTotalPrice() {
      return this.items.reduce((total, item) => total + parseFloat(item.price), 0);
    }
  
    render() {
      const totalPrice = this.calculateTotalPrice(); 
  
      this.shadowRoot.innerHTML = `
        <div class="cart">
          <span style="margin-right: 8px;">🛒</span>Сагс : 
          <span>${this.items.length}</span>
        </div>
  
        <div class="overlay ${this.overlayVisible ? "visible" : ""}">
          <div class="overlay-content">
            <h3>Сагсан дахь бараанууд</h3>
            <ul>
              ${this.items
                .map(
                  (item, index) => `
                <div class="cartContainer">
                  <div class="cartItemContainer">
                      <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
                      <h4>${item.name}</h4>
                      <p>${item.price}</p>
                      <button class="remove-btn" data-index="${index}">-</button>
                  </div>
                </div>
              `
                )
                .join("")}
            </ul>
            <div class="total-price">
              <p>Нийт үнэ: ${totalPrice}₮</p>
            </div>
            <button class="close-btn" onclick="this.getRootNode().host.toggleOverlay()">Хаах</button>
            <button class="order-btn">Захиалах</button>
          </div>
        </div>
  
        <style>
          .cartContainer {
              display: flex;
              justify-content: center;     
              width: 100%;
          }
          .cartItemContainer {
              display: flex;
              align-items: center;
              justify-content: space-between;     
              width: 300px;
          }
          .cart {
            max-width: 250px;
            cursor: pointer;
            padding: 16px;
            margin-left: 300px;
            font-size: 32px;
            margin-bottom: 16px;
            border-radius: 8px;
          }
  
          .cart:hover {
            background-color: #f2f2f2;
          }
  
          .overlay {
            position: fixed;
            top: 0;
            right: -500px; /* Initially hidden offscreen */
            width: 500px;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 50px;
            transition: right 0.3s ease-in-out;
            z-index: 1000;
          }
  
          .overlay.visible {
            right: 0; 
          }
  
          .overlay-content {
            text-align: center;
            width: 100%;
          }
  
          .overlay-content h3 {
            font-size: 24px;
            margin-bottom: 20px;
          }
  
          .overlay-content ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }
  
          .overlay-content li {
            margin-bottom: 10px;
          }
  
          .remove-btn {
            background-color: #e74c3c;
            border: none;
            padding: 5px 10px;
            color: white;
            cursor: pointer;
            border-radius: 5px;
            font-size: 14px;
          }
  
          .remove-btn:hover {
            background-color: #c0392b;
          }
  
          .order-btn {
            background-color: #f39c12;
            border: none;
            padding: 10px;
            color: white;
            cursor: pointer;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 20px;
          }
  
          .order-btn:hover {
            background-color: #e67e22;
          }
  
          .close-btn {
            background-color: #e74c3c;
            border: none;
            padding: 10px;
            color: white;
            cursor: pointer;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 20px;
          }
  
          .close-btn:hover {
            background-color: #c0392b;
          }
  
          .total-price {
            margin-top: 20px;
            font-size: 20px;
            font-weight: bold;
          }
        </style>
      `;

      const removeButtons = this.shadowRoot.querySelectorAll(".remove-btn");
      removeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const index = parseInt(event.target.getAttribute("data-index"));
          this.removeItem(index);

        });
      });
  
      const closeButton = this.shadowRoot.querySelector(".close-btn");
      if (closeButton) {
        closeButton.addEventListener("click", () => this.toggleOverlay());
      }
  
      const orderButton = this.shadowRoot.querySelector(".order-btn");
      if (orderButton) {
        orderButton.addEventListener("click", () => {
          localStorage.setItem("cartItems", JSON.stringify(this.items)); // Сагсны өгөгдлийг хадгалах
          localStorage.setItem("cartTotal", this.calculateTotalPrice()); // Нийт үнийг хадгалах
          window.location.href = "zahialga.html"; // Захиалга руу шилжүүлэх
        });
      }
    }
  }
  
  customElements.define("cart-component", Cart);
  
