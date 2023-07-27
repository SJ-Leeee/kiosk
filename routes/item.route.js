const express = require("express");
const router = express.Router();
const ItemController = require("../controllers/item.controller");
const itemController = new ItemController();

router.post("/item", itemController.registerItem);
router.get("/items", itemController.getAllItems);
router.get("/items/:type", itemController.getItemsByType);
router.delete("/item/:itemId", itemController.deleteItem);

module.exports = router;
