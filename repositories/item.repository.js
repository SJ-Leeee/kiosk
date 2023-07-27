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
}

module.exports = ItemRepository;
