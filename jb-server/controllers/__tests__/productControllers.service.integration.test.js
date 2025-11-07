// Units under test
import { productControllers } from "../productControllers";

// Dependencies
import { db } from "../../db/db";
import { Product } from "../../models/product";

import sinon from "sinon";

const getFromCollectionByIdStub = sinon.stub(db, "getFromCollectionById");
const fromProductDocumentStub = sinon.stub(Product, "fromProductDocument");
const resJsonStub = sinon.stub();
const resStatusStub = sinon.stub();

describe("Product Controllers", () => {
  afterEach(() => {
    getFromCollectionByIdStub.resetHistory();
    fromProductDocumentStub.resetHistory();
    resJsonStub.resetHistory();
    resStatusStub.resetHistory();
  });

  afterAll(() => {
    getFromCollectionByIdStub.restore();
    fromProductDocumentStub.restore();
  });

  describe("getProduct", () => {
    it("should return a product when valid ID matches document", async () => {
      const req = { params: { id: "1" } };
      const res = { json: resJsonStub, status: resStatusStub.returnsThis() };
      getFromCollectionByIdStub.resolves();
      fromProductDocumentStub.returns({
        id: "1",
        modelName: "testModelName",
        quantity: "99"
      });
      await productControllers.getProduct(req, res);

      expect(getFromCollectionByIdStub.calledOnceWith(db.PRODUCTS, "1")).toBe(true);
      expect(fromProductDocumentStub.calledOnceWith()).toBe(true);
      expect(resJsonStub.calledOnceWith(expect.objectContaining({ 
        id: "1", 
        modelName: "testModelName",
        quantity: "99"
      })));
    });
  });
});