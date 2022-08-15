export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!this.#checkProduct(product)) return;

    let cartItem = this.#getProductByID(product?.id);
    if (cartItem) {
      cartItem.count++;
    } else {
      let cartItem = { product, count: 1 };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    const cartItem = this.#getProductByID(productId);
    if (!cartItem) return;
    cartItem.count += amount;
    if (cartItem.count <= 0)
      this.cartItems = this.cartItems.filter((val) => {
        val?.id === productId;
      });

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, val) => {
      val.count;
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, val) => {
      val.count * val.product.price;
    }, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }

  #checkProduct(product) {
    return (
      !Boolean(product) ? false : (typeof product === "object" && "id",
      "image",
      "name",
      "price",
      "category" in product)
    );
  }

  #getProductByID(id) {
    return this.cartItems.find((val) => val?.product?.id === id);
  }
}
