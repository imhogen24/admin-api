// middleware/validationMiddleware.js
const { body, validationResult } = require('express-validator');

// Validation rules for client inquiry
const processValidationRules = () => {
  return [
    body('organizationName').trim().notEmpty().withMessage('Organization name is required'),
    body('contactPerson').trim().notEmpty().withMessage('Contact person is required'),
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('email').normalizeEmail()
  ];
};


//CAD validation rules
const cadValidationRules = () => {
  return [
    body('organizationName').trim().notEmpty().withMessage('Organization name is required'),
    body('contactPerson').trim().notEmpty().withMessage('Contact person is required'),
    body('email').trim().isEmail().withMessage('Invalid email address').normalizeEmail(),
    body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number'),

    // CAD-specific validations
    body('documentationTypes').optional().isArray().withMessage('Documentation types must be an array'),
    body('fileFormats').optional().isArray().withMessage('File formats must be an array'),
    body('preferredTimeline').optional().trim(),
    body('requirePeriodicDrafts').optional().isBoolean().withMessage('Periodic drafts must be a boolean')
  ];
};

//Product validation rules
const productValidationRules = () => {
    return [
      body('organizationName').trim().notEmpty().withMessage('Organization name is required'),
      body('contactPerson').trim().notEmpty().withMessage('Contact person is required'),
      body('email').trim().isEmail().withMessage('Invalid email address'),
      body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number'),
      body('email').normalizeEmail()
    ];
  };

  //support validation rules
  const supportValidationRules = () => {
    return [
      body('organizationName').trim().notEmpty().withMessage('Organization name is required'),
      body('contactPerson').trim().notEmpty().withMessage('Contact person is required'),
      body('email').trim().isEmail().withMessage('Invalid email address'),
      body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number'),
      body('email').normalizeEmail(),
      body('numberOfParticipants').optional().isInt({ min: 1 }).withMessage('Number of participants must be a positive integer'),
      body('participantSkillLevel').optional().isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid skill level'),
      body('trainingDeliveryMode').optional().isIn(['On-site', 'Virtual', 'Blended']).withMessage('Invalid training delivery mode'),
      body('projectDeadline').optional().isISO8601().toDate().withMessage('Invalid date format'),
    ];
  };

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  supportValidationRules,
  productValidationRules,
  processValidationRules,
  cadValidationRules,
  validate
};
