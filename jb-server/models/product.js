
class Product {
  id = '';
  name = '';
  image = '';
  diameter = '';
  depth = '';
  material = '';
  color = '';
  price = 0.0;
  stock = 0;

  constructor(productFields) {
    const id = productFields.id ?? String(Date.now());
    this.updateProperties({id, ...productFields});
  }

  updateProperties = (productFields) => {
    this.id = productFields.id ?? this.id;
    this.name = productFields.name ?? this.name;
    this.image = productFields.image ?? this.image;
    this.diameter = productFields.diameter ?? this.diameter;
    this.depth = productFields.depth ?? this.depth;
    this.material = productFields.material ?? this.material;
    this.color = productFields.color ?? this.color; 
    this.price = productFields.price ?? this.price;
    this.stock = productFields.stock ?? this.stock;
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