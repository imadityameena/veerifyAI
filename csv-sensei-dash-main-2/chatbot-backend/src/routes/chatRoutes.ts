import { Router, Request, Response } from 'express';
import { ChatController } from '../controllers/chatController';
import { rateLimit } from 'express-rate-limit';

const router = Router();
const chatController = new ChatController();

// Rate limiting for chat endpoints
const chatRateLimit = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many chat requests from this IP, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all chat routes
router.use(chatRateLimit);

// Chat endpoints
router.post('/message', (req: Request, res: Response) => chatController.sendMessage(req, res));
router.get('/conversation/:conversationId', (req: Request, res: Response) => chatController.getConversation(req, res));
router.get('/conversations', (req: Request, res: Response) => chatController.getConversations(req, res));
router.delete('/conversation/:conversationId', (req: Request, res: Response) => chatController.deleteConversation(req, res));

// Health check endpoint
router.get('/health', (req: Request, res: Response) => chatController.healthCheck(req, res));

export default router;
