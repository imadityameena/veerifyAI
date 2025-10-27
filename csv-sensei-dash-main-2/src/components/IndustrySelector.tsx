import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeatureToggle } from '@/hooks/useFeatureToggle';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface IndustrySelectorProps {
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
  onContinue?: () => void;
}

const industries = [
  {
    id: 'opbilling',
    name: 'OP Billing',
    description: 'Outpatient billing, claims, revenue cycle',
    icon: (
      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          <text x="16" y="18" className="text-xs font-bold fill-white">$</text>
        </svg>
      </div>
    ),
    color: 'green'
  },
  {
    id: 'doctor_roster',
    name: 'Doctor Roster',
    description: 'Staff scheduling, availability, shifts, assignments',
    icon: (
      <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      </div>
    ),
    color: 'purple'
  },
  {
    id: 'compliance',
    name: 'ComplianceAI',
    description: 'AI-powered regulatory monitoring, risk assessment',
    icon: (
      <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.708 10.29 9 11.622 14.292-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
    ),
    color: 'pink'
  },
  {
    id: 'others',
    name: 'Others',
    description: 'Custom healthcare data, general analytics, integrations',
    icon: (
      <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    ),
    color: 'orange'
  }
];

export const IndustrySelector: React.FC<IndustrySelectorProps> = ({
  selectedIndustry,
  onIndustryChange,
  onContinue,
}) => {
  const { isFeatureEnabled, isLoading } = useFeatureToggle();
  const [selectedSchema, setSelectedSchema] = useState<string | null>(selectedIndustry);
  const navigate = useNavigate();

  const getFeatureName = (industryId: string): 'op_billing' | 'doctor_roster' | 'compliance_ai' | null => {
    switch (industryId) {
      case 'doctor_roster':
        return 'doctor_roster';
      case 'opbilling':
        return 'op_billing';
      case 'compliance':
        return 'compliance_ai';
      default:
        return null;
    }
  };

  const handleSchemaSelect = (schemaId: string) => {
    setSelectedSchema(schemaId);
    onIndustryChange(schemaId);
  };

  const handleBack = () => {
    navigate('/demo');
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Choose Your Industry Schema
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Select the industry template that matches your data and unlock powerful analytics
          </p>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-300">Loading available features...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto h-screen relative flex flex-col">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Choose Your Industry Schema
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select the industry template that matches your data and unlock powerful analytics
          </p>
        </div>

        {/* Schema Cards Grid */}
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {industries.map((industry) => {
            const isSelected = selectedSchema === industry.id;
            const featureName = getFeatureName(industry.id);
            const isFeatureDisabled = featureName ? !isFeatureEnabled(featureName) : false;
            
            const getButtonColor = () => {
              switch (industry.color) {
                case 'green': return 'bg-green-500 hover:bg-green-600';
                case 'purple': return 'bg-purple-500 hover:bg-purple-600';
                case 'pink': return 'bg-pink-500 hover:bg-pink-600';
                case 'orange': return 'bg-orange-500 hover:bg-orange-600';
                default: return 'bg-gray-500 hover:bg-gray-600';
              }
            };
            
            return (
              <div
                key={industry.id}
                className={`
                  relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700/50
                  transition-all duration-300 cursor-pointer group
                  ${isFeatureDisabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : isSelected
                      ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20'
                      : 'hover:shadow-xl hover:shadow-gray-500/10 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                `}
                onClick={() => !isFeatureDisabled && handleSchemaSelect(industry.id)}
              >
                {/* Icon */}
                <div className="mb-4">
                  {industry.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {industry.name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {industry.description}
                </p>
                
                {/* Select Button */}
                <button
                  className={`
                    w-full py-2 px-4 rounded-xl text-white font-medium text-sm
                    transition-all duration-300
                    ${isFeatureDisabled 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : getButtonColor()
                    }
                    ${!isFeatureDisabled && 'hover:scale-105 active:scale-95'}
                  `}
                  disabled={isFeatureDisabled}
                >
                  {isFeatureDisabled ? 'Coming Soon' : 'Select'}
                </button>
                
                {isFeatureDisabled && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100/10 text-orange-300 border border-orange-500/20">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};