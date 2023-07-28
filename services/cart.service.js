const CartRepository = require('../repositories/cart.repository');

class CartService {
  cartRepository = new CartRepository();
}
module.exports = CartService;
