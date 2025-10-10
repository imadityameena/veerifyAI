# Authentication System Setup Guide

## Overview

This CSV Sensei Dashboard now includes a professional authentication system with the following features:

- **Secure User Registration & Login**: Password hashing with bcrypt, JWT tokens
- **HTTP-only Cookies**: Secure token storage
- **Protected Routes**: Backend middleware for API protection
- **User Management**: Complete user profiles with company association
- **Professional Error Handling**: Comprehensive validation and error responses

## Backend Architecture

### Models

- **User Model** (`server/src/models/User.ts`): Complete user schema with validation
- **Record Model** (`server/src/models/Record.ts`): Updated to include user association

### Middleware

- **Authentication Middleware** (`server/src/middleware/auth.ts`): JWT verification and user context
- **Role-based Access Control**: Ready for future admin features

### Routes

- **Auth Routes** (`server/src/routes/auth.ts`): Signup, login, logout, profile management
- **Protected API Routes**: All data operations now require authentication

## Frontend Components

### Pages

- **Login Page** (`src/pages/Login.tsx`): Updated with real API integration
- **Signup Page** (`src/pages/Signup.tsx`): Complete registration form with validation

### Context

- **AuthContext** (`src/contexts/AuthContext.tsx`): Token-based authentication state management

## Environment Setup

### Required Environment Variables

Create a `.env` file in the root directory with:

```env
# Backend Environment Variables
MONGODB_URI=mongodb://localhost:27017/csv-sensei
PORT=4000

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRES_IN=7d

# Other existing variables...
```

### Security Notes

1. **JWT_SECRET**: Use a long, random string (minimum 32 characters)
2. **Production**: Set `NODE_ENV=production` for secure cookies
3. **HTTPS**: Ensure HTTPS in production for secure cookie transmission

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Protected Data Routes

- `GET /api/records` - Get user's records (requires auth)
- `POST /api/records` - Create new record (requires auth)
- `DELETE /api/records/:id` - Delete record (requires auth)

## Security Features

### Password Security

- **bcrypt hashing**: 12 rounds salt for password storage
- **Password validation**: Minimum 6 characters, complexity requirements
- **No plain text storage**: Passwords never stored in plain text

### Token Security

- **JWT tokens**: Signed with secret key
- **HTTP-only cookies**: Prevents XSS attacks
- **Token expiration**: Configurable expiration time
- **Secure cookies**: HTTPS-only in production

### Data Protection

- **User isolation**: Users can only access their own data
- **Input validation**: Comprehensive validation on all inputs
- **Error handling**: Secure error messages without information leakage

## Usage Instructions

### 1. Start the Backend

```bash
npm run server:dev
```

### 2. Start the Frontend

```bash
npm run dev
```

### 3. Access the Application

- Navigate to `http://localhost:5173`
- Click "Sign up" to create a new account
- Or use existing credentials to log in

### 4. Test Authentication

- Try accessing protected routes without authentication
- Verify that data is properly isolated per user
- Test logout functionality

## Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  email: String (unique, lowercase),
  password: String (hashed),
  company: String,
  firstName: String,
  lastName: String,
  role: String (default: 'user'),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Records Collection

```javascript
{
  _id: ObjectId,
  userId: String (required, indexed),
  userEmail: String (indexed),
  data: Mixed,
  createdAt: Date,
  updatedAt: Date
}
```

## Production Deployment

### Environment Variables

Ensure all environment variables are set in your production environment:

```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRES_IN=7d
```

### Security Checklist

- [ ] Strong JWT secret (32+ characters)
- [ ] HTTPS enabled
- [ ] Secure MongoDB connection
- [ ] Environment variables properly set
- [ ] CORS configured for production domains

## Troubleshooting

### Common Issues

1. **"JWT_SECRET is not defined"**

   - Ensure JWT_SECRET is set in your .env file

2. **"MongoDB connection failed"**

   - Check MONGODB_URI in .env file
   - Ensure MongoDB is running

3. **"Invalid token" errors**

   - Clear browser cookies
   - Check JWT_SECRET consistency

4. **CORS errors**
   - Verify frontend URL in CORS configuration
   - Check credentials: true setting

### Development Tips

- Use browser dev tools to inspect network requests
- Check server logs for detailed error messages
- Verify cookie settings in browser dev tools
- Test with different user accounts to verify isolation

## Future Enhancements

The authentication system is designed to support:

- **Role-based access control** (admin, user roles)
- **Password reset functionality**
- **Email verification**
- **Two-factor authentication**
- **Session management**
- **User profile management**

## Support

For issues or questions about the authentication system, check:

1. Server logs for backend errors
2. Browser console for frontend errors
3. Network tab for API request/response details
4. Database for user and record data integrity
