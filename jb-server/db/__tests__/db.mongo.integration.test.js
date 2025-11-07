import { MongoMemoryServer } from 'mongodb-memory-server';
import { ObjectId } from 'mongodb';

import dotenv from 'dotenv';
dotenv.config();

import { db } from '../db';

describe('DB module', () => {
  let mongoMemoryServer;
  
  beforeAll(async () => {
    mongoMemoryServer = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongoMemoryServer.getUri();
    console.log(process.env.MONGO_URI);
    await db.init();
  });

  afterAll(async () => {
    await db.close();
    await mongoMemoryServer.stop();
  });

  describe('getAllInCollection', () => {
    it('should return all documents from a collection', async () => {
      const result = await db.getAllInCollection('testCollection');
      expect(result).toEqual([]);
    });
  });

  describe('getFromCollectionById', () => {
    it('should return a document from a collection by id', async () => {
      const testId = new ObjectId().toString();
      const result = await db.getFromCollectionById('testCollection', testId);
      expect(result).toEqual(null);
    });
  });
});