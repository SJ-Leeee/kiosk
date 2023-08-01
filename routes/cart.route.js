const express = require('express');
const router = express.Router();
const cartMiddleware = require('../middlewares/cart_middleware');

const CartController = require('../controllers/cart.controller');
const cartController = new CartController();

// 장바구니
router.post('/cart', cartController.registerCart);
router.post('/cart/item/:itemId', cartMiddleware, cartController.addItemToCart);
router.delete('/cart/item/:cartDetailId', cartMiddleware, cartController.deleteItemFromCart);
router.post('/cart/item/:itemId/option/:optionId', cartMiddleware, cartController.addOptionToItem);
router.get('/cart/item', cartMiddleware, cartController.getCart);
router.patch('/order/cart', cartMiddleware, cartController.orderCart);

module.exports = router;
