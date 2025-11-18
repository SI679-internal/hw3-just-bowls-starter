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
  return initBowls;
}


export { getAllProducts, IMG_FILE_NAMES };
