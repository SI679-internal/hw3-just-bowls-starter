import { handleGet, handlePost, handlePatch, PRODUCTS_ENDPOINT } from './apiClient';

const IMG_FILE_NAMES = [
  'large_green_bowl.jpg',
  'large_white_bowl.jpg',
  'shallow_green_bowl.jpg',
  'shallow_jade_bowl.jpg',
  'small_blue_pattern_bowl.jpg',
];

const initBowls = [
  {
    id: Date.now(),
    name: "Big Green Bowl",
    image: IMG_FILE_NAMES[0],
    diameter: '9"',
    depth: '4.5"',
    material: "Glazed Ceramic",
    color: "Green",
    price: "$24.99",
    stock: 14,
  },
  {
    id: Date.now() + 1,
    name: "Big White Bowl",
    image: IMG_FILE_NAMES[1],
    diameter: '7.5"',
    depth: '4.5"',
    material: "Plant-based plastic",
    color: "White",
    price: "$17.99",
    stock: 36,
  },
];

const getAllProducts = () => {
  return handleGet(PRODUCTS_ENDPOINT);
}

const addProduct = async (product) => {
  const response = await handlePost(PRODUCTS_ENDPOINT, product);
  return response.id;
}

const updateProduct = async (id, fieldsToUpdate) => {
  const updatedProduct = await handlePatch(`${PRODUCTS_ENDPOINT}/${id}`, fieldsToUpdate);
  if (!updatedProduct) {
    throw new Error('Failed to update product');
  }
  return updatedProduct;
}

export { getAllProducts, addProduct, updateProduct, IMG_FILE_NAMES };
