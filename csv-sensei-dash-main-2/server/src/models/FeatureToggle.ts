import mongoose, { Schema, InferSchemaType } from 'mongoose';

const featureToggleSchema = new Schema({
  featureName: {
    type: String,
    required: [true, 'Feature name is required'],
    unique: true,
    enum: ['op_billing', 'doctor_roster', 'compliance_ai'],
    trim: true
  },
  isEnabled: {
    type: Boolean,
    default: true
  },
  displayName: {
    type: String,
    required: [true, 'Display name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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

// Index for better query performance
// Note: featureName index is automatically created by unique: true

// Static method to get all feature toggles
featureToggleSchema.statics.getAllToggles = function() {
  return this.find({}).sort({ featureName: 1 });
};

// Static method to get a specific toggle
featureToggleSchema.statics.getToggle = function(featureName: string) {
  return this.findOne({ featureName });
};

// Static method to update toggle status
featureToggleSchema.statics.updateToggle = function(featureName: string, isEnabled: boolean, modifiedBy: string) {
  return this.findOneAndUpdate(
    { featureName },
    { isEnabled, lastModifiedBy: modifiedBy },
    { new: true, upsert: true }
  );
};

export type FeatureToggle = InferSchemaType<typeof featureToggleSchema>;

// Define the interface for the document with instance methods
interface FeatureToggleDocument extends FeatureToggle, mongoose.Document {}

// Define the interface for the model with static methods
interface FeatureToggleModelInterface extends mongoose.Model<FeatureToggleDocument> {
  getAllToggles(): Promise<FeatureToggleDocument[]>;
  getToggle(featureName: string): Promise<FeatureToggleDocument | null>;
  updateToggle(featureName: string, isEnabled: boolean, modifiedBy: string): Promise<FeatureToggleDocument>;
}

export const FeatureToggleModel = mongoose.model<FeatureToggleDocument, FeatureToggleModelInterface>('FeatureToggle', featureToggleSchema);
