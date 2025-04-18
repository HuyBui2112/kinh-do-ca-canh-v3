import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Interface cho cấu hình database
interface DatabaseConfig {
  uri: string;
  options: mongoose.ConnectOptions;
}

// Cấu hình database
const databaseConfig: DatabaseConfig = {
  uri: process.env.MONGODB_URI || '',
  options: {
    // Các tùy chọn kết nối MongoDB
    autoIndex: true, // Tự động tạo index
    maxPoolSize: 10, // Số lượng kết nối tối đa
    serverSelectionTimeoutMS: 5000, // Thời gian chờ kết nối
    socketTimeoutMS: 45000, // Thời gian chờ socket
    family: 4 // Sử dụng IPv4
  }
};

// Hàm kết nối database
export const connectDB = async (): Promise<void> => {
  try {
    if (!databaseConfig.uri) {
      throw new Error('❌ MongoDB URI không được định nghĩa trong biến môi trường');
    }

    await mongoose.connect(databaseConfig.uri, databaseConfig.options);
    console.log('🎉 Kết nối MongoDB thành công');

    // Xử lý sự kiện khi kết nối bị ngắt
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB đã ngắt kết nối');
    });

    // Xử lý sự kiện khi kết nối bị lỗi
    mongoose.connection.on('error', (err) => {
      console.error('❌ Lỗi kết nối MongoDB:', err);
    });

    // Xử lý sự kiện khi kết nối lại
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 Đã kết nối lại MongoDB');
    });

  } catch (error) {
    console.error('❌ Lỗi kết nối MongoDB:', error);
    process.exit(1);
  }
};

// Hàm ngắt kết nối database
export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('👋 Đã ngắt kết nối MongoDB');
  } catch (error) {
    console.error('❌ Lỗi khi ngắt kết nối MongoDB:', error);
    process.exit(1);
  }
}; 