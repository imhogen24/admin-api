const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');
const {
  supportValidationRules,
  validate
} = require('../middleware/validationMiddleware');

// Create a new support request
router.post(
  '/',
  supportValidationRules(),
  validate,
  supportController.createSupportRequest
);

// Get all support requests
router.get('/', supportController.getSupportRequests);

// Get support request by ID
router.get('/:id', supportController.getSupportRequestById);

// Update an existing support request
router.put(
  '/:id',
  supportValidationRules(),
  validate,
  supportController.updateSupportRequest
);

// Delete a support request
router.delete('/:id', supportController.deleteSupportRequest);

module.exports = router;
