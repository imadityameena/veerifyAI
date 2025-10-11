import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from './auth';

// Extend the Request interface to include user
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    company: string;
    role: string;
  };
}

/**
 * Middleware to check if user is authenticated and has admin role
 */
export const requireAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // First authenticate the token
    await new Promise<void>((resolve, reject) => {
      authenticateToken(req, res, (err: any) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Check if user has admin role
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }
};

/**
 * Middleware to check if user is authenticated (admin or regular user)
 */
export const requireAuth = authenticateToken;
