import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, CheckCircle, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Logo } from '@/components/Logo';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiUrl}/auth/login`, {
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
        // Use auth context to login
        login(data.data.user);
        
        // Navigate to demo page
        navigate('/demo');
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

  return (
    <div className="h-screen bg-[#F0F8FF] dark:bg-gray-900 flex relative">

      {/* Logo */}
      <div className="absolute top-8 left-6 z-20">
        <Logo size="md" showIndicator={false} />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ModeToggle />
      </div>
      
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-3/5 relative items-center justify-center">
        <img 
          src="/src/assets/loginpage3.png" 
          alt="Login" 
          className="max-w-[100%] max-h-[100%] object-contain"
        />
      </div>
      
      {/* Right Side - Login Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-start pl-8 p-4 relative z-10">
        <div className="w-full max-w-sm">
          {/* Login Card */}
          <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300 text-sm">
                Sign in to access your dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Email */}
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-11 bg-white/80 dark:bg-white/10 border-gray-300 dark:border-gray-600/50 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 focus:bg-white dark:focus:bg-white/20 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-11 bg-white/80 dark:bg-white/10 border-gray-300 dark:border-gray-600/50 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary focus:ring-primary/20 focus:bg-white dark:focus:bg-white/20 transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Error Alert */}
                {error && (
                  <Alert variant="destructive" className="border-red-500/50 bg-red-500/10 backdrop-blur-sm">
                    <AlertDescription className="text-red-200">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-11 font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/25 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Links */}
              <div className="text-center pt-2 space-y-2">
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  Don't have an account?{' '}
                  <Link 
                    to="/signup" 
                    className="text-primary hover:text-primary/80 font-medium hover:underline transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
                <div className="border-t border-gray-300 dark:border-gray-600/50 pt-2">
                  <Link 
                    to="/admin/login" 
                    className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group"
                  >
                    <Shield className="w-3 h-3 mr-1 group-hover:text-primary transition-colors" />
                    Admin Portal
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;