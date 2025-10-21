import React from 'react';
import { Settings, CalendarClock, Receipt, Shield, Construction, Lock } from 'lucide-react';
import { useFeatureToggle } from '@/hooks/useFeatureToggle';
import { Badge } from '@/components/ui/badge';
interface IndustrySelectorProps {
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
}

const industries = [
  {
    id: 'doctor_roster',
    name: 'Doctor Roster',
    description: 'Doctor schedules and shifts',
    icon: CalendarClock,
    gradient: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900 dark:to-indigo-900',
    borderColor: 'border-blue-300 dark:border-indigo-700',
    hoverColor: 'hover:from-blue-600 hover:to-indigo-700'
  },
  {
    id: 'opbilling',
    name: 'OP Billing',
    description: 'Outpatient billing and payments',
    icon: Receipt,
    gradient: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-900 dark:to-teal-900',
    borderColor: 'border-emerald-300 dark:border-teal-700',
    hoverColor: 'hover:from-emerald-600 hover:to-teal-700'
  },
  {
    id: 'compliance',
    name: 'Compliance AI',
    description: 'Compliance analysis',
    icon: Shield,
    gradient: 'from-purple-500 to-pink-600',
    bgColor: 'bg-gradient-to-br from-purple-100 to-pink-200 dark:from-purple-900 dark:to-pink-900',
    borderColor: 'border-purple-300 dark:border-pink-700',
    hoverColor: 'hover:from-purple-600 hover:to-pink-700'
  },
  {
    id: 'others',
    name: 'Others',
    description: 'General data validation',
    icon: Settings,
    gradient: 'from-slate-500 to-slate-700',
    bgColor: 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900',
    borderColor: 'border-slate-300 dark:border-slate-700',
    hoverColor: 'hover:from-slate-600 hover:to-slate-800'
  }
];

export const IndustrySelector: React.FC<IndustrySelectorProps> = ({
  selectedIndustry,
  onIndustryChange,
}) => {
  const { isFeatureEnabled, isLoading } = useFeatureToggle();

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
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Data Validation & Analysis
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Select your industry domain and configure your data processing pipeline
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-gray-200">
          Industry Domain Selection
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry) => {
            const IconComponent = industry.icon;
            const isSelected = selectedIndustry === industry.id;
            const featureName = getFeatureName(industry.id);
            const isFeatureDisabled = featureName ? !isFeatureEnabled(featureName) : false;
            
            return (
              <div
                key={industry.id}
                onClick={() => !isFeatureDisabled && onIndustryChange(industry.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (!isFeatureDisabled) onIndustryChange(industry.id);
                  }
                }}
                tabIndex={isFeatureDisabled ? -1 : 0}
                role="button"
                aria-label={`${industry.name} - ${industry.description}`}
                className={`
                  group relative rounded-3xl p-8 transition-all duration-500 transform
                  ${isFeatureDisabled 
                    ? 'cursor-not-allowed opacity-50 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700' 
                    : `cursor-pointer hover:scale-105 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${industry.bgColor}`
                  }
                  ${isSelected && !isFeatureDisabled
                    ? `ring-4 ring-offset-4 ring-blue-500/70 shadow-2xl scale-105 ${industry.borderColor} bg-gradient-to-br ${industry.gradient} bg-opacity-10` 
                    : !isFeatureDisabled ? `border-2 ${industry.borderColor} hover:shadow-2xl hover:border-opacity-60` : ''
                  }
                `}
              >
                {/* Background gradient overlay */}
                {!isFeatureDisabled && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-15 transition-all duration-500 rounded-3xl`} />
                )}
                
                {/* Glow effect for selected state */}
                {isSelected && !isFeatureDisabled && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-20 blur-xl rounded-3xl`} />
                )}
                
                {/* Icon container */}
                <div className={`relative w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500 group-hover:scale-110 ${
                  isFeatureDisabled 
                    ? 'bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700' 
                    : `bg-gradient-to-br ${industry.gradient} shadow-2xl group-hover:shadow-3xl`
                }`}>
                  {isFeatureDisabled ? (
                    <Lock className="w-10 h-10 text-gray-500" />
                  ) : (
                    <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />
                  )}
                </div>
                
                {/* Content */}
                <div className="relative text-center">
                  <h4 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                    isFeatureDisabled 
                      ? 'text-gray-400' 
                      : 'text-gray-800 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-100'
                  }`}>
                    {industry.name}
                  </h4>
                  <p className={`text-sm leading-relaxed mb-4 ${
                    isFeatureDisabled 
                      ? 'text-gray-400' 
                      : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200'
                  }`}>
                    {isFeatureDisabled 
                      ? 'Under Construction' 
                      : industry.description
                    }
                  </p>
                  {isFeatureDisabled && (
                    <Badge variant="secondary" className="text-xs px-3 py-1">
                      <Construction className="w-3 h-3 mr-1" />
                      Coming Soon
                    </Badge>
                  )}
                  {!isFeatureDisabled && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to select
                    </div>
                  )}
                </div>

                {/* Selection indicator */}
                {isSelected && !isFeatureDisabled && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl animate-pulse ring-4 ring-blue-500/30">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                )}
                
                {/* Disabled indicator */}
                {isFeatureDisabled && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl">
                    <Construction className="w-4 h-4 text-white" />
                  </div>
                )}
                
                {/* Hover effect overlay */}
                {!isFeatureDisabled && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Professional instruction section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              How it works
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                </div>
                <span className="font-medium">Select your industry domain</span>
                <span className="text-xs mt-1">Choose the appropriate data schema</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-3">
                  <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                </div>
                <span className="font-medium">Upload your data files</span>
                <span className="text-xs mt-1">CSV files with your business data</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-3">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                </div>
                <span className="font-medium">Get instant insights</span>
                <span className="text-xs mt-1">AI-powered analytics and visualizations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};