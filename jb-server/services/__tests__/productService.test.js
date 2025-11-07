import sinon from 'sinon';

import { productService } from '../productService.js';

import { db } from '../../db/db.js';
import { Product } from '../../models/product.js';

const getFromCollectionByIdStub = sinon.stub(db, 'getFromCollectionById');
const fromProductDocumentStub = sinon.stub(Product, 'fromProductDocument');

describe("Product Service", () => {

  afterEach(() => {
    getFromCollectionByIdStub.resetHistory();
    fromProductDocumentStub.resetHistory();
  });

  afterAll(() => {
    getFromCollectionByIdStub.restore();
    fromProductDocumentStub.restore();
  });

  describe("getByID()", () => {
  
    it("should throw an error on falsy ID", async () => {
      await expect(() => productService.getById())
        .rejects.toThrow('Null or undefined ID not allowed.');
      await expect(()=> productService.getById(null))
        .rejects.toThrow('Null or undefined ID not allowed.');
    });

    it("should return a product when valid ID matches document", async () => {
      getFromCollectionByIdStub.resolves();
      fromProductDocumentStub.returns({
        id: 'testId',
        modelName: 'testModelName',
        quantity: '99'
      });
      // while it doesn't actually matter what we pass to getById(), using
      // the same ID provides useful documentation
      expect(productService.getById('testId')).resolves.toMatchObject({
        id: 'testId',
        modelName: 'testModelName',
        quantity: '99'
      })
    });
  });
});
