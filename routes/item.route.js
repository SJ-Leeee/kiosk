const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/item.controller');
const itemController = new ItemController();

// 제품CRUD
router.post('/items', itemController.registerItem);
router.get('/items', itemController.getAllItems);
router.get('/items/:type', itemController.getItemsByType);
router.delete('/items/:itemId', itemController.deleteItem);
router.patch('/items/:itemId', itemController.updateItem);

module.exports = router;
