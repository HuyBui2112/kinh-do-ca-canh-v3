import express, { RequestHandler } from 'express';
import {
  login,
  register,
  getUserProfile,
  updateUserProfile,
  changePassword
} from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Route công khai - không cần xác thực
router.post('/login', login as RequestHandler);
router.post('/register', register as RequestHandler);

// Route riêng tư - yêu cầu xác thực
router.get('/profile', protect as RequestHandler, getUserProfile as RequestHandler);
router.put('/profile', protect as RequestHandler, updateUserProfile as RequestHandler);
router.put('/change-password', protect as RequestHandler, changePassword as RequestHandler);

export default router; 