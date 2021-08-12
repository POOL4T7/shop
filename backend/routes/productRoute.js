import express from "express";
import Product from "../models/productModel.js";
import asynchandler from "express-async-handler";
const router = express.Router();

// @desc FETCH ALL PRODUCTS
// @router /api/products/
// @access public
router.get(
  "/",
  asynchandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
// @desc FETCH single product
// @router /api/products/:id
// @access public
router.get(
  "/:id",
  asynchandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default router;
