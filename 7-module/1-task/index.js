import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._elem = document.createElement("div");
    this._elem.classList.add("ribbon");

    this._initRibbonMenuMarkup();
    this._initRibbonMenuEvents();
  }

  get elem() {
    return this._elem;
  }

  _initRibbonMenuMarkup() {
    const ribbonInner = document.createElement("div");
    ribbonInner.classList.add("ribbon__inner");

    this.categories.forEach((element, index) => {
      ribbonInner.insertAdjacentHTML(
        "beforeend",
        `<a href="#" class="ribbon__item ${(index = 0
          ? "ribbon__item_active"
          : "")}" data-id="${element.id}">${element.name}</a>`
      );
    });

    this._elem.append(ribbonInner);

    this._elem.insertAdjacentHTML(
      "afterbegin",
      `<button class="ribbon__arrow ribbon__arrow_left ">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>`
    );
    this._elem.insertAdjacentHTML(
      "beforeend",
      `<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`
    );
  }

  _initRibbonMenuEvents() {
    const ribbonInner = this._elem.querySelector(".ribbon__inner");
    const ribbonMenuArrowLeft = this._elem.querySelector(".ribbon__arrow_left");
    const ribbonMenuArrowRight = this._elem.querySelector(
      ".ribbon__arrow_right"
    );

    // ribbonMenuArrowLeft.style.display = "none";
    // ribbonMenuArrowLeft.style.userSelect = "none";
    // ribbonMenuArrowRight.style.userSelect = "none";

    ribbonMenuArrowLeft.addEventListener("click", this._ribbonMenuScrolling);
    ribbonMenuArrowLeft.addEventListener(
      "click",
      this._ribbonMenuArrowButtonVisibility
    );

    ribbonMenuArrowRight.addEventListener("click", this._ribbonMenuScrolling);
    ribbonMenuArrowRight.addEventListener(
      "click",
      this._ribbonMenuArrowButtonVisibility
    );

    ribbonInner.addEventListener("click", this._ribbonInnerClickEvent);
  }

  _ribbonMenuScrolling(event) {
    const ribbonMenu = event.currentTarget.closest(".ribbon");
    const ribbonInner = ribbonMenu.querySelector(".ribbon__inner");

    let scrollDirection = 0;
    if (event.currentTarget.matches(".ribbon__arrow_left")) scrollDirection--;
    if (event.currentTarget.matches(".ribbon__arrow_right")) scrollDirection++;

    const scrollStep = 350 * scrollDirection;

    ribbonInner.scrollBy(scrollStep, 0);
  }

  _ribbonMenuArrowButtonVisibility(event) {
    function setButtonVisibilityClass(elem, visibilityState) {
      if (!visibilityState) {
        elem.classList.add("ribbon__arrow_visible");
      } else {
        elem.classList.remove("ribbon__arrow_visible");
      }
    }

    const ribbonMenu = event.currentTarget.closest(".ribbon");
    const ribbonInner = ribbonMenu.querySelector(".ribbon__inner");
    const ribbonMenuArrowLeft = ribbonMenu.querySelector(".ribbon__arrow_left");
    const ribbonMenuArrowRight = ribbonMenu.querySelector(
      ".ribbon__arrow_right"
    );

    setButtonVisibilityClass(ribbonMenuArrowLeft, ribbonInner.scrollLeft === 0);
    setButtonVisibilityClass(
      ribbonMenuArrowRight,
      ribbonInner.scrollWidth -
        ribbonInner.scrollLeft -
        ribbonInner.clientWidth ===
        0
    );
  }

  _ribbonInnerClickEvent(event) {
    event.target.dispatchEvent(
      new CustomEvent("ribbon-select", {
        // имя события должно быть именно 'ribbon-select'
        detail: event.target.dataset.id, // уникальный идентификатора категории из её объекта
        bubbles: true, // это событие всплывает - это понадобится в дальнейшем
      })
    );
  }
}
