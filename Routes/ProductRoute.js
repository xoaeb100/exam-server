//importing required files
const express = require("express");
const {
  createProduct,
  getAllProducts,
  DeleteProduct,
  productDetails,
} = require("../Controller/productController");
const router = express.Router();

// Create products
router.route("/product/new").post(createProduct);
router.route("/products").get(getAllProducts);
router.route("/product/:id").delete(DeleteProduct).get(productDetails);

module.exports = router;
