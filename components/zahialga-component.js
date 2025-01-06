class ZahialgaComponent extends HTMLElement {
  constructor() {
    super();
    // localStorage-аас cartItems болон cartTotal утгуудыг авч байна
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;  // Тоон утгаар хөрвүүлж байна
    this.couponCode = '';  // Купон код
    this.discount = 0;  // Хөнгөлөлт
  }

  connectedCallback() {
    this.render();
    this.setupCouponHandler();
  }

  render() {
    this.innerHTML = `
      <h3>Таны сагс</h3>
      <ul>
        ${this.cartItems.map(item => `<li>${item.name} - ₮${item.price}</li>`).join('')}
      </ul>

      <section class="zahialga">
        <article>
          <h3>Захиалга</h3>
          <h5 id="cart-total">Нийт: ₮${this.cartTotal}</h5>
        </article>
        <article>
          <label for="coupon">Купон ашиглах:</label>
          <input type="text" id="coupon" name="coupon" placeholder="Купон код оруулна уу">
          <button type="button" id="apply-coupon">Купон ашиглах</button>
        </article>
      </section>
    `;
  }

  setupCouponHandler() {
    const applyCouponButton = this.querySelector('#apply-coupon');
    const couponInput = this.querySelector('#coupon');
    applyCouponButton.addEventListener('click', () => {
      this.couponCode = couponInput.value.trim();
      this.applyCoupon();
    });
  }

  applyCoupon() {
    // Купон кодыг шалгах логик (жишээ нь "DISCOUNT10")
    if (this.couponCode === 'DISCOUNT10') {
      this.discount = 0.1;  // 10% хөнгөлөлт
    } else {
      this.discount = 0;
    }

    // Хөнгөлөлт хэрэглэх
    const discountedPrice = this.cartTotal * (1 - this.discount);
    this.cartTotal = discountedPrice;

    // Хөнгөлөлттэй үнийн дүнг шинэчлэх
    this.render();

    // Хөнгөлөлтийн мэдэгдэл
    if (this.discount > 0) {
      alert('Купон код амжилттай ашиглагдлаа!');
    } else {
      alert('Купон код буруу байна.');
    }

    // localStorage-д шинэ үнийн дүнг хадгалах
    localStorage.setItem('cartTotal', this.cartTotal);
  }
}

window.customElements.define('zahialga-component', ZahialgaComponent);
