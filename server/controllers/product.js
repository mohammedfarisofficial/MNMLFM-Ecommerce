import Color from "../models/Color.js";
import Product from "../models/Product.js";
import Size from "../models/Size.js";

const allProducts = async (req, res) => {
  const product = await Product.find();
  res.status(200).json(product);
};
const addProduct = async (req, res) => {
  const { name, imageUrls, desc, qty, isTop, colors, sizes, price, category } =
    req.body;

  const convertedColors = await Promise.all(
    colors.map(async (colorId) => {
      const color = await Color.findById(colorId);
      if (color) {
        return color.code;
      }
    })
  );
  const convertedSizes = await Promise.all(
    sizes.map(async (sizeId) => {
      const size = await Size.findById(sizeId);
      if (size) {
        return size.size;
      }
    })
  );

  console.log("converted colours : ", convertedColors);
  console.log("converted sizes : ", convertedSizes);
  try {
    const newProduct = new Product({
      name,
      imageUrls,
      desc,
      qty,
      isTop,
      colors: convertedColors,
      sizes: convertedSizes,
      price,
      category,
    });
    await newProduct.save();
    console.log(newProduct);

    return res.status(200).json({ newProduct });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const getProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  res.json({
    status: "SUCESS",
    product,
  });
};

export { allProducts, addProduct, getProduct };
