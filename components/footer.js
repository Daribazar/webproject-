class FooterComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
    <footer>
      <style>
        footer {
        background: #9a7c7c;
        color: #171616;
        width: 100%;
        text-align: center;
        margin: 0;
        position: relative;
        box-sizing: border-box;
        padding: top;
    }

    .footer-container {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .footer-section {
        width: 23%;
        padding: 10px;
        box-sizing: border-box;
        color: #bbb;
    }

    .footer-section h2 {
        margin-bottom: 15px;
        font-size: 1.2em;
        color: #f5f5f5;
    }

    .footer-section p, 
    .footer-section ul, 
    .footer-section a {
        color: #bbb;
        text-decoration: none;
        font-size: 0.9em;
    }

    .footer-section ul {
        list-style: none;
        padding: 0;
    }

    .footer-section ul li {
        margin: 5px 0;
    }

    .footer-section .social a {
        margin: 0 10px;
        display: inline-block;
    }

    .footer-bottom {
        padding: 10px;
        background: #463232;
        font-size: 0.8em;
        color: #bbb;
        margin-bottom: 0;
    }
    </style>
    <div class="footer-container">
        <div class="footer-section about">
            <h2>About Us</h2>
            <p>We are a company dedicated to providing the best services to our customers. Our goal is to enhance the experience of every user.</p>
        </div>
        <div class="footer-section links">
            <h2>Quick Links</h2>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>

        <div class="footer-section social">
            <h2>Follow Us</h2>
            <a href="#"><img src="facebook-icon.png" alt="Facebook" width="20" height="20"></a>
            <a href="#"><img src="twitter-icon.png" alt="Twitter" width="20" height="20"></a>
            <a href="#"><img src="instagram-icon.png" alt="Instagram" width="20" height="20"></a>
            <a href="#"><img src="linkedin-icon.png" alt="LinkedIn" width="20" height="20"></a>
           <a href="sanalhuselt.html">Санал хүсэлт</a>
        </div>

        <div class="footer-section contact">
            <h2>Contact Us</h2>
            <p>Email: info@company.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 Street Name, City, Country</p>
        </div>
    </div>

    <div class="footer-bottom">
        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
    </div>
</footer>
        `;
  }
}

customElements.define("footer-component", FooterComponent);
