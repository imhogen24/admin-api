const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: 'Product inquiry submitted successfully',
      product: savedProduct
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error submitting product inquiry',
      error: error.message
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving product inquiries',
      error: error.message
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select('-__v');

    if (!product) {
      return res.status(404).json({ message: 'Product inquiry not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving product inquiry',
      error: error.message
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product inquiry not found' });
    }

    res.status(200).json({
      message: 'Product inquiry updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating product inquiry',
      error: error.message
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product inquiry not found' });
    }

    res.status(200).json({
      message: 'Product inquiry deleted successfully',
      product: deletedProduct
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting product inquiry',
      error: error.message
    });
  }
};
