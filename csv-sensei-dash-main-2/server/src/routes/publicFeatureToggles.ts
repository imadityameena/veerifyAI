import { Router, Request, Response } from 'express';
import { FeatureToggleModel } from '../models/FeatureToggle';

const router = Router();

/**
 * Get all feature toggles (public endpoint for frontend)
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const toggles = await FeatureToggleModel.getAllToggles();
    
    // If no toggles exist, return default enabled state
    if (toggles.length === 0) {
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

      return res.json({
        success: true,
        data: { toggles: defaultToggles }
      });
    }

    res.json({
      success: true,
      data: { toggles }
    });
  } catch (error) {
    console.error('Get public feature toggles error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feature toggles'
    });
  }
});

/**
 * Get specific feature toggle (public endpoint)
 */
router.get('/:featureName', async (req: Request, res: Response) => {
  try {
    const { featureName } = req.params;
    
    const toggle = await FeatureToggleModel.getToggle(featureName);
    
    if (!toggle) {
      // Return default enabled state if not found
      const defaultToggle = {
        _id: `default-${featureName}`,
        featureName: featureName as 'op_billing' | 'doctor_roster' | 'compliance_ai',
        isEnabled: true,
        displayName: featureName.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: `${featureName.replace('_', ' ')} feature`,
        lastModifiedBy: 'system',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      return res.json({
        success: true,
        data: { toggle: defaultToggle }
      });
    }

    res.json({
      success: true,
      data: { toggle }
    });
  } catch (error) {
    console.error('Get public feature toggle error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feature toggle'
    });
  }
});

export { router as publicFeatureToggleRoutes };
