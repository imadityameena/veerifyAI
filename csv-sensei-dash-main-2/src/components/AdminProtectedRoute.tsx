import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoading, user } = useAuth();

  console.log('AdminProtectedRoute - isLoading:', isLoading, 'isLoggedIn:', isLoggedIn, 'user:', user);

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // If user is not logged in, redirect to admin login
  if (!isLoggedIn) {
    console.log('AdminProtectedRoute - User not logged in, redirecting to admin login');
    return <Navigate to="/admin/login" replace />;
  }

  // If user is logged in but not admin, redirect to regular app
  if (user && user.role !== 'admin') {
    console.log('AdminProtectedRoute - User is not admin, redirecting to demo');
    return <Navigate to="/demo" replace />;
  }

  // If user is admin, render the protected component
  console.log('AdminProtectedRoute - User is admin, rendering protected component');
  return <>{children}</>;
};

export default AdminProtectedRoute;
