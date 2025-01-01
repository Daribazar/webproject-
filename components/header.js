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
            justify-content: space-aroundff;
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

customElements.define("header-component", HeaderComponent);
