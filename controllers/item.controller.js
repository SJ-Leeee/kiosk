const ItemService = require("../services/item.service");
class ItemController {
  itemService = new ItemService();

  registerItem = async (req, res) => {
    try {
      const { name, price, type } = req.body;
      const result = await this.itemService.registerItem(name, price, type);
      if (result.data) {
        return res.status(result.code).json({ data: result.data });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  };

  getAllItems = async (req, res) => {
    try {
      const result = await this.itemService.getAllItems();
      if (result.data) {
        return res.status(result.code).json({ data: result.data });
      }
      return res.status(result.code).json({ message: result.message });
      console.log(err);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };
}
module.exports = ItemController;