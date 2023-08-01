const express = require('express');
const router = express.Router();

const OptionController = require('../controllers/option.controller');
const optionController = new OptionController();

// 옵션CRUD
router.post('/items/:itemId/option', optionController.registerOption);
router.get('/items/:itemId/option', optionController.getAllOptions);
router.patch('/items/option/:optionId', optionController.updateOption);
router.delete('/items/option/:optionId', optionController.deleteOption);

module.exports = router;
