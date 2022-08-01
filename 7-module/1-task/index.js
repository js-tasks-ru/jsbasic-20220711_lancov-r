import createElement from "../../assets/lib/create-element.js";

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
    const ribbon__inner = document.createElement("div");
    ribbon__inner.classList.add("ribbon__inner");

    this.categories.forEach((element, index) => {
      ribbon__inner.insertAdjacentHTML(
        "beforeend",
        `<a href="#" class="ribbon__item ${(index = 0
          ? "ribbon__item_active"
          : "")}" data-id="${element.id}">${element.name}</a>`
      );
    });

    this._elem.append(RibbonMenu__inner);

    this._elem.insertAdjacentHTML(
      "afterbegin",
      `<button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>`
    );
    this._elem.insertAdjacentHTML(
      "beforeend",
      `<button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`
    );


  }

  _initRibbonMenuEvents() {
    const RibbonMenu = this._elem;
    const RibbonMenuArrowLeft = RibbonMenu.querySelector(
      ".ribbon__arrow_left"
    );
    const RibbonMenuArrowRight = RibbonMenu.querySelector(
      ".ribbon__arrow_right"
    );
    const RibbonMenuItems = RibbonMenu.querySelectorAll(
      ".ribbon__item"
    );

    RibbonMenuArrowLeft.style.display = "none";
    RibbonMenuArrowLeft.style.userSelect = "none";
    RibbonMenuArrowRight.style.userSelect = "none";

    RibbonMenuArrowLeft.addEventListener("click", this._RibbonMenuScrolling);
    RibbonMenuArrowLeft.addEventListener(
      "click",
      this._RibbonMenuArrowButtonVisibility
    );

    RibbonMenuArrowRight.addEventListener("click", this._RibbonMenuScrolling);
    RibbonMenuArrowRight.addEventListener(
      "click",
      this._RibbonMenuArrowButtonVisibility
    );

    for (let buttonElem of RibbonMenuPlusButtons) {
      buttonElem.addEventListener("click", this._PlusButtonClickEvent);
    }
  }

  _RibbonMenuScrolling(event) {
    const RibbonMenu = event.currentTarget.closest(".RibbonMenu");
    let currentScrollState =
      parseInt(RibbonMenu.dataset.currentScrollState, 10) || 0;

    if (event.currentTarget.matches(".RibbonMenu__arrow_left"))
      currentScrollState++;
    if (event.currentTarget.matches(".RibbonMenu__arrow_right"))
      currentScrollState--;

    RibbonMenu.dataset.currentScrollState = currentScrollState;

    const RibbonMenu__inner = RibbonMenu.querySelector(".RibbonMenu__inner");
    RibbonMenu__inner.style.transform = `translateX(${
      RibbonMenu__inner.clientWidth * currentScrollState
    }px)`;
  }

  _RibbonMenuArrowButtonVisibility(event) {
    const RibbonMenu = event.currentTarget.closest(".RibbonMenu");
    const RibbonMenuArrowRight = RibbonMenu.querySelector(
      ".RibbonMenu__arrow_right"
    );
    const RibbonMenuArrowLeft = RibbonMenu.querySelector(
      ".RibbonMenu__arrow_left"
    );

    const currentScrollState = parseInt(
      RibbonMenu.dataset.currentScrollState,
      10
    );
    const RibbonMenuChildrenElementsCount =
      RibbonMenu.querySelector(".RibbonMenu__inner").childElementCount;

    RibbonMenuArrowLeft.style.display = !currentScrollState ? "none" : "";
    RibbonMenuArrowRight.style.display =
      -currentScrollState === RibbonMenuChildrenElementsCount - 1 ? "none" : "";
  }

  _PlusButtonClickEvent(event) {
    event.target.dispatchEvent(
      new CustomEvent("ribbon-select", { // имя события должно быть именно 'ribbon-select'
        detail: event.target.dataset.id, // уникальный идентификатора категории из её объекта
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
      })
    );
  }
}
