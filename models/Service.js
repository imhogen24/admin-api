const mongoose = require('mongoose');

const ClientInquirySchema = new mongoose.Schema({
  // Section A: Client Information
  organizationDetails: {
    name: {
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
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    }
  },

  // Business Overview
  businessOverview: {
    description: {
      type: String,
      required: true
    },
    primaryPurpose: {
      type: String,
      required: true
    }
  },

  // Section B: Current Process Overview
  currentProcess: {
    existingSystem: {
      description: {
        type: String,
        required: true
      },
      purpose: {
        type: String,
        required: true
      }
    },
    keyMetrics: {
      throughput: {
        type: Number,
        required: true
      },
      efficiency: {
        type: Number,
        required: true
      },
      errorRate: {
        type: Number,
        required: true
      }
    }
  },

  // Section C: Challenges
  challenges: {
    painPoints: [{
      type: String,
      enum: [
        'Low efficiency',
        'High operating costs',
        'Low output',
        'Quality issues'
      ]
    }],
    specificIssues: [String]
  },

  // Section D: Desired Improvements
  improvements: {
    goals: [{
      type: String,
      enum: [
        'Increased efficiency',
        'Reduced costs',
        'Enhanced quality',
        'Higher output'
      ]
    }],
    performanceTargets: {
      throughput: String,
      defectRate: String
    }
  },

  // Section E: Functional Requirements
  functionalRequirements: {
    keyFunctions: [String],
    materialIntroduction: {
      type: String,
      enum: ['Manually', 'Conveyor or automated systems']
    },
    specialRequirements: [String]
  },

  // Section F: Space and Power Constraints
  spaceAndPower: {
    spaceAvailable: {
      type: String,
      required: true
    },
    powerSupply: {
      type: String,
      required: true
    },
    environmentalConditions: String
  },

  // Section G: Scalability
  scalability: {
    anticipateFutureGrowth: {
      type: Boolean,
      default: false
    },
    growthAccommodation: String,
    comparableSystems: String
  },

  // Section H: Additional Information
  additionalInfo: {
    collaborationPreferences: [{
      type: String,
      enum: [
        'Regular Meetings',
        'Weekly Updates via Email',
        'On-demand Reporting'
      ]
    }],
    otherComments: String
  },

  // Declaration
  declaration: {
    signedBy: {
      type: String,
      required: true
    },
    signedDate: {
      type: Date,
      default: Date.now
    }
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

// Create indexes for faster querying
ClientInquirySchema.index({ 'organizationDetails.name': 1 });
ClientInquirySchema.index({ 'organizationDetails.email': 1 });
ClientInquirySchema.index({ createdAt: -1 });

const ClientInquiry = mongoose.model('ClientInquiry', ClientInquirySchema);

module.exports = ClientInquiry;
