const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/item.controller');
const itemController = new ItemController();

const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

const OptionController = require('../controllers/option.controller');
const optionController = new OptionController();

router.post('/items', itemController.registerItem);
router.get('/items', itemController.getAllItems);
router.get('/items/:type', itemController.getItemsByType);
router.delete('/items/:itemId', itemController.deleteItem);
router.patch('/items/:itemId', itemController.updateItem);
//
router.post('/items/:itemId/option', optionController.registerOption);
router.get('/items/:itemId/option', optionController.getAllOptions);

//
router.post('/order/kiosk/:itemId', orderController.orderItem);

// 발주
router.post('/order/item/:itemId', orderController.orderItem);
router.patch('/order/state/:orderId', orderController.updateOrder);

module.exports = router;
