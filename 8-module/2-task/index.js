import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#render();
  }

  #filters = {};

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
    console.clear();
    console.log(this.#filters)

    this.elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
        ${this.products
          .map(this.#eligibledProduct)
          .reduce(
            (renderedCards, card) =>
              (renderedCards += card === null ? "" : card.outerHTML),
            ""
          )}
      </div>
    </div>
    `);
  }

  #eligibledProduct = (productObj) => {
    const filters = this.#filters;

    if (filters.noNuts && "nuts" in productObj) return null;
    if (filters.vegeterianOnly && !("vegeterian" in productObj)) return null;
    if (
      "maxSpiciness" in filters &&
      filters.maxSpiciness < productObj.spiciness
    )
      return null;
    if (
      "category" in filters &&
      filters.category !== "" &&
      filters.category !== productObj.category
    )
      return null;
      console.log(1);
    return new ProductCard(productObj).elem;
  }

  updateFilter(filterObject) {
    this.#setFilters(filterObject);
    this.#render();
  }
}
