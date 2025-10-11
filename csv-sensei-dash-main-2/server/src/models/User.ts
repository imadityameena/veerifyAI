import mongoose, { Schema, InferSchemaType } from 'mongoose';
import bcrypt from 'bcrypt';


const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    minlength: [2, 'Company name must be at least 2 characters long']
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters long']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters long']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc: any, ret: any) {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
});

// Index for better query performance (email already has unique index)
userSchema.index({ company: 1 });

// Hash password before saving
userSchema.pre('save', async function(next: any) {
  if (!this.isModified('password')) return next();
  
  try {
    // const salt =  bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Static method to find user by email
userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

export type User = InferSchemaType<typeof userSchema>;

// Define the interface for the document with instance methods
interface UserDocument extends User, mongoose.Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the interface for the model with static methods
interface UserModelInterface extends mongoose.Model<UserDocument> {
  findByEmail(email: string): Promise<UserDocument | null>;
}

export const UserModel = mongoose.model<UserDocument, UserModelInterface>('User', userSchema);
