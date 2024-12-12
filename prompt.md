Root dir: Admin API

config dir:
 ```db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

```

contollers dir:
```processController.js

const process = require('../models/Process');

exports.createProcess = async (req, res) => {
  try {
    const newProcess = new process(req.body);
    const savedProcess = await newProcess.save();

    res.status(201).json({
      message: 'Client Process submitted successfully',
      process: savedProcess
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error submitting client Process',
      error: error.message
    });
  }
};

exports.getProceses = async (req, res) => {
  try {
    const proceses = await process.find()
      .sort({ createdAt: -1 })
      .select('-__v'); // Exclude version key

    res.status(200).json(proceses);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving Proceses',
      error: error.message
    });
  }
};

exports.getProcessById = async (req, res) => {
  try {
    const process = await process.findById(req.params.id).select('-__v');

    if (!process) {
      return res.status(404).json({ message: 'Process not found' });
    }

    res.status(200).json(process);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving Process',
      error: error.message
    });
  }
};

exports.updateProcess = async (req, res) => {
  try {
    const updatedProcess = await process.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProcess) {
      return res.status(404).json({ message: 'Process not found' });
    }

    res.status(200).json({
      message: 'Process updated successfully',
      Process: updatedProcess
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating Process',
      error: error.message
    });
  }
};

exports.deleteProcess = async (req, res) => {
  try {
    const deletedProcess = await process.findByIdAndDelete(req.params.id);

    if (!deletedProcess) {
      return res.status(404).json({ message: 'Process not found' });
    }

    res.status(200).json({
      message: 'Process deleted successfully',
      Process: deletedProcess
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting Process',
      error: error.message
    });
  }
};
```

```validationMiddleware.js
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
  processValidationRules,
  validate
};

```

models dir:
```Process.js
const mongoose = require('mongoose');

const ProcessSchema = new mongoose.Schema({
  // Section A: Client Information
  organizationName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phoneNumber: { type: String },
  address: { type: String },

  // Section B: Business Overview
  businessOperations: { type: String },
  processPurpose: { type: String },

  // Section C: Current Process Overview
  currentProcess: { type: String },
  currentProcessPurpose: { type: String },
  currentPerformanceMetrics: { type: String },

  // Section C: Challenges
  painPoints: [{
    type: String,
    enum: [
      'Low efficiency',
      'High operating costs',
      'Safety concerns',
      'Low output',
      'Quality issues',
      'Other'
    ]
  }],
  specificChallenges: { type: String },

  // Section D: Desired Improvements
  improvementGoals: [{
    type: String,
    enum: [
      'Increased efficiency',
      'Reduced costs',
      'Improved safety',
      'Enhanced quality',
      'Higher output',
      'Other'
    ]
  }],
  performanceTargets: { type: String },

  // Section E: Functional Requirements
  primaryFunctions: { type: String },
  operationalNeeds: [{
    type: String,
    enum: ['Manually', 'Conveyor or automated systems', 'Other']
  }],
  specialRequirements: { type: String },

  // Section F: Space and Power Constraints
  spaceAvailability: { type: String },
  powerSupply: { type: String },
  environmentalFactors: { type: String },

  // Section G: Scalability
  anticipateFutureGrowth: { type: Boolean },
  growthAccommodation: { type: String },
  comparableSystems: { type: String },

  // Section H: Additional Information
  collaborationPreferences: [{
    type: String,
    enum: ['Regular Meetings', 'Weekly Updates via Email', 'On-demand Reporting']
  }],
  additionalComments: { type: String },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('process', ProcessSchema);
```

routes dir:
```processRoutes.js
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
router.get('/', processController.getProcesses);

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
```


```.env
PORT=5000
MONGODB_URI=mongodb+srv://imhogen22:jLqAIj91BaPYhWif@cluster0.x7uyb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=2ad4d2bcbf4df0c49def284bdf5a6d236091f0625f21d4bdd2699ba4c0a010e71141c3b76ddb40b8418fe6846a8051f738bfa3631e7a5ca076f6cbd969d524c2
ADMIN_PASSWORD=@Ii%0245
```

```server.js
// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const processRoutes = require('./routes/processRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Add security headers
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/processes', processRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

```
