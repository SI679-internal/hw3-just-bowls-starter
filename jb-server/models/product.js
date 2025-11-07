
class Product {
  id = '';
  modelNumber = '';
  modelName = '';
  manufacturer = '';
  color = '';
  price = 0.0;
  quantity = 0;

  constructor(productFields) {
    const id = productFields.id ?? String(Date.now());
    this.updateProperties({id, ...productFields});
  }

  updateProperties = (productFields) => {
    this.id = productFields.id ?? this.id;
    this.modelName = productFields.modelName ?? this.modelName;
    this.modelNumber = productFields.modelNumber ?? this.modelNumber;
    this.manufacturer = productFields.manufacturer ?? this.manufacturer;
    this.price = productFields.price ?? this.price;
    this.color = productFields.color ?? this.color; 
    this.quantity = productFields.quantity ?? this.quantity;
  }

  static fromProductDocument = (productDocument) => {
    const id = productDocument._id?.toString();
    if (!id) {
      throw new Error('Could not find _id in Product Document');
    }
    delete productDocument._id;
    const product = new Product({id, ...productDocument});
    return product;
  }
}

export { Product };