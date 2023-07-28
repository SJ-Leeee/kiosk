const OrderService = require('../services/order.service');
class OrderController {
  orderService = new OrderService();

  orderItem = async (req, res) => {
    try {
      const { itemId } = req.params;
      const { amount } = req.body;
      const result = await this.orderService.orderItem(itemId, amount);
      if (result.data) {
        return res.status(result.code).json({ data: result.data });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  };

  updateOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { state } = req.body;
      const result = await this.orderService.updateOrder(orderId, state);
      console.log(result);
      if (result.data) {
        return res.status(result.code).json({ data: result.data });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  };
}
module.exports = OrderController;
