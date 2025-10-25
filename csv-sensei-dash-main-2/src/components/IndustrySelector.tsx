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
    description: 'Streamline outpatient billing operations with automated payment processing, insurance claim management, and comprehensive revenue analytics.',
    benefits: ['Automated claim processing', 'Revenue optimization', 'Insurance verification', 'Payment tracking'],
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m-6 4v3m6-3v3m-6 4h6m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-purple-300 to-purple-400'
  },
  {
    id: 'doctor_roster',
    name: 'Doctor Roster',
    description: 'Optimize healthcare staffing with intelligent scheduling, shift management, and resource allocation for maximum efficiency.',
    benefits: ['Smart scheduling', 'Shift optimization', 'Resource allocation', 'Availability tracking'],
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
    gradient: 'from-purple-300 to-purple-400'
  },
  {
    id: 'compliance',
    name: 'ComplianceAI',
    description: 'Ensure regulatory compliance with AI-powered monitoring, automated risk assessment, and real-time compliance tracking.',
    benefits: ['AI risk assessment', 'Regulatory monitoring', 'Automated alerts', 'Compliance reporting'],
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.708 10.29 9 11.622 14.292-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    gradient: 'from-purple-300 to-purple-400'
  },
  {
    id: 'others',
    name: 'Custom',
    description: 'Tailored healthcare analytics solutions for specialized medical data, custom reporting, and advanced data insights.',
    benefits: ['Custom dashboards', 'Specialized analytics', 'Flexible reporting', 'Data integration'],
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    gradient: 'from-purple-300 to-purple-400'
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
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Let's validate your data! 🚀
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose your industry schema and upload your CSV file
          </p>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-slate-600">Loading available features...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto backdrop-blur-sm">
      {/* Floating Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute w-24 h-24 bg-gradient-to-r from-purple-300/20 to-purple-400/20 rounded-full animate-pulse top-[10%] left-[10%]"></div>
        <div className="absolute w-32 h-32 bg-gradient-to-r from-purple-200/20 to-purple-300/20 rounded-full animate-pulse top-[20%] right-[15%] animation-delay-2000"></div>
        <div className="absolute w-20 h-20 bg-gradient-to-r from-purple-400/20 to-purple-500/20 rounded-full animate-pulse bottom-[30%] left-[20%] animation-delay-4000"></div>
        <div className="absolute w-28 h-28 bg-gradient-to-r from-purple-300/20 to-purple-400/20 rounded-full animate-pulse bottom-[20%] right-[10%] animation-delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Industry Schema</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Select the industry template that best matches your data structure and unlock powerful analytics</p>
      </div>

      {/* Schema Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
        {industries.map((industry) => {
          const isSelected = selectedSchema === industry.id;
          const featureName = getFeatureName(industry.id);
          const isFeatureDisabled = featureName ? !isFeatureEnabled(featureName) : false;
          
          return (
            <div
              key={industry.id}
              onClick={() => !isFeatureDisabled && handleSchemaSelect(industry.id)}
              className={`
                schema-card relative overflow-hidden rounded-2xl p-6 border-0 transition-all duration-500 cursor-pointer
                backdrop-blur-xl bg-white/90 dark:bg-gray-800/90
                ${isFeatureDisabled 
                  ? 'opacity-50 cursor-not-allowed' 
                  : isSelected
                    ? 'shadow-xl shadow-purple-400/20 transform -translate-y-1 scale-102 bg-gradient-to-br from-purple-50/50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20'
                    : 'hover:shadow-xl hover:shadow-purple-300/30 hover:-translate-y-2 hover:scale-102'
                }
              `}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/20 to-transparent -translate-x-full transition-transform duration-1000 hover:translate-x-full"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center">
                    {industry.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{industry.name}</h3>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{industry.description}</p>
                
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Key Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {industry.benefits.map((benefit, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
                
                {isFeatureDisabled && (
                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
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
            className="px-8 py-3 text-white font-bold text-base rounded-xl shadow-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span className="flex items-center justify-center">
              Continue to Upload
              <ArrowRight className="w-5 h-5 ml-2" />
            </span>
          </Button>
        </div>
      )}

    </div>
  );
};