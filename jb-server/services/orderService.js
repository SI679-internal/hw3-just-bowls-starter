import { db } from '../db/db.js';
import { OrderStatus } from '../models/order.js';

const add = async (orderInfo) => {
  orderInfo.status = OrderStatus.STARTED;
  const {insertedId} = await db.addToCollection(db.ORDERS, orderInfo);
  return {
    id: insertedId.toString(),
    ...orderInfo
  }
}

export const orderService = {
  add
}