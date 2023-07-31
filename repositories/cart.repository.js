const { Cart_detail, Cart, Item, Option } = require('../models');
class CartRepository {
  registerCart = async () => {
    return await Cart.create({});
  };

  addItemToCart = async (cartId, itemId, amount) => {
    return await Cart_detail.create({ cart_id: cartId, item_id: itemId, amount });
  };

  getCart = async (cartId) => {
    return await Cart.findOne({
      include: {
        model: Cart_detail,
        attributes: { exclude: ['cart_id', 'item_id', 'createdAt', 'updatedAt'] },
        include: {
          model: Item,
          attributes: ['name', 'price'],
          include: {
            model: Option,
            attributes: ['option_name', 'option_price'],
          },
        },
      },
      where: { id: cartId },
    });
  };
}
module.exports = CartRepository;
