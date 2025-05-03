import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './configs/database';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';

// Cấu hình dotenv để đọc file .env
dotenv.config();

// Khởi tạo Express app
const app: Express = express();

// Cấu hình port
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Cho phép CORS
app.use(helmet()); // Bảo mật HTTP headers
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Kinh Do Ca Canh API' });
});
app.use('/api/users', userRoutes); // Route người dùng
app.use('/api/products', productRoutes); // Route sản phẩm

// Error handling middleware
app.use(notFoundHandler); // Xử lý route không tồn tại
app.use(errorHandler); // Xử lý tất cả các loại lỗi

// Khởi động server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Lỗi khởi động server:', error);
  }
};

startServer();
