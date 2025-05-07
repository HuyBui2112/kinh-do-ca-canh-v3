import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { 
  ILoginInput, 
  IRegisterInput, 
  IUpdateUserInput, 
  IChangePasswordInput,
  IUserResponse,
  IAuthResponse
} from '../utils/user.interface';

// Hàm tạo token
const generateToken = (userId: string): string => {
  const secretKey = process.env.JWT_SECRET || 'default_secret_key';
  return jwt.sign({ userId }, secretKey, { expiresIn: '24h' });
};

// Format dữ liệu user trả về
const formatUserResponse = (user: any): IUserResponse => {
  return {
    _id: user._id,
    email: user.email,
    fullname: user.fullname,
    phonenumber: user.phonenumber,
    address: user.address
  };
};

/**
 * Đăng nhập người dùng
 * @route POST /api/users/login
 * @access Public
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: ILoginInput = req.body;

    // Kiểm tra nếu người dùng tồn tại
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Email hoặc mật khẩu không đúng' 
      });
    }

    // Kiểm tra mật khẩu
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email hoặc mật khẩu không đúng' 
      });
    }

    // Tạo token
    const token = generateToken(user._id.toString());

    // Trả về thông tin người dùng và token
    const userResponse: IAuthResponse = {
      ...formatUserResponse(user),
      token
    };

    res.status(200).json({
      success: true,
      data: userResponse
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Đăng nhập thất bại',
      error: error.message
    });
  }
};

/**
 * Đăng ký người dùng mới
 * @route POST /api/users/register
 * @access Public
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, fullname, phonenumber, address }: IRegisterInput = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email đã được sử dụng'
      });
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo người dùng mới
    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullname: fullname || { lastname: 'Người', firstname: 'dùng' },
      phonenumber,
      address
    });

    // Tạo token
    const token = generateToken(newUser._id.toString());

    // Trả về thông tin người dùng và token
    const userResponse: IAuthResponse = {
      ...formatUserResponse(newUser),
      token
    };

    res.status(201).json({
      success: true,
      data: userResponse
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Đăng ký thất bại',
      error: error.message
    });
  }
};

/**
 * Lấy thông tin người dùng theo id
 * @route GET /api/users/profile
 * @access Private
 */
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    // req.user được thiết lập từ middleware xác thực
    const userId = (req as any).user.userId;
    
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    const userResponse: IUserResponse = formatUserResponse(user);

    res.status(200).json({
      success: true,
      data: userResponse
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Lấy thông tin người dùng thất bại',
      error: error.message
    });
  }
};

/**
 * Cập nhật thông tin người dùng
 * @route PUT /api/users/profile
 * @access Private
 */
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { fullname, phonenumber, address }: IUpdateUserInput = req.body;

    // Kiểm tra người dùng có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    // Cập nhật chỉ những trường được cung cấp
    if (fullname !== undefined) user.fullname = fullname;
    if (phonenumber !== undefined) user.phonenumber = phonenumber;
    if (address !== undefined) user.address = address;

    const updatedUser = await user.save();

    const userResponse: IUserResponse = formatUserResponse(updatedUser);

    res.status(200).json({
      success: true,
      data: userResponse
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Cập nhật thông tin người dùng thất bại',
      error: error.message
    });
  }
};

/**
 * Đổi mật khẩu người dùng
 * @route PUT /api/users/change-password
 * @access Private
 */
export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { currentPassword, newPassword }: IChangePasswordInput = req.body;

    // Kiểm tra nếu mật khẩu hiện tại và mới giống nhau
    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu mới không được trùng với mật khẩu hiện tại'
      });
    }

    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    // Kiểm tra mật khẩu hiện tại
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu hiện tại không đúng'
      });
    }

    // Mã hóa mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Cập nhật mật khẩu
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Đổi mật khẩu thành công'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Đổi mật khẩu thất bại',
      error: error.message
    });
  }
}; 