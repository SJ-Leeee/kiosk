const { Item, Order_item } = require('../models');
class OrderRepository {
  getItemById = async (itemId) => {
    return await Item.findOne({ where: { id: itemId } });
  };
  getOrderByItemId = async (itemId) => {
    return await Order_item.findOne({ where: { item_id: itemId } });
  };

  getOrderById = async (orderId) => {
    return await Order_item.findOne({ where: { id: orderId } });
  };

  registerOrder = async (itemId, amount, state) => {
    await Order_item.create({ item_id: itemId, amount, state });
  };

  updateOrder = async (orderId, state, t) => {
    await Order_item.update({ state }, { where: { id: orderId }, transaction: t });
  };
}
module.exports = OrderRepository;
