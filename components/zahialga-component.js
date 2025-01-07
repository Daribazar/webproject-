class ZahialgaComponent extends HTMLElement {
  constructor() {
    super();
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;
    this.couponCode = '';
    this.discount = 0;
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
    this.setupCouponHandler();
  }
  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .zahialga { margin-top: 20px; }
        .cart-total { font-weight: bold; }
      </style>
      
      <h3>Таны сагс</h3>
      <ul>
        ${this.cartItems.map(item => `<li>${item.name} - ₮${item.price}</li>`).join('')}
      </ul>

      <section class="zahialga">
        <article>
          <h3>Захиалга</h3>
          <h5 class="cart-total">Нийт: ₮<span id="cart-total">${this.cartTotal}</span></h5>
        </article>
        <article>
          <label for="coupon">Купон ашиглах:</label>
          <input type="text" id="coupon" name="coupon" placeholder="Купон код оруулна уу">
          <button type="button" id="apply-coupon">Купон ашиглах</button>
        </article>
      </section>
      <slot name="extra-content">qwerty</slot>
      <slot name="promotion-content">asdfghjk</slot>
    `;
    
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  setupCouponHandler() {
    const applyCouponButton = this.shadowRoot.querySelector('#apply-coupon');
    const couponInput = this.shadowRoot.querySelector('#coupon');
    applyCouponButton.addEventListener('click', () => {
      this.couponCode = couponInput.value.trim();
      this.applyCoupon();
    });
  }

  applyCoupon() {
    if (this.couponCode === 'DISCOUNT10') {
      this.discount = 0.1;
    } else {
      this.discount = 0;
    }

    const discountedPrice = this.cartTotal * (1 - this.discount);
    this.cartTotal = discountedPrice;

    this.render();

    if (this.discount > 0) {
      alert('Купон код амжилттай ашиглагдлаа!');
    } else {
      alert('Купон код буруу байна.');
    }

    localStorage.setItem('cartTotal', this.cartTotal);
  }
}

window.customElements.define('zahialga-component', ZahialgaComponent);
