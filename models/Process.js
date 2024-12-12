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
