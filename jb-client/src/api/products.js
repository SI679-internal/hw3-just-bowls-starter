import { handleGet, handlePost, handlePatch, PRODUCTS_ENDPOINT } from './apiClient';

const getAllProducts = () => {
  return handleGet(PRODUCTS_ENDPOINT);
}

const addProduct = (product) => {
  return handlePost(PRODUCTS_ENDPOINT, product);
}

const updateProduct = async (id, fieldsToUpdate) => {
  await handlePatch(`${PRODUCTS_ENDPOINT}/${id}`, fieldsToUpdate);
}

export { getAllProducts, addProduct, updateProduct };
