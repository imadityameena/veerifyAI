import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, Mail, Shield, ArrowLeft, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ModeToggle } from '@/components/ui/mode-toggle';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isValidating, setIsValidating] = useState(false);

  // Clear error when user starts typing
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    setIsValidating(true);
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsValidating(false);
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsValidating(false);
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsValidating(false);
      return false;
    }

    setIsValidating(false);
    return true;
  };

  // Get the API base URL from environment variables
  const getApiUrl = () => {
    return import.meta.env.VITE_API_URL || '/api';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${getApiUrl()}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        // Check if user is admin
        if (data.data.user.role !== 'admin') {
          setError('Access denied. Admin privileges required.');
          setIsLoading(false);
          return;
        }

        // Use auth context to login
        login(data.data.user);
        
        // Navigate to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F8FF] dark:bg-gray-900 flex relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 dark:from-blue-400/10 dark:to-indigo-400/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 dark:from-indigo-400/10 dark:to-purple-400/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 bg-gradient-to-r from-purple-200/20 to-pink-200/20 dark:from-purple-400/10 dark:to-pink-400/10 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 dark:from-blue-400/10 dark:to-cyan-400/10 rounded-full animate-float"></div>
        
        {/* Geometric patterns */}
        <div className="absolute top-32 left-1/4 w-16 h-16 bg-gradient-to-r from-blue-300/20 to-indigo-300/20 dark:from-blue-600/20 dark:to-indigo-600/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 right-1/4 w-12 h-12 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 dark:from-indigo-600/20 dark:to-purple-600/20 rotate-12 animate-spin-medium"></div>
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-gradient-to-r from-purple-300/20 to-pink-300/20 dark:from-purple-600/20 dark:to-pink-600/20 rotate-45 animate-pulse"></div>
        
        {/* Security-themed elements */}
        <div className="absolute top-1/3 left-1/2 w-16 h-16 border-2 border-blue-400/10 dark:border-blue-400/20 rounded-lg rotate-12 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 border-2 border-indigo-400/10 dark:border-indigo-400/20 rounded-lg rotate-45 animate-pulse"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full auth-grid-pattern"></div>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ModeToggle />
      </div>
      
      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10">
        <div className="flex flex-col justify-center items-center text-center px-12 w-full">
          <div className="mb-12 max-w-lg">
            {/* Logo */}
            <div className="w-48 h-48 flex items-center justify-center mx-auto mb-6">
              <img src="/src/assets/logo.png" alt="VeerifyAI Logo" className="w-full h-full object-contain" />
            </div>
            
            {/* Subtitle */}
            <p className="text-xl text-gray-800 dark:text-gray-300 mb-8 animate-fade-in-delay">
              Secure Administrative Access
            </p>
            
            {/* Features List */}
            <div className="space-y-4 text-left animate-slide-in-left">
              <div className="flex items-center space-x-3 group">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg group-hover:scale-110 transition-transform"></div>
                <span className="text-base text-gray-800 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Enterprise-grade security</span>
              </div>
              <div className="flex items-center space-x-3 group animate-slide-in-left-delay">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg group-hover:scale-110 transition-transform"></div>
                <span className="text-base text-gray-800 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Advanced system controls</span>
              </div>
              <div className="flex items-center space-x-3 group animate-slide-in-left-delay-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg group-hover:scale-110 transition-transform"></div>
                <span className="text-base text-gray-800 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Comprehensive analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Admin Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          {/* Back to regular login */}
          <div className="mb-4">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to regular login
            </Link>
          </div>

          {/* Admin Login Card */}
          <Card className="shadow-2xl border-0 bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                Admin Portal
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                Sign in to access the administrative dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="border-red-500/50 bg-red-500/10 backdrop-blur-sm">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-200">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Admin Email
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className="pl-10 h-10 bg-white/80 dark:bg-white/10 border-gray-300 dark:border-gray-600/50 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 focus:bg-white dark:focus:bg-white/20 transition-all duration-200"
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className="pl-10 pr-10 h-10 bg-white/80 dark:bg-white/10 border-gray-300 dark:border-gray-600/50 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 focus:bg-white dark:focus:bg-white/20 transition-all duration-200"
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25 group"
                  disabled={isLoading || isValidating}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Sign In to Admin Portal</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="text-center pt-3">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  🔒 This portal is protected by advanced security measures
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security notice */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Secure admin access with enterprise-grade authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;