const mongoose = require('mongoose');

const SupportSchema = new mongoose.Schema({
  // Section A: Client Information
  organizationName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phoneNumber: { type: String },
  physicalPostalAddress: { type: String },

  // Section B: Training Requirements
  trainingNeeds: { type: String },
  trainingObjectives: { type: String },
  numberOfParticipants: { type: Number },
  participantRoles: { type: String },
  participantSkillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  trainingDeliveryMode: {
    type: String,
    enum: ['On-site', 'Virtual', 'Blended']
  },
  trainingTimeline: { type: String },

  // Section C: Project Support Requirements
  projectOverview: { type: String },
  projectScopeDeliverables: { type: String },
  collaborationPreferences: [{
    type: String,
    enum: ['Regular meetings', 'Weekly updates via email', 'On-demand reporting']
  }],
  projectDeadline: { type: Date },

  // Section D: Additional Considerations
  toolsAndResources: { type: String },
  longTermCollaboration: { type: Boolean },
  additionalInformation: { type: String },

  // Declaration
  declarationDate: { type: Date, default: Date.now },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Support', SupportSchema);
