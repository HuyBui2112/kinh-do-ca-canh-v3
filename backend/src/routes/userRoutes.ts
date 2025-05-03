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

/**
 * @desc    Đăng nhập
 * @route   POST /api/users/login
 * @access  Public
 */
router.post('/login', login as RequestHandler);

/**
 * @desc    Đăng ký
 * @route   POST /api/users/register
 * @access  Public
 */
router.post('/register', register as RequestHandler);

/**
 * @desc    Lấy thông tin tài khoản
 * @route   GET /api/users/profile
 * @access  Private
 */
router.get('/profile', protect as RequestHandler, getUserProfile as RequestHandler);

/**
 * @desc    Cập nhật thông tin tài khoản
 * @route   PUT /api/users/profile
 * @access  Private
 */
router.put('/profile', protect as RequestHandler, updateUserProfile as RequestHandler);

/**
 * @desc    Đổi mật khẩu
 * @route   PUT /api/users/change-password
 * @access  Private
 */
router.put('/change-password', protect as RequestHandler, changePassword as RequestHandler);

export default router; 