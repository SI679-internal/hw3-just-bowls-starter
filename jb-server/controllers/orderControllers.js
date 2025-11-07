
import { orderService } from '../services/orderService.js';

const addOrder = async (req, res) => {
  const { id: customerId } = req.params;
  const postData = req.body;
  postData.customerId = customerId;
  const { id: orderId } = await orderService.add(postData);
  res.json({ orderId });
}

export const orderControllers = {
  addOrder
}
