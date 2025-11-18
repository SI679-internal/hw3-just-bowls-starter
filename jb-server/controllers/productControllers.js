
import { productService } from '../services/productService.js';

const getProducts = async (req, res) => {
  const allProducts = await productService.getAll();
  res.status(200).json(allProducts);
}

const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Id is required' });
  }
  try {
    const theProduct = await productService.getById(id);
    if (!theProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(theProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const addProduct = async (req, res) => {
  const postData = req.body;
  const { id } = await productService.add(postData);
  res.status(200).json({ id });
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { deletedCount } = await productService.deleteIt(id);
  res.status(200).json({deletedCount});
}

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;
  const { matchedCount, modifiedCount } = await productService.update(id, updateInfo);
  res.status(200).json({ matchedCount, modifiedCount });
}

export const productControllers = {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct
}