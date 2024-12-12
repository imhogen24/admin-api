const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {
  productValidationRules,
  validate
} = require('../middleware/validationMiddleware');

// Create a new product inquiry
router.post(
  '/',
  productValidationRules(),
  validate,
  productController.createProduct
);

// Get all product inquiries
router.get('/', productController.getProducts);

// Get product inquiry by ID
router.get('/:id', productController.getProductById);

// Update an existing product inquiry
router.put(
  '/:id',
  productValidationRules(),
  validate,
  productController.updateProduct
);

// Delete a product inquiry
router.delete('/:id', productController.deleteProduct);

module.exports = router;
