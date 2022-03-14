// importing required files
const Product = require("../Model/products");
const Errorhandler = require("../utils/errorhandler");
const ApiFeatures = require("../utils/apiFeatures");

// Create products - User Specific
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  const resultPerPage = 12;
  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  const productCount = await Product.countDocuments();
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
};

// Delete a Product - User Specific
exports.DeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new Errorhandler("Product Not found", 404));
    }
    await product.remove();
    res.status(200).json({
      success: true,
      message: `${product.productName} is deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ProductDetails
exports.productDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new Errorhandler("Product Not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
