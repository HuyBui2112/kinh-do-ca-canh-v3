import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

// Interface cho lỗi tùy chỉnh
export interface AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
}

// Class cho lỗi tùy chỉnh
export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware xử lý lỗi chung
export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Xử lý lỗi validation
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    res.status(400).json({
      status: 'fail',
      message: `Dữ liệu không hợp lệ: ${errors.join('. ')}`
    });
    return;
  }

  // Xử lý lỗi duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    res.status(400).json({
      status: 'fail',
      message: `Giá trị ${field} đã tồn tại`
    });
    return;
  }

  // Xử lý lỗi chung
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  // Log lỗi trong môi trường development
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Lỗi:', {
      status,
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method
    });
  }

  // Gửi response lỗi
  res.status(statusCode).json({
    status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Middleware xử lý route không tồn tại
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Không tìm thấy ${req.originalUrl}`, 404));
}; 