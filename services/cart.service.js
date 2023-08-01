const CartRepository = require('../repositories/cart.repository');
const ItemRepository = require('../repositories/item.repository');
const OptionRepository = require('../repositories/option.repository');
const { sequelize } = require('../models');
const { Transaction } = require('sequelize');

class CartService {
  cartRepository = new CartRepository();
  itemRepository = new ItemRepository();
  optionRepository = new OptionRepository();

  registerCart = async () => {
    try {
      const cart = await this.cartRepository.registerCart();

      return { cart, code: 200, message: `장바구니 번호 : ${cart.id}` };
    } catch (error) {
      throw error;
    }
  };

  addItemToCart = async (cartId, itemId, amount) => {
    try {
      if (!amount) throw new Error('수량을 입력하세요.');
      const exItem = await this.itemRepository.getItemById(itemId);
      if (!exItem) throw new Error('아이템이 존재하지 않습니다.');
      if (exItem.amount < amount) throw new Error('수량이 부족합니다.');
      // 옵션이 같으면 그 원래 있던 것에다가 수량만 추가하는 로직.. 추가..
      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });
      const remainAmount = exItem.amount - amount;
      try {
        await this.cartRepository.addItemToCart(cartId, itemId, amount, t);
        await this.itemRepository.updateAmount(itemId, remainAmount, t);
        await t.commit();
      } catch (transactionError) {
        await t.rollback();
        throw transactionError;
      }
      return { code: 200, message: `제품 추가가 완료되었습니다.` };
    } catch (error) {
      throw error;
    }
  };

  deleteItemFromCart = async (cartDetailId) => {
    try {
      const exCartDetail = await this.cartRepository.getCartDetailById(cartDetailId);
      if (!exCartDetail) throw new Error('항목이 존재하지 않습니다.');

      await this.cartRepository.deleteItemFromCart(cartDetailId);

      return { code: 200, message: `해당 항목이 삭제되었습니다.` };
    } catch (error) {
      throw error;
    }
  };

  addOptionToItem = async (cartId, itemId, optionId) => {
    try {
      const exItem = await this.itemRepository.getItemById(itemId);
      if (!exItem) throw new Error('아이템이 존재하지 않습니다.');
      const exOption = await this.optionRepository.getOptionById(optionId);
      if (!exOption) throw new Error('옵션이 존재하지 않습니다.');
      const exCartDetail = await this.cartRepository.getCartDetailByCartId(cartId, itemId);
      if (!exCartDetail) throw new Error('장바구니에 해당상품이 존재하지 않습니다.');
      if (exOption.item_id !== exCartDetail.item_id) throw new Error('해당 상품의 옵션이 아닙니다.');

      await this.cartRepository.addOptionToItem(exCartDetail.id, itemId, optionId);

      return { code: 200, message: `옵션 추가가 완료되었습니다.` };
    } catch (error) {
      throw error;
    }
  };

  getCart = async (cartId) => {
    try {
      const cartData = await this.cartRepository.getCart(cartId);
      const test = cartData.Cart_details;
      let totalPrice = 0;
      test.forEach((item) => {
        let optionSum = 0;

        item.Cart_detail_options.forEach((option) => {
          optionSum += option.Option.option_price;
        });

        totalPrice = totalPrice + item.amount * (item.Item.price + optionSum);
      });
      return { code: 200, data: cartData, totalPrice };
    } catch (error) {
      throw error;
    }
  };
}
module.exports = CartService;
