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
import AnimatedText from '@/components/AnimatedText';

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
    <div className="h-screen bg-[#F0F8FF] dark:bg-gray-900 flex relative overflow-hidden">
      {/* Background Bubble Animation - Full Page Coverage */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating bubbles */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-gradient-to-br from-blue-400/20 to-blue-600/10 rounded-full animate-bounce" style={{animationDuration: '3s', animationDelay: '0s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-gradient-to-br from-purple-400/25 to-purple-600/15 rounded-full animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-gradient-to-br from-green-400/15 to-green-600/8 rounded-full animate-bounce" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
        <div className="absolute top-2/3 right-1/4 w-7 h-7 bg-gradient-to-br from-blue-300/20 to-blue-500/12 rounded-full animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 right-1/2 w-5 h-5 bg-gradient-to-br from-purple-300/25 to-purple-500/15 rounded-full animate-bounce" style={{animationDuration: '4.5s', animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/5 w-9 h-9 bg-gradient-to-br from-green-300/18 to-green-500/10 rounded-full animate-bounce" style={{animationDuration: '4.2s', animationDelay: '2.5s'}}></div>
        
        {/* Extra large floating bubbles */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-blue-600/5 rounded-full animate-pulse" style={{animationDuration: '6s', animationDelay: '0s'}}></div>
        <div className="absolute bottom-20 right-20 w-14 h-14 bg-gradient-to-br from-purple-400/12 to-purple-600/6 rounded-full animate-pulse" style={{animationDuration: '7s', animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-gradient-to-br from-green-400/8 to-green-600/4 rounded-full animate-pulse" style={{animationDuration: '5.5s', animationDelay: '2s'}}></div>
        <div className="absolute top-10 left-1/2 w-18 h-18 bg-gradient-to-br from-blue-400/8 to-blue-600/4 rounded-full animate-pulse" style={{animationDuration: '8s', animationDelay: '3s'}}></div>
        <div className="absolute bottom-10 left-1/4 w-15 h-15 bg-gradient-to-br from-purple-400/10 to-purple-600/5 rounded-full animate-pulse" style={{animationDuration: '6.5s', animationDelay: '1.5s'}}></div>
        
        {/* Medium floating bubbles */}
        <div className="absolute top-10 right-1/3 w-4 h-4 bg-gradient-to-br from-blue-400/30 to-blue-600/20 rounded-full animate-bounce" style={{animationDuration: '2.5s', animationDelay: '0.8s'}}></div>
        <div className="absolute bottom-10 left-1/3 w-3 h-3 bg-gradient-to-br from-purple-400/35 to-purple-600/25 rounded-full animate-bounce" style={{animationDuration: '2.8s', animationDelay: '1.8s'}}></div>
        <div className="absolute top-1/2 left-10 w-5 h-5 bg-gradient-to-br from-green-400/25 to-green-600/15 rounded-full animate-bounce" style={{animationDuration: '3.2s', animationDelay: '2.8s'}}></div>
        <div className="absolute top-3/4 left-1/2 w-6 h-6 bg-gradient-to-br from-blue-400/25 to-blue-600/15 rounded-full animate-bounce" style={{animationDuration: '3.8s', animationDelay: '0.2s'}}></div>
        <div className="absolute bottom-1/4 right-1/6 w-4 h-4 bg-gradient-to-br from-purple-400/30 to-purple-600/20 rounded-full animate-bounce" style={{animationDuration: '2.7s', animationDelay: '1.2s'}}></div>
        <div className="absolute top-1/6 right-1/2 w-5 h-5 bg-gradient-to-br from-green-400/28 to-green-600/18 rounded-full animate-bounce" style={{animationDuration: '3.1s', animationDelay: '2.2s'}}></div>
        
        {/* Small floating bubbles */}
        <div className="absolute top-1/6 left-1/6 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce" style={{animationDuration: '2s', animationDelay: '0.3s'}}></div>
        <div className="absolute top-3/4 right-1/6 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce" style={{animationDuration: '2.2s', animationDelay: '1.3s'}}></div>
        <div className="absolute bottom-1/6 left-2/3 w-2 h-2 bg-green-400/40 rounded-full animate-bounce" style={{animationDuration: '2.4s', animationDelay: '2.3s'}}></div>
        <div className="absolute top-1/8 left-3/4 w-2 h-2 bg-blue-400/35 rounded-full animate-bounce" style={{animationDuration: '1.8s', animationDelay: '0.7s'}}></div>
        <div className="absolute bottom-1/8 right-3/4 w-2 h-2 bg-purple-400/35 rounded-full animate-bounce" style={{animationDuration: '2.1s', animationDelay: '1.7s'}}></div>
        <div className="absolute top-5/6 left-1/8 w-2 h-2 bg-green-400/35 rounded-full animate-bounce" style={{animationDuration: '2.3s', animationDelay: '2.7s'}}></div>
        <div className="absolute top-2/3 left-4/5 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce" style={{animationDuration: '1.9s', animationDelay: '0.9s'}}></div>
        <div className="absolute bottom-2/3 right-1/8 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce" style={{animationDuration: '2.5s', animationDelay: '1.9s'}}></div>
        <div className="absolute top-1/12 right-1/12 w-2 h-2 bg-green-400/30 rounded-full animate-bounce" style={{animationDuration: '2.6s', animationDelay: '2.9s'}}></div>
        
        {/* Tiny bubbles for extra depth */}
        <div className="absolute top-1/5 left-1/5 w-1 h-1 bg-blue-400/50 rounded-full animate-bounce" style={{animationDuration: '1.5s', animationDelay: '0.1s'}}></div>
        <div className="absolute top-4/5 right-1/5 w-1 h-1 bg-purple-400/50 rounded-full animate-bounce" style={{animationDuration: '1.7s', animationDelay: '1.1s'}}></div>
        <div className="absolute bottom-1/5 left-4/5 w-1 h-1 bg-green-400/50 rounded-full animate-bounce" style={{animationDuration: '1.9s', animationDelay: '2.1s'}}></div>
        <div className="absolute top-3/5 left-2/5 w-1 h-1 bg-blue-400/45 rounded-full animate-bounce" style={{animationDuration: '1.6s', animationDelay: '0.6s'}}></div>
        <div className="absolute bottom-3/5 right-2/5 w-1 h-1 bg-purple-400/45 rounded-full animate-bounce" style={{animationDuration: '1.8s', animationDelay: '1.6s'}}></div>
        <div className="absolute top-2/5 right-3/5 w-1 h-1 bg-green-400/45 rounded-full animate-bounce" style={{animationDuration: '2.0s', animationDelay: '2.6s'}}></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ModeToggle />
      </div>
      
      {/* Left Side - Platform Information */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 bg-gray-50 dark:bg-gray-900">
        {/* Text area background animations */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating text area bubbles */}
          <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-blue-400/15 rounded-full animate-bounce" style={{animationDuration: '4s', animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/3 right-1/6 w-4 h-4 bg-purple-400/20 rounded-full animate-bounce" style={{animationDuration: '3.5s', animationDelay: '1.2s'}}></div>
          <div className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-green-400/12 rounded-full animate-bounce" style={{animationDuration: '5s', animationDelay: '0.8s'}}></div>
          <div className="absolute top-2/3 right-1/4 w-5 h-5 bg-blue-300/18 rounded-full animate-bounce" style={{animationDuration: '4.2s', animationDelay: '1.8s'}}></div>
          <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-purple-300/25 rounded-full animate-bounce" style={{animationDuration: '3.8s', animationDelay: '2.1s'}}></div>
          <div className="absolute top-1/2 left-1/8 w-7 h-7 bg-green-300/15 rounded-full animate-bounce" style={{animationDuration: '4.5s', animationDelay: '0.3s'}}></div>
          
          {/* Pulsing text area orbs */}
          <div className="absolute top-1/6 left-1/3 w-12 h-12 bg-gradient-to-br from-blue-400/8 to-blue-600/4 rounded-full animate-pulse" style={{animationDuration: '6s', animationDelay: '0s'}}></div>
          <div className="absolute bottom-1/6 right-1/3 w-10 h-10 bg-gradient-to-br from-purple-400/10 to-purple-600/5 rounded-full animate-pulse" style={{animationDuration: '7s', animationDelay: '1s'}}></div>
          <div className="absolute top-3/4 left-1/5 w-8 h-8 bg-gradient-to-br from-green-400/6 to-green-600/3 rounded-full animate-pulse" style={{animationDuration: '5.5s', animationDelay: '2s'}}></div>
          
          {/* Spinning text area elements */}
          <div className="absolute top-1/5 right-1/5 w-3 h-3 border border-blue-400/20 rotate-45 animate-spin" style={{animationDuration: '12s', animationDelay: '0s'}}></div>
          <div className="absolute bottom-1/5 left-1/5 w-2 h-2 border border-purple-400/25 rotate-12 animate-spin" style={{animationDuration: '15s', animationDelay: '1s'}}></div>
          <div className="absolute top-4/5 right-1/8 w-2 h-2 border border-green-400/20 rotate-45 animate-spin" style={{animationDuration: '18s', animationDelay: '2s'}}></div>
        </div>
        
        <div className="text-center space-y-8 max-w-md relative z-10">
          {/* Logo */}
          <div className="flex justify-center relative">
            {/* Logo background glow */}
            <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse" style={{animationDuration: '4s'}}></div>
            <Logo size="xl" showIndicator={false} />
          </div>
          
          {/* Platform Title */}
          <div className="space-y-6">
            <AnimatedText
              lines={['Welcome Back to Veerify AI']}
              delay={800}
              className="text-3xl font-bold text-gray-800 dark:text-white"
            />
            
            {/* Features List */}
            <AnimatedText
              lines={[
                'Access your data insights instantly.',
                'Continue your analytics journey.',
                'Manage your dashboards and reports.'
              ]}
              delay={600}
              showBullets={true}
              className="space-y-4 ml-8"
            />
          </div>
        </div>
      </div>
      
      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-sm">
          {/* Login Form */}
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome Back</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Sign in to access your dashboard</p>
              </div>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-white text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@veerifyai.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-12 bg-white/90 dark:bg-white/10 border-gray-300 dark:border-gray-600/50 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/50"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-white text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12 bg-white/90 dark:bg-white/10 border-gray-300 dark:border-gray-600/50 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
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
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] group"
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
            <div className="text-center space-y-4">
              <p className="text-gray-700 dark:text-white text-sm">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
                >
                  Sign up
                </Link>
              </p>
              <div className="pt-2">
                <Link 
                  to="/admin/login" 
                  className="inline-flex items-center text-gray-600 dark:text-white text-sm hover:text-blue-600 dark:hover:text-blue-300 transition-colors group"
                >
                  <Shield className="w-4 h-4 mr-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors" />
                  Admin Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;