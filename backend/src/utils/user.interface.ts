import { Types } from 'mongoose';

// Interfaces cho đầu vào
export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput {
  email: string;
  password: string;
  fullname?: string;
  phonenumber: string;
  address: string;
}

export interface IUpdateUserInput {
  fullname?: string;
  phonenumber?: string;
  address?: string;
}

export interface IChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

// Interfaces cho đầu ra
export interface IUserResponse {
  _id: Types.ObjectId | string;
  email: string;
  fullname: string;
  phonenumber: string;
  address: string;
}

export interface IAuthResponse extends IUserResponse {
  token: string;
} 