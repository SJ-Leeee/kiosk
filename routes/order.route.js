const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

// 발주 CRU
router.get('/order/item/:itemId', orderController.getOrder);
router.post('/order/item/:itemId', orderController.orderItem);
router.patch('/order/state/:orderId', orderController.updateOrder);

module.exports = router;
