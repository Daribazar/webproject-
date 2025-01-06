class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style> 
        header {
            font-family: Arial, sans-serif;
            background-color: #D8A7A1;
            color: #3B1F1A;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px; /* Adds spacing inside the header */
            box-sizing: border-box; /* Ensures padding doesn't affect width */
        }

        header a img {
            width: 50px;
            height: 50px;
        }

        header nav {
            flex-grow: 1; /* Fills the space between the logo and iconcard */
            display: flex;
            justify-content: center; /* Centers the navigation links */
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

        header .iconcard {
            position: relative;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        header .iconcard span {
            display: flex;
            height: 25px;
            width: 25px;
            background-color: #F5E1DC;
            justify-content: center;
            align-items: center;
            color: #000;
            border-radius: 50%;
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
            font-family: Arial, Helvetica, sans-serif;
        }
      </style>
      <header>
          <a href="home.html">
              <img src="/image/Bakery Bread Illustration.png" alt="Company Logo">
          </a>
          <nav>
              <a href="home.html">Нүүр</a>
              <a href="bvteegdehvvn.html">Бүтээгдэхүүн</a>
              <a href="salbar.html">Салбарын мэдээлэл</a>
              <a href="login.html">Нэвтрэх</a>
          </nav>      
      </header>
    `;
  }
  connectedCallback() {
    document.addEventListener("cart-updated", (event) => {
      this.updateCartInfo(event.detail);
    });
  }
  updateCartInfo({ totalQuantity, totalPrice }) {
    this.shadowRoot.querySelector("#cart-counter").textContent = totalQuantity;
  }
}
customElements.define("header-component", HeaderComponent);
