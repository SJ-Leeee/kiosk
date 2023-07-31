const { Cart_detail, Cart, Item, Option, Cart_detail_option } = require('../models');
class CartRepository {
  registerCart = async () => {
    return await Cart.create({});
  };

  addItemToCart = async (cartId, itemId, amount) => {
    return await Cart_detail.create({ cart_id: cartId, item_id: itemId, amount });
  };
  addOptionToItem = async (cartDetailId, itemId, optionId) => {
    return await Cart_detail_option.create({ cart_detail_id: cartDetailId, item_id: itemId, option_id: optionId });
  };

  getCartDetail = async (cartDetailId) => {
    return await Cart_detail.findOne({ where: { id: cartDetailId } });
  };

  getCart = async (cartId) => {
    return await Cart.findOne({
      attributes: ['state'],
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
  getCart = async (cartId) => {
    return await Cart.findOne({
      attributes: ['state'],
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
              attributes: ['option_id'],
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
