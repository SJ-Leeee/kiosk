const CartService = require('../services/cart.service');
class CartController {
  cartService = new CartService();
}
module.exports = CartController;
