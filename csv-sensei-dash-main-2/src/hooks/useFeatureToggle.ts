import { useState, useEffect } from 'react';

interface FeatureToggle {
  _id: string;
  featureName: 'op_billing' | 'doctor_roster' | 'compliance_ai';
  isEnabled: boolean;
  displayName: string;
  description: string;
  lastModifiedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface UseFeatureToggleReturn {
  toggles: FeatureToggle[];
  isLoading: boolean;
  error: string | null;
  isFeatureEnabled: (featureName: 'op_billing' | 'doctor_roster' | 'compliance_ai') => boolean;
  getFeatureToggle: (featureName: 'op_billing' | 'doctor_roster' | 'compliance_ai') => FeatureToggle | null;
  refetch: () => Promise<void>;
}

export const useFeatureToggle = (): UseFeatureToggleReturn => {
  const [toggles, setToggles] = useState<FeatureToggle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchToggles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/feature-toggles', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setToggles(data.data.toggles);
      } else {
        throw new Error(data.message || 'Failed to fetch feature toggles');
      }
    } catch (err) {
      console.error('Error fetching feature toggles:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch feature toggles');
      // Set default enabled state if fetch fails
      setToggles([
        {
          _id: 'default-op-billing',
          featureName: 'op_billing',
          isEnabled: true,
          displayName: 'OP Billing',
          description: 'Outpatient billing management system',
          lastModifiedBy: 'system',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'default-doctor-roster',
          featureName: 'doctor_roster',
          isEnabled: true,
          displayName: 'Doctor Roster',
          description: 'Doctor roster and scheduling management',
          lastModifiedBy: 'system',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'default-compliance-ai',
          featureName: 'compliance_ai',
          isEnabled: true,
          displayName: 'Compliance AI',
          description: 'AI-powered compliance monitoring and reporting',
          lastModifiedBy: 'system',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const isFeatureEnabled = (featureName: 'op_billing' | 'doctor_roster' | 'compliance_ai'): boolean => {
    const toggle = toggles.find(t => t.featureName === featureName);
    return toggle ? toggle.isEnabled : true; // Default to enabled if not found
  };

  const getFeatureToggle = (featureName: 'op_billing' | 'doctor_roster' | 'compliance_ai'): FeatureToggle | null => {
    return toggles.find(t => t.featureName === featureName) || null;
  };

  const refetch = async () => {
    await fetchToggles();
  };

  useEffect(() => {
    fetchToggles();
  }, []);

  return {
    toggles,
    isLoading,
    error,
    isFeatureEnabled,
    getFeatureToggle,
    refetch
  };
};
