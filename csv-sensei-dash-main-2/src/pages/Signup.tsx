import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, Mail, User, UserCheck, ArrowRight, Sparkles, CheckCircle, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Logo } from '@/components/Logo';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: ''
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

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.password || !formData.confirmPassword || !formData.company) {
      setError('Please fill in all fields');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.company.length < 2) {
      setError('Company name must be at least 2 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          company: formData.company
        })
      });

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error' }));
        setError(errorData.message || `Server error: ${response.status}`);
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (data.success) {
        // Use auth context to login
        login(data.data.user);
        
        // Navigate to demo page
        navigate('/demo');
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F8FF] dark:bg-gray-900 flex relative overflow-hidden">
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
      <div className="absolute top-6 right-6 z-20">
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
          <div className="space-y-6 relative">
            {/* Title background animation */}
            <div className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-2xl blur-sm animate-pulse" style={{animationDuration: '8s'}}></div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white relative z-10">
              Join Veerify AI Today
            </h1>
            
            {/* Features List */}
            <ul className="space-y-4 ml-8 relative">
              {/* Feature list background */}
              <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-green-400/3 to-blue-400/3 rounded-xl blur-sm animate-pulse" style={{animationDuration: '6s', animationDelay: '1s'}}></div>
              <li className="flex items-center space-x-3 relative z-10">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDuration: '2s'}}></div>
                <span className="text-gray-600 dark:text-white">Transform your data into insights.</span>
              </li>
              <li className="flex items-center space-x-3 relative z-10">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDuration: '2s', animationDelay: '0.5s'}}></div>
                <span className="text-gray-600 dark:text-white">Create powerful analytics dashboards.</span>
              </li>
              <li className="flex items-center space-x-3 relative z-10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDuration: '2s', animationDelay: '1s'}}></div>
                <span className="text-gray-600 dark:text-white">Get started with AI-powered analysis.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Signup Form */}
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create Account</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Sign up to get started with your dashboard</p>
              </div>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700 dark:text-white text-sm font-medium">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="pl-10 h-12 bg-white/90 dark:bg-white/10 border-gray-300 dark:border-gray-600/50 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700 dark:text-white text-sm font-medium">
                    Last Name
                  </Label>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="pl-10 h-12 bg-white/90 dark:bg-white/10 border-gray-300 dark:border-gray-600/50 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/50"
                      required
                    />
                  </div>
                </div>
              </div>

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
                    placeholder="john.doe@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-12 bg-white/90 dark:bg-white/10 border-gray-300 dark:border-gray-600/50 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/50"
                    required
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-700 dark:text-white text-sm font-medium">
                  Company Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Your Company Inc."
                    value={formData.company}
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
                    placeholder="Create a strong password"
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-white text-sm font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 h-12 bg-white/90 dark:bg-white/10 border-gray-300 dark:border-gray-600/50 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/50"
                    required
                  />
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
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-700 dark:text-white text-sm">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;