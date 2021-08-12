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
