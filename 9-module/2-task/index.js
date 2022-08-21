import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    
    const carousel = new Carousel(slides);
    document.body.querySelector("[data-carousel-holder]").append(carousel.elem);

    const ribbonMenu = new RibbonMenu(categories);
    document
      .querySelector("[data-ribbon-holder]")
      .append(ribbonMenu.elem);

    const stepSlider = new StepSlider({ steps: 5, value: 2 });
    document.querySelector("[data-slider-holder]").append(stepSlider.elem);

    const cartIcon = new CartIcon();
    document.querySelector("[data-cart-icon-holder]").append(cartIcon.elem);
    const cart = new Cart(cartIcon);

    const resp = await fetch("products.json");
    const products = resp.ok ? await resp.json() : [];

    const productsGrid = new ProductsGrid(products);
    document
      .querySelector("[data-products-grid-holder]")
      .replaceChildren(productsGrid.elem);

    productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value,
    });

    document.body.addEventListener("product-add", (event) => {
      cart.addProduct(
        products.find((val) => val?.id === event.detail)
      );
    });

    stepSlider.elem.addEventListener("slider-change", (event) => {
      productsGrid.updateFilter({ maxSpiciness: event.detail });
    });

    ribbonMenu.elem.addEventListener("ribbon-select", (event) => {
      productsGrid.updateFilter({ category: event.detail });
    });

    const nutsCheckbox = document.querySelector("#nuts-checkbox");
    nutsCheckbox &&
      nutsCheckbox.addEventListener("change", (event) => {
        productsGrid.updateFilter({ noNuts: event.target.checked });
      });

    const vegeterianCheckbox = document.querySelector("#vegeterian-checkbox");
    vegeterianCheckbox &&
      vegeterianCheckbox.addEventListener("change", (event) => {
        productsGrid.updateFilter({ vegeterianOnly: event.target.checked });
      });



  }
}
