const { Item, Option } = require('../models');
class ItemRepository {
  registerItem = async (name, price, type) => {
    await Item.create({ name, price, type });
    return;
  };

  findExItem = async (name) => {
    return await Item.findOne({ where: { name } });
  };

  getAllItems = async () => {
    return await Item.findAll({
      include: {
        model: Option,
        attributes: { exclude: ['item_id', 'createdAt', 'updatedAt'] },
      },
    });
  };
  getItemsByType = async (type) => {
    return await Item.findAll({
      include: {
        model: Option,
        attributes: { exclude: ['item_id', 'createdAt', 'updatedAt'] },
      },
      where: { type },
    });
  };
  getItemById = async (itemId) => {
    return await Item.findOne({ where: { id: itemId } });
  };
  deleteItem = async (itemId) => {
    await Item.destroy({ where: { id: itemId } });
    return;
  };
  updateItem = async (name, price, itemId) => {
    await Item.update({ name, price }, { where: { id: itemId } });
    return;
  };
  updateAmount = async (itemId, amount, t) => {
    await Item.update({ amount }, { where: { id: itemId }, transaction: t });
    return;
  };
}

module.exports = ItemRepository;
