const mongoose = require('mongoose');

const CadSchema = new mongoose.Schema({
  // Section A: Client Information
  organizationName: {
    type: String,
    required: true,
    trim: true
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },

  // 2. Project Overview
  organizationOperations: {
    type: String,
    trim: true
  },
  documentationPurpose: {
    type: String,
    trim: true
  },

  // Section B: Documentation Requirements
  documentationTypes: [{
    type: String,
    enum: [
      '2D Engineering Drawings',
      '3D Models',
      'Rendered Images',
      'Technical Illustrations',
      'User Manuals',
      'Other'
    ]
  }],
  otherDocumentationType: {
    type: String,
    trim: true
  },

  fileFormats: [{
    type: String,
    enum: [
      'CAD files',
      'Vector images',
      'PDF documents',
      'Other'
    ]
  }],
  otherFileFormat: {
    type: String,
    trim: true
  },

  // 3. Specifications and Technical Details
  technicalSpecifications: {
    type: String,
    trim: true
  },
  technicalStandards: {
    type: String,
    trim: true
  },

  // Section C: Aesthetic and Layout Preferences
  visualStylePreferences: {
    type: String,
    trim: true
  },
  layoutPreferences: {
    type: String,
    trim: true
  },
  additionalDesignFeatures: {
    type: String,
    trim: true
  },

  // Section D: Project Specifics
  preferredTimeline: {
    type: String,
    trim: true
  },
  requirePeriodicDrafts: {
    type: Boolean,
    default: false
  },
  additionalServices: {
    type: String,
    trim: true
  },
  additionalComments: {
    type: String,
    trim: true
  },

  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cad', CadSchema);
