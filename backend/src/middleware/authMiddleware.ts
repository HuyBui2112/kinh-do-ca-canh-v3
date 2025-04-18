import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

/**
 * Middleware bảo vệ các route riêng tư
 * Kiểm tra token trong header và xác thực người dùng
 */
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    // Kiểm tra header authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Lấy token từ header
        token = req.headers.authorization.split(' ')[1];

        // Xác minh token
        const secretKey = process.env.JWT_SECRET || 'default_secret_key';
        const decoded = jwt.verify(token, secretKey) as { userId: string };

        // Kiểm tra người dùng có tồn tại không
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
          return res.status(401).json({
            success: false,
            message: 'Không tìm thấy người dùng với token này'
          });
        }

        // Thêm thông tin user vào request
        (req as any).user = decoded;
        next();
      } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({
          success: false,
          message: 'Token không hợp lệ hoặc đã hết hạn'
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: 'Không tìm thấy token, quyền truy cập bị từ chối'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Lỗi xác thực',
      error: error.message
    });
  }
}; 