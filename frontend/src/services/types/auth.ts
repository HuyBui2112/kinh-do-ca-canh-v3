// Types for requests of Authentication APIs
export interface RegisterRequest {
    email: string;
    password: string;
    phonenumber: string;
    address: string;
}
  
export interface LoginRequest {
    email: string;
    password: string;
}
  
export interface UpdateProfileRequest {
    fullname?: string;
    phonenumber?: string;
    address?: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

// Types for responses of Authentication APIs
export interface UserInfoResponse {
    _id: string,
    email: string,
    fullname: string,
    phonenumber: string,
    address: string,
}

export interface AuthInfoResponse {
    _id: string,
    email: string,
    fullname: string,
    phonenumber: string,
    address: string,
    token: string
}

export interface UserResponse {
    success: boolean,
    data: UserInfoResponse
}

export interface AuthResponse {
    success: boolean,
    data: AuthInfoResponse
}

