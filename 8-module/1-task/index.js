import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition() {
    if (window.pageYOffset) {
      const cart = document.querySelector(".cart-icon");
      const containerRect = document
        .querySelector(".container")
        .getBoundingClientRect();

      const cartLeftShift =
        containerRect.width + cart.clientWidth + 20 < containerRect.right
          ? containerRect.right + 20
          : document.documentElement.clientWidth - cart.offsetWidth - 10;
      cart.style = `position: fixed; top: 50px; z-index: 900; left: ${cartLeftShift}px;`;
    }
  }
}
