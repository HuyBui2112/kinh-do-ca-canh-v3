import mongoose, { Document, Schema, Types } from 'mongoose';

// Định nghĩa interface cho UserName
export interface UserName {
  lastname: string;
  firstname: string;
}

// Định nghĩa interface cho User document
export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  fullname: UserName;
  phonenumber: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

// Định nghĩa schema cho User
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email là bắt buộc'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email không hợp lệ']
    },
    password: {
      type: String,
      required: [true, 'Mật khẩu là bắt buộc'],
      minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự']
    },
    fullname: {
      lastname: {
        type: String,
        required: [true, 'Họ là bắt buộc'],
        trim: true
      },
      firstname: {
        type: String,
        required: [true, 'Tên là bắt buộc'],
        trim: true
      }
    },
    phonenumber: {
      type: String,
      required: [true, 'Số điện thoại là bắt buộc'],
      match: [/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ']
    },
    address: {
      type: String,
      required: [true, 'Địa chỉ là bắt buộc'],
      trim: true
    },
  },
  {
    timestamps: true // Tự động thêm createdAt và updatedAt
  }
);

// Tạo và export model User
const User = mongoose.model<IUser>('User', userSchema);
export default User;