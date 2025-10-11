import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { router as api } from './routes';
import { authRoutes } from './routes/auth';
import { adminRoutes } from './routes/admin';
import { featureToggleRoutes } from './routes/featureToggles';
import { publicFeatureToggleRoutes } from './routes/publicFeatureToggles';

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://veerify-ai-frontend.vercel.app/',
  
];

// Add dynamic origin from environment variable
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or matches wildcard patterns
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        const pattern = allowedOrigin.replace(/\*/g, '.*');
        return new RegExp(pattern).test(origin);
      }
      return allowedOrigin === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/feature-toggles', featureToggleRoutes);
app.use('/api/feature-toggles', publicFeatureToggleRoutes);
app.use('/api', api);

const port = parseInt(process.env.PORT || '4000', 10);
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('❌ MONGODB_URI environment variable is required');
  process.exit(1);
}

// MongoDB connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  await connectDB();
  
  app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 API server running on port ${port}`);
    console.log(`📊 CSV Sensei Dashboard API ready`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  mongoose.connection.close().then(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  mongoose.connection.close().then(() => {
    process.exit(0);
  });
});

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
