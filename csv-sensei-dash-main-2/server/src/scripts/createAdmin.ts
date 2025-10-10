import mongoose from 'mongoose';
import 'dotenv/config';
import { UserModel } from '../models/User';

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI not set');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await UserModel.findOne({ email: 'admin@csvsensei.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      console.log('Admin details:', {
        email: existingAdmin.email,
        firstName: existingAdmin.firstName,
        lastName: existingAdmin.lastName,
        role: existingAdmin.role,
        isActive: existingAdmin.isActive
      });
      process.exit(0);
    }

    // Create admin user
    const adminUser = new UserModel({
      email: 'admin@csvsensei.com',
      password: 'Admin123!', // This will be hashed automatically
      firstName: 'Admin',
      lastName: 'User',
      company: 'CSV Sensei',
      role: 'admin',
      isActive: true
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
    console.log('Admin details:', {
      email: adminUser.email,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
      role: adminUser.role,
      isActive: adminUser.isActive
    });
    console.log('\nLogin credentials:');
    console.log('Email: admin@csvsensei.com');
    console.log('Password: Admin123!');
    console.log('\nYou can access the admin portal at: http://localhost:5173/admin/login');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

// Run the script
createAdminUser();
