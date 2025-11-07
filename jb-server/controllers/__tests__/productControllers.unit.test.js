import { productControllers } from "../productControllers";
import { productService } from "../../services/productService";
import sinon from "sinon";

const getByIdStub = sinon.stub(productService, "getById");
const resJsonStub = sinon.stub();
const resStatusStub = sinon.stub();

describe("Product Controllers", () => {
  afterEach(() => {
    getByIdStub.resetHistory();
    resJsonStub.resetHistory();
    resStatusStub.resetHistory();
  });
  
  afterAll(() => {
    getByIdStub.restore();
  });

  describe("getProduct", () => {
    it("should return a product", async () => {
      const req = { params: { id: "1" } };
      resStatusStub.returns({ json: resJsonStub});
      const res = { status: resStatusStub };
      getByIdStub.resolves({
        id: "1",
        modelName: "testModelName",
        quantity: "99"
      });
      await productControllers.getProduct(req, res);

      expect(getByIdStub.calledOnceWith("1")).toBe(true);
      expect(resJsonStub.calledOnceWith(expect.objectContaining({ 
        id: "1", 
        modelName: "testModelName",
        quantity: "99"
      })));
    });

    it("should return a 404 if the product is not found", async () => {
      const req = { params: { id: "1" } };
      resStatusStub.returns({ json: resJsonStub});
      const res = { status: resStatusStub };
      getByIdStub.resolves(null);
      await productControllers.getProduct(req, res);
      expect(resJsonStub.calledOnceWith(expect.objectContaining({ error: "Product not found" })));
      expect(resStatusStub.calledOnceWith(404)).toBe(true);
    });

    it("should return a 500 if an error occurs", async () => {
      const req = { params: { id: "1" } };
      //resStatusStub.returns({ json: resJsonStub});
      const res = { json: resJsonStub, status: resStatusStub.returnsThis() };
      getByIdStub.rejects(new Error("Unknown service error"));
      await productControllers.getProduct(req, res);
      expect(resJsonStub.calledOnceWith(expect.objectContaining({ error: "Unknown service error" })));
      expect(resStatusStub.calledOnceWith(500)).toBe(true);
    });

    it("should return a 400 if the id is not provided", async () => {
      const req = { params: { id: undefined } };
      const res = { json: resJsonStub, status: resStatusStub };
      await productControllers.getProduct(req, res);
      expect(resJsonStub.calledOnceWith(expect.objectContaining({ error: "Id is required" })));
      expect(resStatusStub.calledOnceWith(400)).toBe(true);

      const req2 = { params: {}};
      await productControllers.getProduct(req2, res);
      expect(resJsonStub.calledOnceWith(expect.objectContaining({ error: "Id is required" })));
    });
  });
});