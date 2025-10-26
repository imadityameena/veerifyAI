import React from 'react';

interface ConsistentStepIndicatorProps {
  currentStep: number;
}

export const ConsistentStepIndicator: React.FC<ConsistentStepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Select Schema' },
    { number: 2, label: 'Upload Data' },
    { number: 3, label: 'Dashboard' }
  ];

  // Map currentStep to the correct index (0, 1, 2 for steps, 3 becomes 2 for dashboard)
  const stepIndex = currentStep === 3 ? 2 : currentStep;

  return (
    <div className="flex items-center justify-center space-x-8 py-6">
      {steps.map((step, index) => {
        const isActive = index === stepIndex;
        const isCompleted = index < stepIndex;
        
        return (
          <React.Fragment key={step.number}>
            <div className="flex items-center">
              <span className={`font-medium text-sm pb-1 transition-all duration-500 ease-in-out ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 transform scale-105' 
                  : isCompleted
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="relative w-16 h-1 bg-gray-300 dark:bg-gray-700 rounded overflow-hidden">
                {/* Progress bar that fills based on completion */}
                <div 
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded transition-all duration-700 ease-in-out ${
                    isCompleted ? 'w-full delay-200' : 'w-0'
                  }`}
                />
                {/* Animated pulse effect for active step */}
                {isActive && (
                  <div className="absolute top-0 left-0 h-full w-full bg-blue-400 rounded animate-pulse opacity-30" />
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
