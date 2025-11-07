const OrderStatus = Object.freeze({
  STARTED: 'started',
  SUBMITTED: 'submitted',
  FULFILLED: 'fulfilled',
  CANCELLED: 'cancelled'
});

class Order {
  id = '';
  customerId = '';
  status = OrderStatus.STARTED;
  items = [];

  constructor(orderFields) {
    this.updateFields(orderFields);
  }

  updateFields = (orderFields) => {
    const id = orderFields.id ?? String(Date.now());
    this.customerId = orderFields.customerId ?? this.customerId;
    this.status = orderFields.status ?? this.status;
    this.items = {
      ...this.items,
      ...orderFields.items
    } 
  }

  static fromOrderDocument = (doc) => {
    const id = productDocument._id?.toString();
    if (!id) {
      throw new Error('Could not find _id in Product Document');
    }
    delete productDocument._id;
    const product = new Order({id, ...productDocument});
    return product;
  }
}

export { Order, OrderStatus }