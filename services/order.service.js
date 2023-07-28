const OrderRepository = require('../repositories/order.repository');
const ItemRepository = require('../repositories/item.repository');
const { sequelize } = require('../models');
const { Transaction } = require('sequelize');

class OrderService {
  orderRepository = new OrderRepository();
  itemRepository = new ItemRepository();

  orderItem = async (itemId, amount) => {
    try {
      if (!amount) throw new Error('발주 수량을 입력하세요');
      const exItem = await this.orderRepository.getItemById(itemId);
      if (!exItem) throw new Error('상품이 존재하지 않습니다.');

      const state = 'ORDERED';
      await this.orderRepository.registerOrder(itemId, amount, state);
      return { code: 200, message: '발주가 완료되었습니다.' };
    } catch (error) {
      throw error;
    }
  };

  updateOrder = async (orderId, state) => {
    try {
      if (!['CANCELED', 'PENDING', 'COMPLETED'].includes(state)) {
        throw new Error('상태를 CANCELED, PENDING, COMPLETED 중 고르세요. ORDERED 는 주문 등록을 이용하세요');
      }
      const exOrder = await this.orderRepository.getOrderById(orderId);
      if (!exOrder) throw new Error('발주한 내역이 없습니다.');
      if (exOrder.state == state) throw new Error('동일한 상태로는 변경이 불가합니다.');
      if (state == 'ORDERED') throw new Error('주문등록을 이용하세요');

      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });

      if (state == 'PENDING') {
        // 요청한 상태가 '배송' 일 때
        if (exOrder.state !== 'ORDERED')
          throw new Error(`현재 ${exOrder.state} 상태입니다. ${state} 로 변경이 불가합니다.`);
        await this.orderRepository.updateOrder(orderId, state);
        return { code: 200, message: `state: ${state}` };
      }
      if (state == 'COMPLETED') {
        // 요청한 상태가 '완료'일 때
        try {
          if (exOrder.state !== 'PENDING')
            throw new Error(`현재 ${exOrder.state} 상태입니다. ${state} 로 변경이 불가합니다.`);
          const exItem = await this.itemRepository.getItemById(exOrder.item_id);
          const totalAmount = exItem.amount + exOrder.amount;
          await this.orderRepository.updateOrder(orderId, state, t);
          await this.itemRepository.updateAmount(exOrder.item_id, totalAmount, t);
          await t.commit();
          return { code: 200, message: `state: ${state}` };
        } catch (transactionError) {
          await t.rollback();
          throw transactionError;
        }
      }
      if (state == 'CANCELED') {
        // 요청한 상태가 '취소'일 때
        if (exOrder.state == 'ORDERED' || exOrder.state == 'PENDING') {
          await this.orderRepository.updateOrder(orderId, state);
          return { code: 200, message: `state: ${state}` };
        }
        if (exOrder.state == 'COMPLETED') {
          const exItem = await this.itemRepository.getItemById(exOrder.item_id);
          if (exItem.amount < exOrder.amount) {
            throw new Error(`발주한 수량보다 현재 수량이 적어 취소할 수 없습니다.`);
          } else {
            try {
              const totalAmount = exItem.amount - exOrder.amount;
              await this.orderRepository.updateOrder(orderId, state, t);
              await this.itemRepository.updateAmount(exOrder.item_id, totalAmount, t);
              await t.commit();
              return { code: 200, message: `state: ${state}` };
            } catch (transactionError) {
              await t.rollback();
              throw transactionError;
            }
          }
        }
      }
    } catch (error) {
      throw error;
    }
  };
  getOrder = async (itemId) => {
    try {
      const exItem = await this.itemRepository.getItemById(itemId);
      if (!exItem) throw new Error('상품이 존재하지 않습니다.');

      const orderData = await this.orderRepository.getOrderByItemId(itemId);
      return { code: 200, data: orderData };
    } catch (error) {
      throw error;
    }
  };
}
module.exports = OrderService;
