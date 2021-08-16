import Product from "../models/productModel.js";
import asynchandler from "express-async-handler";

// @desc FETCH ALL PRODUCTS
// @router /api/products/
// @access public
export const getProducts = asynchandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc FETCH single product
// @router /api/products/:id
// @access public
export const getProductById = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc DELETE Product by id
// @router DELETE /api/products/:id
// @access Private/Admin
export const deleteProductById = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.status(201).json({
      message: `Product Deleted by admin of id #${req.user._id} `,
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// @desc create new product
// @router DELETE /api/products
// @access Private/Admin
export const createProduct = asynchandler(async (req, res) => {
  const product = new Product({
    name: "sample",
    price: "69.69",
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample",
    category: "test",
    countInStock: 2,
    numReviews: 5,
    description: "This is sample",
  });
  const savedProduct = await product.save();
  res.status(201).json(savedProduct);
});
// @desc update product
// @router PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asynchandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;
  const product = await Product.findById(req.params.id).exec();
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;
    const updatedProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
