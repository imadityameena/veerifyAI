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
app.use(cors({ 
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://*.vercel.app',
    'https://csv-sensei-dash.vercel.app'
  ], 
  credentials: true 
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

const port = (global as any).process.env.PORT || 4000;
const mongoUri = (global as any).process.env.MONGODB_URI;
if (!mongoUri) {
  (global as any).console.error('MONGODB_URI not set');
  (global as any).process.exit(1);
}

mongoose.connect(mongoUri).then(() => {
  (global as any).console.log('MongoDB connected');
  
  app.listen(port, () => {
    (global as any).console.log(`🚀 API server running on port ${port}`);
    (global as any).console.log(`📊 CSV Sensei Dashboard API ready`);
  });
}).catch(err => {
  (global as any).console.error('Mongo connect error', err);
  (global as any).process.exit(1);
});
