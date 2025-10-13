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
      
      console.log('Fetching feature toggles from: /api/feature-toggles');
      
      const response = await fetch('/api/feature-toggles', {
        credentials: 'include',
      });

      console.log(`Feature toggles response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Feature toggles response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Feature toggles response data:', data);

      if (data.success) {
        // Apply localStorage overrides if any
        const localToggles = JSON.parse(localStorage.getItem('featureToggles') || '{}');
        const togglesWithOverrides = data.data.toggles.map((toggle: any) => ({
          ...toggle,
          isEnabled: localToggles[toggle.featureName] !== undefined ? localToggles[toggle.featureName] : toggle.isEnabled
        }));
        
        setToggles(togglesWithOverrides);
        console.log('Feature toggles loaded successfully:', togglesWithOverrides);
      } else {
        throw new Error(data.message || 'Failed to fetch feature toggles');
      }
    } catch (err) {
      console.error('Error fetching feature toggles:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch feature toggles');
      
      // Fallback to default toggles with localStorage overrides
      console.log('Using fallback feature toggles');
      const defaultToggles = [
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
      ];
      
      // Apply localStorage overrides
      const localToggles = JSON.parse(localStorage.getItem('featureToggles') || '{}');
      const togglesWithOverrides = defaultToggles.map((toggle: any) => ({
        ...toggle,
        isEnabled: localToggles[toggle.featureName] !== undefined ? localToggles[toggle.featureName] : toggle.isEnabled
      }));
      
      setToggles(togglesWithOverrides);
      console.log('Using fallback feature toggles with localStorage overrides:', togglesWithOverrides);
    } finally {
      setIsLoading(false);
    }
  };

  const isFeatureEnabled = (featureName: 'op_billing' | 'doctor_roster' | 'compliance_ai'): boolean => {
    const toggle = toggles.find(t => t.featureName === featureName);
    console.log(`Checking if ${featureName} is enabled:`, toggle ? toggle.isEnabled : 'not found');
    return toggle ? toggle.isEnabled : false; // Default to disabled if not found (safer approach)
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
