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

  getCartDetailByCartId = async (cartId, itemId) => {
    return await Cart_detail.findOne({ where: { cart_id: cartId, item_id: itemId } });
  };
  getCartDetailById = async (cartDetailId) => {
    return await Cart_detail.findOne({ where: { id: cartDetailId } });
  };

  deleteItemFromCart = async (cartDetailId) => {
    return await Cart_detail.destroy({ where: { id: cartDetailId } });
  };

  getCart = async (cartId) => {
    return await Cart.findOne({
      attributes: ['id', 'state'],
      include: [
        {
          model: Cart_detail,
          attributes: ['id', 'amount'],
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
  orderCart = async (cartId) => {
    return await Cart.update({ state: 1 }, { where: { id: cartId } });
  };
}
module.exports = CartRepository;
