const { where } = require('sequelize');
const { Cart_detail, Cart, Item, Option, Cart_detail_option } = require('../models');
class CartRepository {
  registerCart = async () => {
    return await Cart.create({});
  };

  addItemToCart = async (cartId, itemId, amount, t) => {
    return await Cart_detail.create({ cart_id: cartId, item_id: itemId, amount }, { transaction: t });
  };
  addOptionToItem = async (cartDetailId, itemId, optionId) => {
    return await Cart_detail_option.create({ cart_detail_id: cartDetailId, item_id: itemId, option_id: optionId });
  };

  getCartDetail = async (cartId, itemId) => {
    return await Cart_detail.findOne({ where: { cart_id: cartId, item_id: itemId } });
  };

  getCart = async (cartId) => {
    return await Cart.findOne({
      attributes: ['id', 'state'],
      include: [
        {
          model: Cart_detail,
          attributes: ['amount'],
          include: [
            {
              model: Item,
              attributes: ['name', 'price'],
            },
            {
              model: Cart_detail_option,
              include: {
                model: Option,
                attributes: ['option_name', 'option_price'],
              },
            },
          ],
        },
      ],
      where: { id: cartId },
    });
  };
}
module.exports = CartRepository;
