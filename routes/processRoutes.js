const express = require('express');
const router = express.Router();
const processController = require('../controllers/processController');
const {
  processValidationRules,
  validate
} = require('../middleware/validationMiddleware');

// Create a new client inquiry
router.post(
  '/',
  processValidationRules(),
  validate,
  processController.createProcess
);

// Get all inquiries
router.get('/', processController.getProceses);

// Get inquiry by ID
router.get('/:id', processController.getProcessById);

// Update an existing inquiry
router.put(
  '/:id',
  processValidationRules(),
  validate,
  processController.updateProcess
);

// Delete an inquiry
router.delete('/:id', processController.deleteProcess);

module.exports = router;
