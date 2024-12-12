const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  // Section A: Client Information
  organizationName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phoneNumber: { type: String },
  address: { type: String },

  // Section A: Project Overview
  businessOperations: { type: String },
  productPurpose: { type: String },

  // Section B: Product Vision and Objectives
  productVision: { type: String },
  productObjectives: [{ type: String }],
  targetAudience: { type: String },

  // Section C: Functional and Performance Requirements
  coreFunctions: { type: String },
  performanceMetrics: { type: String },
  preferredMaterials: { type: String },
  complianceStandards: [{ type: String }],
  environmentalConditions: { type: String },

  // Section D: Aesthetic and Design Preferences
  visualStyle: { type: String },
  ergonomicFeatures: { type: String },
  brandingRequirements: { type: String },

  // Section E: Budget and Timeline
  budgetRange: { type: String },
  preferredTimeline: { type: String },

  // Section F: Prototyping and Testing
  requirePrototypes: { type: Boolean, default: false },
  numberOfPrototypes: { type: Number },
  requiredTests: [{ type: String }],

  // Section G: Additional Information
  comparableProducts: { type: String },
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

module.exports = mongoose.model('Product', ProductSchema);
