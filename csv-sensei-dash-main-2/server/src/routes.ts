import { Router, Request, Response } from 'express';
import { RecordModel } from './models/Record';
import { UsageTrackingModel } from './models/UsageTracking';
import { authenticateToken } from './middleware/auth';

export const router = Router();

router.get('/health', async (_req: Request, res: Response) => {
  const ok = !!(await RecordModel.db?.readyState);
  res.json({ ok });
});

// Protected routes - require authentication
router.get('/records', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const items = await RecordModel.find({ userId }).sort({ createdAt: -1 }).lean();
    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    console.error('Get records error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch records'
    });
  }
});

router.post('/records', authenticateToken, async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const { data, schemaType, fileName, fileSize, rowCount } = req.body ?? {};
    if (!data) {
      return res.status(400).json({ 
        success: false,
        message: 'Data is required' 
      });
    }
    
    const doc = await RecordModel.create({ 
      userId: req.user!.id,
      userEmail: req.user!.email,
      data 
    });

    // Track usage if schemaType is provided
    if (schemaType && ['op_billing', 'doctor_roster', 'compliance_ai'].includes(schemaType)) {
      const processingTime = Date.now() - startTime;
      const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
      const userAgent = req.get('User-Agent') || '';

      await UsageTrackingModel.create({
        userId: req.user!.id,
        schemaType,
        fileName: fileName || 'unknown.csv',
        fileSize: fileSize || 0,
        rowCount: rowCount || data.length,
        processingTime,
        success: true,
        ipAddress,
        userAgent
      });
    }
    
    res.status(201).json({
      success: true,
      data: doc
    });
  } catch (error) {
    console.error('Create record error:', error);
    
    // Track failed usage if schemaType is provided
    if (req.body?.schemaType && ['op_billing', 'doctor_roster', 'compliance_ai'].includes(req.body.schemaType)) {
      const processingTime = Date.now() - startTime;
      const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
      const userAgent = req.get('User-Agent') || '';

      try {
        await UsageTrackingModel.create({
          userId: req.user!.id,
          schemaType: req.body.schemaType,
          fileName: req.body.fileName || 'unknown.csv',
          fileSize: req.body.fileSize || 0,
          rowCount: req.body.rowCount || 0,
          processingTime,
          success: false,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          ipAddress,
          userAgent
        });
      } catch (trackingError) {
        console.error('Failed to track usage:', trackingError);
      }
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create record'
    });
  }
});

router.delete('/records/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const record = await RecordModel.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user!.id 
    });
    
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Record not found or access denied'
      });
    }
    
    res.status(204).end();
  } catch (error) {
    console.error('Delete record error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete record'
    });
  }
});



