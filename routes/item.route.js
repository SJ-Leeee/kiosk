const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/item.controller');
const itemController = new ItemController();

const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

router.post('/item', itemController.registerItem);
router.get('/items', itemController.getAllItems);
router.get('/items/:type', itemController.getItemsByType);
router.delete('/item/:itemId', itemController.deleteItem);
router.patch('/item/:itemId', itemController.updateItem);

// 발주

router.post('/order/:itemId', orderController.orderItem);
router.patch('/order/state/:orderId', orderController.updateOrder);

module.exports = router;
