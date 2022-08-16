import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  #modalCartWrapper = document.createElement("div");

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!this.#checkProduct(product)) return;

    let cartItem = this.#getProductByID(product?.id);
    if (cartItem) {
      cartItem.count++;
    } else {
      cartItem = { product, count: 1 };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    const cartItem = this.#getProductByID(productId);
    if (!cartItem) return;
    cartItem.count += amount;
    if (cartItem.count <= 0)
      this.cartItems = this.cartItems.filter((val) => val?.product?.id !== productId);

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, val) => sum + val.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, val) => sum + val.count * val.product.price,
      0
    );
  }

  #checkProduct(product) {
    return !Boolean(product)
      ? false
      : (typeof product === "object" && "id",
        "image",
        "name",
        "price",
        "category" in product);
  }

  #getProductByID(id) {
    return this.cartItems.find((val) => val?.product?.id === id);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    modal.setTitle("Your order");

    this.#modalCartWrapper.innerHTML = "";
    modal.setBody(this.#modalCartWrapper);

    this.cartItems.forEach((element) => {
      this.#modalCartWrapper.append(
        this.renderProduct(element.product, element.count)
      );
    });

    this.#modalCartWrapper.append(this.renderOrderForm());

    this.#modalCartWrapper.addEventListener("click", (event) => {
      const plusButtonPushed = event.target.closest(
        ".cart-counter__button_plus"
      );
      const minusButtonPushed = event.target.closest(
        ".cart-counter__button_minus"
      );

      const currentCartProduct =
        event.target.closest(".cart-product").dataset.productId;

      if (plusButtonPushed) this.updateProductCount(currentCartProduct, 1);
      if (minusButtonPushed) this.updateProductCount(currentCartProduct, -1);

    });

    modal.open();
  }

  onProductUpdate(cartItem) {
    // ...ваш код
    const modalCartCounter = this.#modalCartWrapper.querySelector(
      `[data-product-id=${cartItem.product.id}] .cart-counter__count`
    );
    if (modalCartCounter) modalCartCounter.innerHTML = cartItem.count;

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    // ...ваш код
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
