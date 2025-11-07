import { db } from '../db/db.js';
import { Product } from '../models/product.js';

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

export const productService = {
  getAll, 
  getById,
  add,
  deleteIt
}