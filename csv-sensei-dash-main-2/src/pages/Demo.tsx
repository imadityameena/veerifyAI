
import React from 'react';
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

const Demo = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  const handleStartDemo = () => {
    navigate('/app');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{backgroundColor: '#F0F8FF'}}>
      {/* Header with User Info and Logout */}
      <div className="absolute top-4 right-4 flex items-center space-x-3 z-10">
        {isLoggedIn && user && (
          <div className="flex items-center space-x-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
            <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <div className="text-sm">
              <div className="font-semibold text-gray-800 dark:text-gray-200">{user.company}</div>
              <div className="text-gray-600 dark:text-gray-400">{user.email}</div>
            </div>
          </div>
        )}
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 flex items-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Left Content Area */}
        <div className="flex-1 p-6 pt-16">
          <div className="max-w-4xl">
            {/* AI Analytics Demo Tag */}
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                AI Analytics Demo
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Smart Compliance Intelligence

            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Upload your hospital compliance data and instantly identify rule violations, license expiries, and documentation gaps — powered by AI for safer, audit-ready operations.
            </p>

            {/* Key Features Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
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

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
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

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
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

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
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

            {/* How It Works Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                How It Works
              </h2>
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Upload Compliance File
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">AI Compliance Validation
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Get Insights</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Button
                onClick={handleStartDemo}
                size="lg"
                className="w-full px-12 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl flex items-center justify-center space-x-4"
              >
                <Play className="w-5 h-5" />
                <span> Start Compliance Demo
                </span>
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
            {/* Compliance Rule Engine Demo Section */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Compliance Rule Engine Demo
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                See analytics in action
              </p>

              {/* Demo Feature Cards */}
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 min-h-[120px]">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Compliance Scorecards
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Performance tracking with detailed metrics.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 min-h-[120px]">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Compliance Risk Trends
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    AI-powered risk pattern analysis.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 min-h-[120px]">
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
