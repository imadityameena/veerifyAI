import { Router, Request, Response } from 'express';
import { FeatureToggleModel } from '../models/FeatureToggle';
import { requireAdmin } from '../middleware/adminAuth';
import { body, validationResult } from 'express-validator';

const router = Router();

// All feature toggle routes require admin authentication
router.use(requireAdmin);

/**
 * Get all feature toggles
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const toggles = await FeatureToggleModel.getAllToggles();
    
    // If no toggles exist, create default ones
    if (toggles.length === 0) {
      const defaultToggles = [
        {
          featureName: 'op_billing',
          isEnabled: true,
          displayName: 'OP Billing',
          description: 'Outpatient billing management system',
          lastModifiedBy: req.user!.id
        },
        {
          featureName: 'doctor_roster',
          isEnabled: true,
          displayName: 'Doctor Roster',
          description: 'Doctor roster and scheduling management',
          lastModifiedBy: req.user!.id
        },
        {
          featureName: 'compliance_ai',
          isEnabled: true,
          displayName: 'Compliance AI',
          description: 'AI-powered compliance monitoring and reporting',
          lastModifiedBy: req.user!.id
        }
      ];

      await FeatureToggleModel.insertMany(defaultToggles);
      const newToggles = await FeatureToggleModel.getAllToggles();
      
      return res.json({
        success: true,
        data: { toggles: newToggles }
      });
    }

    res.json({
      success: true,
      data: { toggles }
    });
  } catch (error) {
    console.error('Get feature toggles error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feature toggles'
    });
  }
});

/**
 * Get specific feature toggle
 */
router.get('/:featureName', async (req: Request, res: Response) => {
  try {
    const { featureName } = req.params;
    
    const toggle = await FeatureToggleModel.getToggle(featureName);
    
    if (!toggle) {
      return res.status(404).json({
        success: false,
        message: 'Feature toggle not found'
      });
    }

    res.json({
      success: true,
      data: { toggle }
    });
  } catch (error) {
    console.error('Get feature toggle error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feature toggle'
    });
  }
});

/**
 * Update feature toggle status
 */
router.patch('/:featureName', [
  body('isEnabled')
    .isBoolean()
    .withMessage('isEnabled must be a boolean value')
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { featureName } = req.params;
    const { isEnabled } = req.body;

    // Validate feature name
    const validFeatures = ['op_billing', 'doctor_roster', 'compliance_ai'];
    if (!validFeatures.includes(featureName)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid feature name'
      });
    }

    const toggle = await FeatureToggleModel.updateToggle(
      featureName,
      isEnabled,
      req.user!.id
    );

    res.json({
      success: true,
      message: `Feature ${featureName} ${isEnabled ? 'enabled' : 'disabled'} successfully`,
      data: { toggle }
    });
  } catch (error) {
    console.error('Update feature toggle error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update feature toggle'
    });
  }
});

/**
 * Bulk update feature toggles
 */
router.patch('/', [
  body('toggles')
    .isArray()
    .withMessage('toggles must be an array'),
  body('toggles.*.featureName')
    .isIn(['op_billing', 'doctor_roster', 'compliance_ai'])
    .withMessage('Invalid feature name'),
  body('toggles.*.isEnabled')
    .isBoolean()
    .withMessage('isEnabled must be a boolean value')
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { toggles } = req.body;
    const updatedToggles = [];

    for (const toggle of toggles) {
      const updatedToggle = await FeatureToggleModel.updateToggle(
        toggle.featureName,
        toggle.isEnabled,
        req.user!.id
      );
      updatedToggles.push(updatedToggle);
    }

    res.json({
      success: true,
      message: 'Feature toggles updated successfully',
      data: { toggles: updatedToggles }
    });
  } catch (error) {
    console.error('Bulk update feature toggles error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update feature toggles'
    });
  }
});

export { router as featureToggleRoutes };
