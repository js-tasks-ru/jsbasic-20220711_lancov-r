import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";


import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  #modal;
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
      this.cartItems = this.cartItems.filter(
        (val) => val?.product?.id !== productId
      );

    this.onProductUpdate(cartItem);
  }

  onProductUpdate(cartItem) {
    // ...ваш код
    if (document.body.classList.contains("is-modal-open")) {
      if (this.getTotalCount() === 0) {
        this.#modalCartWrapper.onclick = "";
        this.#modal.close();
      }
      if (cartItem.count === 0) {
        this.#modalCartWrapper
          .querySelector(`[data-product-id=${cartItem.product.id}]`)
          .remove();
      } else {
        const cartProduct = this.#modalCartWrapper.querySelector(
          `[data-product-id=${cartItem.product.id}]`
        );

        cartProduct.querySelector(`.cart-counter__count`).innerHTML =
          cartItem.count;

        cartProduct.querySelector(`.cart-product__price`).innerHTML = `€${(
          cartItem.count * cartItem.product.price
        ).toFixed(2)}`;

        this.#modalCartWrapper.querySelector(
          `.cart-buttons__info-price`
        ).innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      }
    }

    this.cartIcon.update(this);
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
    return Object.prototype.toString.apply(product) === '[object Object]' 
    && "id" in product 
    && "image" in product
    && "name" in product
    && "price" in product
    && "category" in product 
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
    this.#modal = new Modal();
    this.#modal.setTitle("Your order");

    this.#modalCartWrapper.innerHTML = "";
    this.#modal.setBody(this.#modalCartWrapper);

    this.cartItems.forEach((element) => {
      this.#modalCartWrapper.append(
        this.renderProduct(element.product, element.count)
      );
    });

    this.#modalCartWrapper.append(this.renderOrderForm());

    this.#modalCartWrapper.onclick = (event) => {
      event.target.closest(".cart-counter__button_plus") &&
        this.updateProductCount(event.target.closest(".cart-product").dataset.productId,  1 );

      event.target.closest(".cart-counter__button_minus") &&
        this.updateProductCount(event.target.closest(".cart-product").dataset.productId, -1 );
    };

    this.#modal.modalCloseListeners.push({
      eventName: 'click',
      callBackFunc: ()=>{
         this.cartIcon.update(this);
      }  
    })
 


    this.#modalCartWrapper.querySelector("form").onsubmit = this.onSubmit;
    this.#modal.open();
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.#modalCartWrapper
      .querySelector("[type=submit]")
      .classList.add("is-loading");

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: new FormData(this.#modalCartWrapper.querySelector(".cart-form")),
    }).then((response) => {
      if (response.ok) {
        this.#modal.setTitle('Success!');
        this.cartItems = [];  
        this.#modalCartWrapper.onclick = "";
        this.#modal.setBody(createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
        `))
      }
    });

  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

 