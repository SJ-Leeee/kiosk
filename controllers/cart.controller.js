const CartService = require('../services/cart.service');
class CartController {
  cartService = new CartService();

  registerCart = async (req, res) => {
    try {
      const result = await this.cartService.registerCart();
      if (result.data) {
        return res.status(result.code).json({ data: result.data });
      }
      res.cookie('cart', result.cart, { maxAge: 6000000 });
      //시간 바꿔야 된다
      return res.status(result.code).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  };

  addItemToCart = async (req, res) => {
    try {
      const cartId = res.locals.cart.id;
      const { amount } = req.body;
      const { itemId } = req.params;
      const result = await this.cartService.addItemToCart(cartId, itemId, amount);
      if (result.data) {
        return res.status(result.code).json({ data: result.data });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  };

  deleteItemFromCart = async (req, res) => {
    try {
      const { cartDetailId } = req.params;
      const result = await this.cartService.deleteItemFromCart(cartDetailId);
      if (result.data) {
        return res.status(result.code).json({ data: result.data });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  };

  addOptionToItem = async (req, res) => {
    try {
      const cartId = res.locals.cart.id;
      const { itemId, optionId } = req.params;
      const result = await this.cartService.addOptionToItem(cartId, itemId, optionId);
      if (result.data) {
        return res.status(result.code).json({ data: result.data });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  };

  getCart = async (req, res) => {
    try {
      const cartId = res.locals.cart.id;
      const result = await this.cartService.getCart(cartId);
      if (result.data) {
        return res.status(result.code).json({ data: result.data, totalPrice: result.totalPrice });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  };
}
module.exports = CartController;
