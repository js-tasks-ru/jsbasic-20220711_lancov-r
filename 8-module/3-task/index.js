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

    onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    const cartItem = this.#getProductByID(productId);
    if (!cartItem) return;
    cartItem.count += amount;
    if (cartItem.count <= 0)
      cartItems = cartItems.filter((val) => {
        val?.id === productId;
      });

    onProductUpdate(cartItem);
  }

  isEmpty() {
    return !cartItems.length;
  }

  getTotalCount() {
    return cartItems.reduce((sum, val) => {
      sum += val.count;
    }, 0);
  }

  getTotalPrice() {
    return cartItems.reduce((sum, val) => {
      sum += val.count * product.price;
    }, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }

  #checkProduct(product) {
    return (
      Boolean(product) && typeof product === "object" && "id",
      "image",
      "name",
      "price",
      "category" in product
    );
  }

  #getProductByID(id) {
    return cartItems.find((val) => val?.product?.id === id);
  }
}
