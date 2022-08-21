import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.elem = document.createElement("div");
    this.elem.classList.add("products-grid");
    this.#render();
  }

  #filters = {};
  elem = document.createElement("div");

  #setFilters(val) {
    for (const key in val) this.#filters[key] = val[key];
  }

  // productGrid.updateFilter({ noNuts: event.target.checked });
  // productGrid.updateFilter({ vegeterianOnly: event.target.checked });
  // productGrid.updateFilter({ maxSpiciness: 2 });
  // productGrid.updateFilter({ maxSpiciness: 4 });
  // productGrid.updateFilter({ category: 'soups' });
  // productGrid.updateFilter({ category: '' });

  #render() {
    const innerGrid = document.createElement("div");
    this.elem.replaceChildren(innerGrid);
    innerGrid.classList.add("products-grid__inner");
    innerGrid.append(
      this.products
        .map(this.#eligibledProduct)
        .reduce((renderedCards, card) => {
          card !== null && renderedCards.append(card);
          return renderedCards;
        }, new DocumentFragment())
    );
  }

  #eligibledProduct = (productObj) => {
    const filters = this.#filters;

    if (filters.noNuts && productObj.nuts) return null;
    if (filters.vegeterianOnly && !productObj.vegeterian) return null;
    if (
      "maxSpiciness" in filters &&
      filters.maxSpiciness < productObj.spiciness
    )
      return null;
    if (
      "category" in filters &&
      filters.category &&
      filters.category !== productObj.category
    )
      return null;
    return new ProductCard(productObj).elem;
  };

  updateFilter(filterObject) {
    this.#setFilters(filterObject);
    this.#render();
  }
}
