import mongoose, { Schema, InferSchemaType } from 'mongoose';

const usageTrackingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  schemaType: {
    type: String,
    required: true,
    enum: ['op_billing', 'doctor_roster', 'compliance_ai'],
    index: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  rowCount: {
    type: Number,
    required: true
  },
  processingTime: {
    type: Number, // in milliseconds
    required: true
  },
  success: {
    type: Boolean,
    required: true,
    default: true
  },
  errorMessage: {
    type: String,
    default: null
  },
  ipAddress: {
    type: String,
    default: null
  },
  userAgent: {
    type: String,
    default: null
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc: any, ret: any) {
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for better query performance
usageTrackingSchema.index({ userId: 1, schemaType: 1 });
usageTrackingSchema.index({ schemaType: 1, createdAt: -1 });
usageTrackingSchema.index({ createdAt: -1 });
usageTrackingSchema.index({ success: 1 });

// Static method to get usage statistics
usageTrackingSchema.statics.getUsageStats = async function() {
  const pipeline: any[] = [
    {
      $group: {
        _id: {
          schemaType: '$schemaType',
          success: '$success'
        },
        count: { $sum: 1 },
        totalRows: { $sum: '$rowCount' },
        avgProcessingTime: { $avg: '$processingTime' }
      }
    },
    {
      $group: {
        _id: '$_id.schemaType',
        totalUses: { $sum: '$count' },
        successfulUses: {
          $sum: {
            $cond: [{ $eq: ['$_id.success', true] }, '$count', 0]
          }
        },
        totalRows: { $sum: '$totalRows' },
        avgProcessingTime: { $avg: '$avgProcessingTime' }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'userCount'
      }
    },
    {
      $project: {
        schemaType: '$_id',
        totalUses: 1,
        successfulUses: 1,
        totalRows: 1,
        avgProcessingTime: 1,
        uniqueUsers: { $size: '$userCount' }
      }
    }
  ];

  return this.aggregate(pipeline);
};

// Static method to get user usage statistics
usageTrackingSchema.statics.getUserUsageStats = async function() {
  const pipeline: any[] = [
    {
      $group: {
        _id: '$userId',
        totalUses: { $sum: 1 },
        successfulUses: {
          $sum: { $cond: [{ $eq: ['$success', true] }, 1, 0] }
        },
        schemasUsed: { $addToSet: '$schemaType' },
        lastUsed: { $max: '$createdAt' }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $project: {
        userId: '$_id',
        userEmail: '$user.email',
        userCompany: '$user.company',
        totalUses: 1,
        successfulUses: 1,
        schemasUsed: 1,
        lastUsed: 1
      }
    },
    {
      $sort: { totalUses: -1 }
    }
  ];

  return this.aggregate(pipeline);
};

// Static method to get recent activity
usageTrackingSchema.statics.getRecentActivity = async function(limit = 10) {
  return this.find()
    .populate('userId', 'firstName lastName email company')
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
};

export type UsageTracking = InferSchemaType<typeof usageTrackingSchema>;

// Define the interface for the document
interface UsageTrackingDocument extends UsageTracking, mongoose.Document {}

// Define the interface for the model with static methods
interface UsageTrackingModelInterface extends mongoose.Model<UsageTrackingDocument> {
  getUsageStats(): Promise<any[]>;
  getUserUsageStats(): Promise<any[]>;
  getRecentActivity(limit?: number): Promise<UsageTrackingDocument[]>;
}

export const UsageTrackingModel = mongoose.model<UsageTrackingDocument, UsageTrackingModelInterface>('UsageTracking', usageTrackingSchema);
