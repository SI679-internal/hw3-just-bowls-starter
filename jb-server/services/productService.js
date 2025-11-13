import { db } from '../db/db.js';
import { Product } from '../models/product.js';
import { socket } from '../socket/clientUpdate.js';

let changeStream = null;
const watchProducts = async () => {
  changeStream = await db.watchCollection(db.PRODUCTS, (change) => {
    console.log('change', change);
    if (change.operationType === 'update') {
      socket.updateProduct(
        change.documentKey._id.toString(), 
        change.updateDescription.updatedFields 
      );
    }
  });
  console.log('watching products');
}

const stopWatchingProducts = async (changeStream) => {
  await db.stopWatchingCollection(changeStream);
  changeStream = null;
}

const getAll = async () => {
  const productDocs = await db.getAllInCollection(db.PRODUCTS);
  return productDocs.map(pDoc => Product.fromProductDocument(pDoc));
}

const getById = async (id) => {
  if (!id) throw new Error('Null or undefined ID not allowed.');
  const productDoc = await db.getFromCollectionById(db.PRODUCTS, id);
  return Product.fromProductDocument(productDoc);
}

const add = async (productInfo) => {
  const {insertedId} = await db.addToCollection(db.PRODUCTS, productInfo);
  return {
    id: insertedId.toString(),
    ...productInfo
  }
}

const deleteIt = async (id) => {
  if (!id) throw new Error('Null or undefined ID not allowed.');
  const { deletedCount } = await db.deleteFromCollectionById(db.PRODUCTS, id);
  return { deletedCount };
}

const update = async (id, productInfo) => {
  await db.updateInCollectionById(db.PRODUCTS, id, productInfo);
  return {
    id: id.toString(),
    ...productInfo
  }
}

export const productService = {
  watchProducts,
  stopWatchingProducts,
  getAll, 
  getById,
  add,
  deleteIt,
  update
}