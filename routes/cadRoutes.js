const express = require('express');
const router = express.Router();
const cadController = require('../controllers/cadController');
const {
  cadValidationRules,
  validate
} = require('../middleware/validationMiddleware');

// Create a new CAD documentation request
router.post(
  '/',
  cadValidationRules(),
  validate,
  cadController.createCadRequest
);

// Get all CAD documentation requests
router.get('/', cadController.getCadRequests);

// Get CAD documentation request by ID
router.get('/:id', cadController.getCadRequestById);

// Update an existing CAD documentation request
router.put(
  '/:id',
  cadValidationRules(),
  validate,
  cadController.updateCadRequest
);

// Delete a CAD documentation request
router.delete('/:id', cadController.deleteCadRequest);

module.exports = router;
