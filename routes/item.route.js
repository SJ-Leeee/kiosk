const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/item.controller');
const itemController = new ItemController();

const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

const OptionController = require('../controllers/option.controller');
const optionController = new OptionController();

// 제품CRUD
router.post('/items', itemController.registerItem);
router.get('/items', itemController.getAllItems);
router.get('/items/:type', itemController.getItemsByType);
router.delete('/items/:itemId', itemController.deleteItem);
router.patch('/items/:itemId', itemController.updateItem);

// 옵션CRUD
router.post('/items/:itemId/option', optionController.registerOption);
router.get('/items/:itemId/option', optionController.getAllOptions);
router.patch('/items/option/:optionId', optionController.updateOption);
router.delete('/items/option/:optionId', optionController.deleteOption);

// 카트아직안함
router.post('/order/cart/:itemId', orderController.orderItem);

// 발주 CRU
router.get('/order/item/:itemId', orderController.getOrder);
router.post('/order/item/:itemId', orderController.orderItem);
router.patch('/order/state/:orderId', orderController.updateOrder);

module.exports = router;
