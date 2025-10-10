import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { router as api } from './routes';
import { authRoutes } from './routes/auth';

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
app.use('/api', api);

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI not set');
  process.exit(1);
}

mongoose.connect(mongoUri).then(() => {
  console.log('MongoDB connected');
  
  app.listen(port, () => {
    console.log(`🚀 API server running on port ${port}`);
    console.log(`📊 CSV Sensei Dashboard API ready`);
  });
}).catch(err => {
  console.error('Mongo connect error', err);
  process.exit(1);
});
