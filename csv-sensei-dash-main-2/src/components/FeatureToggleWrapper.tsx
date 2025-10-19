import React from 'react';
import { useFeatureToggle } from '@/hooks/useFeatureToggle';
import UnderConstruction from './UnderConstruction';

interface FeatureToggleWrapperProps {
  featureName: 'op_billing' | 'doctor_roster' | 'compliance_ai';
  children: React.ReactNode;
}

const FeatureToggleWrapper: React.FC<FeatureToggleWrapperProps> = ({
  featureName,
  children
}) => {
  const { isFeatureEnabled, getFeatureToggle, isLoading } = useFeatureToggle();

  // Show loading state while checking feature status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#F0F8FF'}}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // If feature is disabled, show under construction page
  if (!isFeatureEnabled(featureName)) {
    const toggle = getFeatureToggle(featureName);
    return (
      <UnderConstruction
        featureName={featureName}
        featureDisplayName={toggle?.displayName || featureName.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        featureDescription={toggle?.description || `${featureName.replace('_', ' ')} feature is currently under construction`}
      />
    );
  }

  // If feature is enabled, render the children
  return <>{children}</>;
};

export default FeatureToggleWrapper;
