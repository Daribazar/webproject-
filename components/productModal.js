class ProductModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  openModal(product) {
    this.shadowRoot.querySelector("#modal-title").textContent = product.name;
    this.shadowRoot.querySelector("#modal-image").src = product.image;
    this.shadowRoot.querySelector("#modal-price").textContent = `Үнэ: ${product.price}`;
    this.shadowRoot.querySelector("#modal-description").textContent = product.description;
    this.shadowRoot.querySelector("#product-modal").style.display = "block";
  }

  closeModal() {
    this.shadowRoot.querySelector("#product-modal").style.display = "none";
  }

  addEventListeners() {
    this.shadowRoot.querySelector(".close").addEventListener("click", () => {
      this.closeModal();
    });

    document.addEventListener("product-click", (event) => {
      this.openModal(event.detail);
    });
  }
  

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .modal {
          display: none;
          position: fixed;
          z-index: 10;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
          background-color: #fff;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          max-width: 500px;
          border-radius: 10px;
          text-align: center;
        }
        .close {
          cursor: pointer;
          float: right;
          font-size: 24px;
          color: #aaa;
        }
        .modal img {
          width: 100%;
          height: auto;
        }
          .btn {
        display: inline-block;
         background-color: #D8A7A1;
        color: black;
       padding: 0.75rem 1.5rem;
       text-decoration: none;
       border-radius: 4px;
       transition: background-color 0.3s;
  }
      </style>
      <div id="product-modal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2 id="modal-title"></h2>
          <img id="modal-image" alt="Product Image" />
          <p id="modal-price"></p>
          <p id="modal-description"></p>
          <a href="#" class="btn" onclick="addToCart(event)">Захиалах</a>
        </div>
      </div>
    `;
  }
}

customElements.define("product-modal", ProductModal);