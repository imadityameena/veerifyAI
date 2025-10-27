
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  LogOut, 
  User, 
  Brain, 
  Zap, 
  Shield, 
  Upload, 
  ArrowRight, 
  Check,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/Logo';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useToast } from '@/hooks/use-toast';

const Demo = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const { toast } = useToast();
  
  // User dropdown state
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserDropdown) {
        const target = event.target as Element;
        if (!target.closest('.user-dropdown')) {
          setShowUserDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setShowUserDropdown(false);
      navigate('/login');
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStartDemo = () => {
    navigate('/app');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="h-screen bg-[#F0F8FF] dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-200/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo size="md" showIndicator={false} />
            
            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button 
                onClick={() => {
                  const html = document.documentElement;
                  const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
                  html.classList.toggle('dark');
                  localStorage.setItem('theme', newTheme);
                }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
                </svg>
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              </button>
              
              {/* User Profile */}
              <div className="relative user-dropdown">
                <button 
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user ? (user.firstName?.charAt(0) || user.email?.charAt(0) || 'U').toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                      {user ? `${user.firstName} ${user.lastName}`.trim() || user.email : 'Guest User'}
                    </span>
                    {user && (
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        {user.company || user.email}
                      </span>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user ? `${user.firstName} ${user.lastName}`.trim() || user.email : 'Guest User'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user?.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Sign Out</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex h-screen pt-20">
        {/* Left Content Area */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl">

            {/* Main Title */}
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Smart Compliance Intelligence
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Upload your hospital compliance data and instantly identify rule violations, license expiries, and documentation gaps — powered by AI for safer, audit-ready operations.
            </p>

            {/* Key Features Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
               <div className="bg-[#F0F8FF] dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                 <div className="flex items-center space-x-4 mb-3">
                   <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                     <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    AI Analysis
                  </h3>
                </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                  AI-powered data analysis
                </p>
              </div>

               <div className="bg-[#F0F8FF] dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                 <div className="flex items-center space-x-4 mb-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Compliance Insights Dashboard
                  </h3>
                </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Interactive compliance dashboard
                </p>
              </div>

               <div className="bg-[#F0F8FF] dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                 <div className="flex items-center space-x-4 mb-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Fast Processing
                  </h3>
                </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Lightning-fast data processing
                </p>
              </div>

               <div className="bg-[#F0F8FF] dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                 <div className="flex items-center space-x-4 mb-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Secure
                  </h3>
                </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Enterprise-grade security
                </p>
              </div>
            </div>

            {/* How It Works Section - Simplified */}
            <div className="mb-4">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Upload className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Upload</span>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <Brain className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Analyze</span>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Insights</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Button
                onClick={handleStartDemo}
                size="lg"
                className="w-full px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-pink-600 hover:from-primary/90 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl flex items-center justify-center space-x-4"
              >
                <Play className="w-5 h-5" />
                <span>Start Compliance Demo</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Welcome back!
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-white dark:bg-gray-900 p-6 pt-24">
          <div className="space-y-6">
            {/* Compliance Rule Engine Demo Section */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Compliance Rule Engine Demo
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                See analytics in action
              </p>

              {/* Demo Feature Cards */}
              <div className="space-y-4">
                <div className="bg-[#F0F8FF] dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 min-h-[120px]">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Compliance Scorecards</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Performance tracking with detailed metrics.
                  </p>
                </div>

                <div className="bg-[#F0F8FF] dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 min-h-[120px]">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Compliance Risk Trends</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    AI-powered risk pattern analysis.
                  </p>
                </div>

                <div className="bg-[#F0F8FF] dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 min-h-[120px]">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <PieChart className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Regulatory & Safety Insights</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Regulatory insights and safety protocols.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="pt-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-sm whitespace-nowrap">Free Trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-sm whitespace-nowrap">No Setup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-sm whitespace-nowrap">Instant Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
