const { Item } = require("../models");
class ItemRepository {
  registerItem = async (name, price, type) => {
    await Item.create({ name, price, type });
    return;
  };

  findExItem = async (name) => {
    return await Item.findOne({ where: { name } });
  };

  getAllItems = async () => {
    return await Item.findAll({});
  };
  getItemsByType = async (type) => {
    return await Item.findAll({ where: { type } });
  };
  getItemById = async (itemId) => {
    return await Item.findOne({ where: { id: itemId } });
  };
  deleteItem = async (itemId) => {
    await Item.destroy({ where: { id: itemId } });
    return;
  };
  updateItem = async (itemId, name, price) => {
    await Item.update({ name, price }, { where: { id: itemId } });
    return;
  };
}

module.exports = ItemRepository;
