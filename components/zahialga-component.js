class ZahialgaComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });  // Shadow DOM үүсгэж байна

    // localStorage-аас cartItems болон cartTotal утгуудыг авч байна
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;  
    this.couponCode = '';  // Купон код
    this.discount = 0;  // Хөнгөлөлт

    this.state = {  // Component state
      cartItems: this.cartItems,
      cartTotal: this.cartTotal,
      couponCode: this.couponCode,
      discount: this.discount
    };
  }

  connectedCallback() {
    this.render();
    this.setupCouponHandler();
    this.loadSavedFilters();
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .discounted {
          color: green;
        }
      </style>
      <h3>Таны сагс</h3>
      <ul>
        ${this.state.cartItems.map(item => `<li>${item.name} - ₮${item.price}</li>`).join('')}
      </ul>

      <section class="zahialga">
        <article>
          <h3>Захиалга</h3>
          <h5 id="cart-total">Нийт: ₮${this.state.cartTotal}</h5>
        </article>
        <article>
          <label for="coupon">Купон ашиглах:</label>
          <input type="text" id="coupon" name="coupon" placeholder="Купон код оруулна уу" value="${this.state.couponCode}">
          <button type="button" id="apply-coupon">Купон ашиглах</button>
        </article>
        <article>
          <label for="filter">Барааны шүүлтүүр:</label>
          <select id="filter" name="filter">
            <option value="all">Бүх бараа</option>
            <option value="discounted">Хөнгөлөлттэй бараа</option>
          </select>
        </article>
      </section>

      <slot></slot>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));  
  }

  setupCouponHandler() {
    const applyCouponButton = this.shadowRoot.querySelector('#apply-coupon');
    const couponInput = this.shadowRoot.querySelector('#coupon');
    applyCouponButton.addEventListener('click', () => {
      this.state.couponCode = couponInput.value.trim();
      this.applyCoupon();
    });
  }

  applyCoupon() {
    if (this.state.couponCode === 'DISCOUNT10') {
      this.state.discount = 0.1;  
    } else {
      this.state.discount = 0;
    }
    const discountedPrice = this.state.cartTotal * (1 - this.state.discount);
    this.state.cartTotal = discountedPrice;
    this.render();
    if (this.state.discount > 0) {
      alert('Купон код амжилттай ашиглагдлаа!');
    } else {
      alert('Купон код буруу байна.');
    }
    localStorage.setItem('cartTotal', this.state.cartTotal);
    localStorage.setItem('couponCode', this.state.couponCode);
  }

  loadSavedFilters() {
    const savedFilter = localStorage.getItem('savedFilter') || 'all';
    const filterSelect = this.shadowRoot.querySelector('#filter');
    filterSelect.value = savedFilter;
    filterSelect.addEventListener('change', () => {
      localStorage.setItem('savedFilter', filterSelect.value);
    });
  }
}

window.customElements.define('zahialga-component', ZahialgaComponent);
