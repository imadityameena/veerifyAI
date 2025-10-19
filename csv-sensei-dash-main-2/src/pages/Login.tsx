import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, Mail, Building2, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ModeToggle } from '@/components/ui/mode-toggle';

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
    <div className="min-h-screen bg-[#F0F8FF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ModeToggle />
      </div>
      
      {/* Left Side - Animated Section */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Simple floating circles */}
          <div className="absolute top-20 left-20 w-16 h-16 bg-blue-400/15 dark:bg-blue-500/15 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-12 h-12 bg-purple-400/15 dark:bg-purple-500/15 rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 left-32 w-10 h-10 bg-green-400/15 dark:bg-green-500/15 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-14 h-14 bg-pink-400/15 dark:bg-pink-500/15 rounded-full animate-pulse"></div>
          
          {/* Simple geometric shapes */}
          <div className="absolute top-32 left-1/4 w-6 h-6 bg-blue-600/20 dark:bg-blue-400/20 rotate-45 animate-pulse"></div>
          <div className="absolute bottom-32 right-1/4 w-4 h-4 bg-purple-600/20 dark:bg-purple-400/20 rotate-12 animate-pulse"></div>
        </div>
        
        {/* Main Content - Centered with equal padding */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 w-full">
          <div className="mb-8 max-w-lg">
            <div className="w-28 h-28 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Building2 className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
              VeerifyAI
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-10 animate-fade-in-delay">
              Healthcare Compliance Platform
            </p>
            <div className="space-y-6 text-left">
              <div className="flex items-center space-x-4 animate-slide-in-left">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-lg text-gray-700 dark:text-gray-300">Secure data processing</span>
              </div>
              <div className="flex items-center space-x-4 animate-slide-in-left-delay">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-lg text-gray-700 dark:text-gray-300">Real-time compliance monitoring</span>
              </div>
              <div className="flex items-center space-x-4 animate-slide-in-left-delay-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-lg text-gray-700 dark:text-gray-300">Advanced analytics dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Form Section */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Sign in to access your dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-11 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Error Alert */}
                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-900/20">
                    <AlertDescription className="text-red-800 dark:text-red-200">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              {/* Signup Link */}
              <div className="text-center pt-4 space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link 
                    to="/signup" 
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
                <div className="border-t pt-4">
                  <Link 
                    to="/admin/login" 
                    className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
                  >
                    <Shield className="w-4 h-4 mr-2" />
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

// Custom CSS animations for the login page
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in-delay {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-in-left {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slide-in-left-delay {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slide-in-left-delay-2 {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
  .animate-fade-in-delay {
    animation: fade-in-delay 1s ease-out 0.3s both;
  }
  .animate-slide-in-left {
    animation: slide-in-left 0.8s ease-out 0.6s both;
  }
  .animate-slide-in-left-delay {
    animation: slide-in-left-delay 0.8s ease-out 0.9s both;
  }
  .animate-slide-in-left-delay-2 {
    animation: slide-in-left-delay-2 0.8s ease-out 1.2s both;
  }
`;
