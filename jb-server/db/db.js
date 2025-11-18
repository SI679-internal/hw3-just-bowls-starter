import { MongoClient, ObjectId } from "mongodb";

let mongoClient = null;
let theDb = null;

// coll names
const PRODUCTS = 'products'; 
const ORDERS = 'orders';

const init = async () => {
  const mongoURI = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DBNAME;
  console.log('connecting to db', mongoURI, dbName);
  mongoClient = new MongoClient(mongoURI);
  await mongoClient.connect();
  theDb = mongoClient.db(dbName);
}

const close = async () => {
  await mongoClient.close();
}

const watchCollection = async (collectionName, callback = () => {}) => {
  if (!mongoClient) { await init(); }
  const changeStream = await theDb.collection(collectionName).watch();
  changeStream.on('change', (change) => {
    callback(change);
  });
  console.log('watching collection', collectionName);
  return changeStream;
}

const closeChangeStream = async (changeStream) => {
  changeStream.close();
}

const getAllInCollection = async (collectionName) => {
  if (!mongoClient) { await init(); }
  const allDocs = await theDb.collection(collectionName).find();
  return allDocs.toArray();
}

const getFromCollectionById = async (collectionName, id) => {
  if (!mongoClient) { await init(); }
  const doc = await theDb.collection(collectionName).findOne({_id: new ObjectId(String(id))});
  return doc;
}

const deleteFromCollectionById = async (collectionName, id) => {
  if (!mongoClient) { await init(); }
  const result = await theDb.collection(collectionName).deleteOne({_id: new ObjectId(String(id))});
  return result;
}

const addToCollection = async (collectionName, docData) => {
  if (!mongoClient) { await init(); }
  const result = await theDb.collection(collectionName).insertOne(docData);
  return result;
}

const updateInCollectionById = async (collectionName, id, docData) => {
  if (!mongoClient) { await init(); }
  const result = 
    await theDb.collection(collectionName).updateOne(
      {_id: new ObjectId(String(id))}, 
      {$set: docData}
    );
  return result;
}

export const db = {
  init, 
  close,
  watchCollection,
  closeChangeStream,
  getAllInCollection, 
  getFromCollectionById,
  addToCollection,
  deleteFromCollectionById,
  updateInCollectionById,
  PRODUCTS,
  ORDERS
}