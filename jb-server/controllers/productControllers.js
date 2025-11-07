
import { productService } from '../services/productService.js';

const getProducts = async (req, res) => {
  const allProducts = await productService.getAll();
  res.json(allProducts);
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
    res.json(theProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const addProduct = async (req, res) => {
  const postData = req.body;
  const { id } = await productService.add(postData);
  res.json({ id });
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { deletedCount } = await productService.deleteIt(id);
  res.json({deletedCount});
}

export const productControllers = {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct
}