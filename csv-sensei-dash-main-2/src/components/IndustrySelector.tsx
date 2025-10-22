import React, { useState } from 'react';
import { useFeatureToggle } from '@/hooks/useFeatureToggle';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface IndustrySelectorProps {
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
  onContinue?: () => void;
}

const industries = [
  {
    id: 'opbilling',
    name: 'OP Billing',
    description: 'Outpatient billing, payments, insurance claims, revenue',
    icon: (
      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"></path>
      </svg>
    ),
    gradient: 'from-green-400 to-emerald-500'
  },
  {
    id: 'doctor_roster',
    name: 'Doctor Roster',
    description: 'Doctor schedules, availability, shifts, assignments',
    icon: (
      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM6 9.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0 2a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5z"></path>
      </svg>
    ),
    gradient: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'compliance',
    name: 'ComplianceAI',
    description: 'AI-powered compliance monitoring, risk assessment',
    icon: (
      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path>
      </svg>
    ),
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    id: 'others',
    name: 'Others',
    description: 'Custom healthcare data, general medical analytics',
    icon: (
      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"></path>
      </svg>
    ),
    gradient: 'from-orange-400 to-red-500'
  }
];

export const IndustrySelector: React.FC<IndustrySelectorProps> = ({
  selectedIndustry,
  onIndustryChange,
  onContinue,
}) => {
  const { isFeatureEnabled, isLoading } = useFeatureToggle();
  const [selectedSchema, setSelectedSchema] = useState<string | null>(selectedIndustry);

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

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Let's validate your data! 🚀
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose your industry schema and upload your CSV file
          </p>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-slate-600">Loading available features...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Floating Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute w-24 h-24 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full animate-pulse top-[10%] left-[10%]"></div>
        <div className="absolute w-32 h-32 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full animate-pulse top-[20%] right-[15%] animation-delay-2000"></div>
        <div className="absolute w-20 h-20 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full animate-pulse bottom-[30%] left-[20%] animation-delay-4000"></div>
        <div className="absolute w-28 h-28 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-full animate-pulse bottom-[20%] right-[10%] animation-delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Choose Your Industry Schema</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Select the industry template that best matches your data structure and unlock powerful analytics</p>
      </div>

      {/* Schema Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 relative z-10">
        {industries.map((industry) => {
          const isSelected = selectedSchema === industry.id;
          const featureName = getFeatureName(industry.id);
          const isFeatureDisabled = featureName ? !isFeatureEnabled(featureName) : false;
          
          return (
            <div
              key={industry.id}
              onClick={() => !isFeatureDisabled && handleSchemaSelect(industry.id)}
              className={`
                schema-card relative overflow-hidden rounded-2xl p-8 border-2 transition-all duration-500 cursor-pointer
                backdrop-blur-xl bg-white/80 dark:bg-gray-800/80
                ${isFeatureDisabled 
                  ? 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed' 
                  : isSelected
                    ? 'border-blue-500 shadow-2xl shadow-blue-500/30 transform -translate-y-2 scale-105 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20'
                    : 'border-white/20 dark:border-gray-700/50 hover:border-blue-300 hover:shadow-2xl hover:-translate-y-4 hover:scale-105'
                }
              `}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 hover:translate-x-full"></div>
              
              <div className="text-center relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-r ${industry.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  {industry.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{industry.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">{industry.description}</p>
                {isFeatureDisabled && (
                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Button */}
      {selectedSchema && (
        <div className="text-center relative z-10">
          <Button
            onClick={onContinue}
            className="px-12 py-4 text-white font-bold text-lg rounded-2xl shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-3xl"
          >
            <span className="flex items-center justify-center">
              Continue to Upload
              <ArrowRight className="w-6 h-6 ml-3" />
            </span>
          </Button>
        </div>
      )}

    </div>
  );
};