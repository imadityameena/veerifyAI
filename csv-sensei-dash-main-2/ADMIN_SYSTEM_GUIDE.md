# Admin System Guide

## Overview

This admin system provides comprehensive user management capabilities with a professional interface. It includes admin authentication, user statistics, and full CRUD operations for user management.

## Features

### 🔐 Admin Authentication

- Secure admin login with role-based access control
- Professional login interface with eye button for password visibility
- JWT-based authentication with HTTP-only cookies
- Automatic redirect for non-admin users

### 📊 Admin Dashboard

- Real-time user statistics and analytics
- User management with search, filtering, and pagination
- User status management (activate/deactivate)
- User role management
- Professional UI with modern design

### 🛡️ Security Features

- Role-based access control
- Protected admin routes
- Secure password validation
- CSRF protection
- Input validation and sanitization

## Getting Started

### 1. Create Admin User

First, create an admin user in your database:

```bash
npm run create-admin
```

This will create an admin user with:

- Email: `admin@csvsensei.com`
- Password: `Admin123!`
- Role: `admin`

### 2. Start the Application

```bash
# Start the backend server
npm run server:dev

# Start the frontend (in another terminal)
npm run dev
```

### 3. Access Admin Portal

1. Go to `http://localhost:5173/admin/login`
2. Login with the admin credentials
3. You'll be redirected to the admin dashboard

## Admin System Architecture

### Backend Structure

```
server/src/
├── middleware/
│   └── adminAuth.ts          # Admin authentication middleware
├── routes/
│   └── admin.ts              # Admin API routes
└── scripts/
    └── createAdmin.ts        # Admin user creation script
```

### Frontend Structure

```
src/
├── pages/
│   ├── AdminLogin.tsx        # Admin login page
│   └── AdminDashboard.tsx    # Admin dashboard
└── components/
    └── AdminProtectedRoute.tsx # Admin route protection
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login (supports admin role)
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Admin Management

- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get users with pagination and filtering
- `GET /api/admin/users/:id` - Get specific user
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `PATCH /api/admin/users/:id/toggle-status` - Toggle user status

## User Management Features

### Statistics Dashboard

- Total users count
- Active/inactive users
- Recent activity (last 30 days)
- New signups (last 30 days)
- Admin vs regular users

### User Operations

- **Search**: Search by name, email, or company
- **Filter**: Filter by role (admin/user) and status (active/inactive)
- **Sort**: Sort by creation date, last login, etc.
- **Pagination**: Navigate through large user lists
- **Actions**:
  - View user details
  - Activate/deactivate users
  - Delete users (with confirmation)
  - Create new users

### Security Measures

- Admin users cannot delete themselves
- Admin users cannot deactivate themselves
- All admin routes require authentication
- Role-based access control
- Input validation and sanitization

## Database Schema

The User model includes:

```typescript
{
  email: string;
  password: string; // hashed
  firstName: string;
  lastName: string;
  company: string;
  role: 'user' | 'admin';
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

## Customization

### Adding New Admin Features

1. **Add new API endpoint** in `server/src/routes/admin.ts`
2. **Add middleware** if needed in `server/src/middleware/adminAuth.ts`
3. **Update frontend** in `src/pages/AdminDashboard.tsx`
4. **Add new routes** in `src/App.tsx` if needed

### Styling

The admin system uses:

- Tailwind CSS for styling
- Shadcn/ui components
- Lucide React icons
- Modern gradient designs
- Responsive layout

### Environment Variables

Make sure these are set in your `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Troubleshooting

### Common Issues

1. **Admin login not working**

   - Ensure admin user exists: `npm run create-admin`
   - Check MongoDB connection
   - Verify JWT_SECRET is set

2. **Access denied errors**

   - Check if user has admin role
   - Verify authentication token
   - Check browser cookies

3. **API errors**
   - Check server logs
   - Verify CORS settings
   - Check database connection

### Development Tips

1. **Test with different users**: Create both admin and regular users
2. **Check browser network tab**: Monitor API calls
3. **Use browser dev tools**: Check authentication state
4. **Monitor server logs**: Watch for errors

## Security Best Practices

1. **Change default admin password** after first login
2. **Use strong JWT secrets** in production
3. **Enable HTTPS** in production
4. **Regular security audits** of user permissions
5. **Monitor admin access logs**

## Production Deployment

1. **Set secure environment variables**
2. **Enable HTTPS**
3. **Configure proper CORS settings**
4. **Set up monitoring and logging**
5. **Regular database backups**

## Support

For issues or questions:

1. Check the logs for error messages
2. Verify all environment variables are set
3. Ensure MongoDB is running and accessible
4. Check network connectivity between frontend and backend

---

_This admin system is designed to be professional, secure, and easily extensible for future requirements._
