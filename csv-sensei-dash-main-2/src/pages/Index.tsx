
import React, { useState, useEffect } from 'react';
import { StepIndicator } from '@/components/StepIndicator';
import { IndustrySelector } from '@/components/IndustrySelector';
import { FileUpload } from '@/components/FileUpload';
import { ComplianceFileUpload } from '@/components/ComplianceFileUpload';
import { DoctorRosterUpload } from '@/components/DoctorRosterUpload';
import { BillingUpload } from '@/components/BillingUpload';
import { ValidationResults } from '@/components/ValidationResults';
import { Dashboard } from '@/components/Dashboard';
import FeatureToggleWrapper from '@/components/FeatureToggleWrapper';
import { validateCSVData } from '@/utils/validationEngine';
import { validateRowLimit, truncateDataToLimit } from '@/utils/rowLimitValidator';
import type { ValidationError, ValidationSummary } from '@/utils/validationEngine';
import Papa from 'papaparse';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Logo } from '@/components/Logo';
import { useNavigate } from 'react-router-dom';

const steps = ['Select Industry', 'Upload Data', 'Validate & Process', 'View Dashboard'];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [validationResults, setValidationResults] = useState<{
    isValid: boolean;
    errors: ValidationError[];
    warnings?: ValidationError[];
    summary: ValidationSummary;
    aiSuggestions?: string[];
    insights?: string[];
    fallbackLevel?: 'industry' | 'dynamic' | 'all-purpose';
    fallbackMessage?: string;
  } | null>(null);
  const [aiMappings, setAiMappings] = useState<any>(null);
  
  // Compliance mode state
  const [complianceMode, setComplianceMode] = useState(false);
  const [opBillingData, setOpBillingData] = useState<any[]>([]);
  const [doctorRosterData, setDoctorRosterData] = useState<any[]>([]);
  
  // User dropdown state
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  // Function to track usage
  const trackUsage = async (schemaType: string, fileName: string, fileSize: number, rowCount: number) => {
    if (!user) return; // Only track for authenticated users
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      await fetch(`${apiUrl}/records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          data: [], // Empty data since we're just tracking usage
          schemaType,
          fileName,
          fileSize,
          rowCount
        })
      });
    } catch (error) {
      console.error('Failed to track usage:', error);
      // Don't show error to user, just log it
    }
  };

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
    // Check if compliance mode should be activated (only for dual file upload)
    if (industry === 'compliance') {
      setComplianceMode(true);
      setCurrentStep(1);
    } else if (industry && currentStep === 0) {
      setComplianceMode(false);
      setCurrentStep(1);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    
    Papa.parse(file, {
      complete: (results) => {
        const data = results.data as any[];
        const filteredData = data.filter(row => Object.values(row).some(val => val !== ''));
        
        // Validate row limit with strict enforcement
        const rowLimitResult = validateRowLimit(filteredData);
        if (!rowLimitResult.isValid) {
          toast({
            title: "File Too Large - Cannot Process",
            description: rowLimitResult.message,
            variant: "destructive",
          });
          // Don't process the file at all if it exceeds the limit
          return;
        }
        
        setCsvData(filteredData);
        toast({
          title: "File Uploaded Successfully",
          description: rowLimitResult.message,
          variant: "default",
        });
        
        // Store headers for AI analysis
        const headers = Object.keys(filteredData[0] || {});
        setCsvHeaders(headers);
        
        // Track usage for successful file processing
        if (selectedIndustry === 'doctor_roster' || selectedIndustry === 'opbilling') {
          // Track usage for single-file uploads
          const schemaType = selectedIndustry === 'doctor_roster' ? 'doctor_roster' : 'op_billing';
          trackUsage(schemaType, file.name, file.size, filteredData.length);
          setCurrentStep(3); // Go directly to dashboard
        } else {
          // Perform enhanced validation for other industries
          const validation = validateCSVData(filteredData, selectedIndustry);
          setValidationResults(validation);
          setCurrentStep(2);
        }
      },
      header: true,
      skipEmptyLines: true
    });
  };

  const handleContinueToAnalysis = () => {
    if (validationResults?.isValid) {
      // Track usage for successful validation
      if (uploadedFile && selectedIndustry) {
        const schemaType = selectedIndustry === 'compliance' ? 'compliance_ai' : 'other';
        trackUsage(schemaType, uploadedFile.name, uploadedFile.size, csvData.length);
      }
      setCurrentStep(3);
    }
  };

  const handleProceedWithAI = (mappings: any) => {
    setAiMappings(mappings);
    setCurrentStep(3);
  };

  const handleContinueWithErrorData = () => {
    // Continue to dashboard even with validation errors
    setCurrentStep(3);
  };

  const handleBackToUpload = () => {
    setCurrentStep(1);
    setUploadedFile(null);
    setCsvData([]);
    setCsvHeaders([]);
    setValidationResults(null);
    setAiMappings(null);
  };

  const handleBackToIndustrySelection = () => {
    setCurrentStep(0);
    setUploadedFile(null);
    setCsvData([]);
    setCsvHeaders([]);
    setValidationResults(null);
    setAiMappings(null);
  };

  const handleComplianceFilesUpload = (opBillingFile: File, doctorRosterFile: File) => {
    // Parse OP Billing file
    Papa.parse(opBillingFile, {
      complete: (results) => {
        const billingData = results.data as any[];
        const filteredBillingData = billingData.filter(row => Object.values(row).some(val => val !== ''));
        
        // Parse Doctor Roster file
        Papa.parse(doctorRosterFile, {
          complete: (rosterResults) => {
            const rosterData = rosterResults.data as any[];
            const filteredRosterData = rosterData.filter(row => Object.values(row).some(val => val !== ''));
            
            setOpBillingData(filteredBillingData);
            setDoctorRosterData(filteredRosterData);
            
            // Track usage for compliance analysis
            trackUsage('compliance_ai', `${opBillingFile.name}, ${doctorRosterFile.name}`, 
              opBillingFile.size + doctorRosterFile.size, 
              filteredBillingData.length + filteredRosterData.length);
            
            setCurrentStep(3); // Go directly to compliance dashboard
            
            toast({
              title: "Files Uploaded Successfully",
              description: `OP Billing: ${filteredBillingData.length} records, Doctor Roster: ${filteredRosterData.length} records`,
              variant: "default",
            });
          },
          header: true,
          skipEmptyLines: true
        });
      },
      header: true,
      skipEmptyLines: true
    });
  };

  const handleGoHome = () => {
    setCurrentStep(0);
    setSelectedIndustry('');
    setUploadedFile(null);
    setCsvData([]);
    setCsvHeaders([]);
    setValidationResults(null);
    setAiMappings(null);
    setComplianceMode(false);
    setOpBillingData([]);
    setDoctorRosterData([]);
  };


  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <IndustrySelector 
            selectedIndustry={selectedIndustry}
            onIndustryChange={handleIndustryChange}
          />
        );
      case 1:
        if (complianceMode) {
          return (
            <FeatureToggleWrapper featureName="compliance_ai">
              <ComplianceFileUpload 
                onFilesUpload={handleComplianceFilesUpload}
                onBack={handleBackToIndustrySelection}
              />
            </FeatureToggleWrapper>
          );
        } else if (selectedIndustry === 'doctor_roster') {
          return (
            <FeatureToggleWrapper featureName="doctor_roster">
              <DoctorRosterUpload 
                onFileUpload={handleFileUpload}
                onBack={handleBackToIndustrySelection}
              />
            </FeatureToggleWrapper>
          );
        } else if (selectedIndustry === 'opbilling') {
          return (
            <FeatureToggleWrapper featureName="op_billing">
              <BillingUpload 
                onFileUpload={handleFileUpload}
                onBack={handleBackToIndustrySelection}
              />
            </FeatureToggleWrapper>
          );
        } else {
          return (
            <FileUpload 
              onFileUpload={handleFileUpload}
              selectedIndustry={selectedIndustry}
              onBack={handleBackToIndustrySelection}
            />
          );
        }
      case 2:
        return validationResults ? (
          <ValidationResults
            isValid={validationResults.isValid}
            errors={validationResults.errors}
            warnings={validationResults.warnings}
            summary={validationResults.summary}
            aiSuggestions={validationResults.aiSuggestions}
            insights={validationResults.insights}
            csvHeaders={csvHeaders}
            selectedIndustry={selectedIndustry}
            fallbackLevel={validationResults.fallbackLevel}
            fallbackMessage={validationResults.fallbackMessage}
            onContinue={handleContinueToAnalysis}
            onProceedWithAI={handleProceedWithAI}
            onBack={handleBackToUpload}
            onGoHome={handleGoHome}
            onContinueWithErrorData={handleContinueWithErrorData}
          />
        ) : null;
      case 3:
        if (complianceMode) {
          return (
            <FeatureToggleWrapper featureName="compliance_ai">
              <Dashboard
                data={csvData}
                industry={selectedIndustry}
                aiMappings={aiMappings}
                onBack={handleBackToUpload}
                aiCaptionEnabled={true}
                complianceMode={true}
                opBillingData={opBillingData}
                doctorRosterData={doctorRosterData}
              />
            </FeatureToggleWrapper>
          );
        } else if (selectedIndustry === 'doctor_roster') {
          return (
            <FeatureToggleWrapper featureName="doctor_roster">
              <Dashboard
                data={csvData}
                industry={selectedIndustry}
                aiMappings={aiMappings}
                onBack={handleBackToUpload}
                aiCaptionEnabled={true}
              />
            </FeatureToggleWrapper>
          );
        } else if (selectedIndustry === 'opbilling') {
          return (
            <FeatureToggleWrapper featureName="op_billing">
              <Dashboard
                data={csvData}
                industry={selectedIndustry}
                aiMappings={aiMappings}
                onBack={handleBackToUpload}
                aiCaptionEnabled={true}
              />
            </FeatureToggleWrapper>
          );
        } else {
          return (
            <Dashboard
              data={csvData}
              industry={selectedIndustry}
              aiMappings={aiMappings}
              onBack={handleBackToUpload}
              aiCaptionEnabled={true}
            />
          );
        }
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F8FF] dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation Header */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Logo size="md" showIndicator={false} />
              </div>
            </div>
            
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

      {/* Progress Steps - Always Visible */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium transition-all duration-300 ${
                currentStep >= 0 ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                1
              </div>
              <span className={`ml-3 text-sm font-medium transition-colors duration-300 ${
                currentStep >= 0 ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'
              }`}>
                Select Schema
              </span>
            </div>
            <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium transition-all duration-300 ${
                currentStep >= 1 ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                2
              </div>
              <span className={`ml-3 text-sm font-medium transition-colors duration-300 ${
                currentStep >= 1 ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'
              }`}>
                Upload Data
              </span>
            </div>
            <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium transition-all duration-300 ${
                currentStep >= 2 ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                3
              </div>
              <span className={`ml-3 text-sm font-medium transition-colors duration-300 ${
                currentStep >= 2 ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'
              }`}>
                Dashboard
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mt-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default Index;
