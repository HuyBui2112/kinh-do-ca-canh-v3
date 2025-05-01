"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { apis } from "@/services/apis";
import {
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
} from "@/services/types";

// Định nghĩa kiểu dữ liệu cho người dùng
interface User {
  _id: string;
  email: string;
  fullname: string;
  phonenumber: string;
  address: string;
  token?: string;
}

// Định nghĩa kiểu dữ liệu cho context
interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<boolean>;
  register: (data: RegisterRequest) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: UpdateProfileRequest) => Promise<boolean>;
  changePassword: (data: ChangePasswordRequest) => Promise<boolean>;
  refreshUserState: () => Promise<void>;
}

// Tạo context với giá trị mặc định
const UserContext = createContext<UserContextType>({
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateProfile: async () => false,
  changePassword: async () => false,
  refreshUserState: async () => {},
});

// Hook để sử dụng context
export const useUser = () => useContext(UserContext);

// Provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Sử dụng ref để theo dõi liệu refreshUserState đang được gọi
  const isRefreshing = useRef<boolean>(false);
  const lastRefreshTime = useRef<number>(0);
  // Thời gian tối thiểu giữa các lần refresh (5 giây)
  const MIN_REFRESH_INTERVAL = 5000; // 5 giây

  // Hàm làm mới trạng thái người dùng (memoized với useCallback)
  const refreshUserState = useCallback(async () => {
    // Kiểm tra nếu đang trong quá trình refresh thì không làm gì
    if (isRefreshing.current) {
      return;
    }

    // Kiểm tra thời gian từ lần refresh trước
    const now = Date.now();
    if (now - lastRefreshTime.current < MIN_REFRESH_INTERVAL) {
      return;
    }

    try {
      // Đánh dấu đang trong quá trình refresh
      isRefreshing.current = true;
      setLoading(true);
      setError(null);

      // Kiểm tra token trong localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        // Nếu không có token, đặt user thành null và isAuthenticated thành false
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        isRefreshing.current = false;
        return;
      }

      // Nếu có token, lấy thông tin người dùng từ API
      const response = await apis.getUserProfile();

      // Cập nhật thời gian refresh
      lastRefreshTime.current = Date.now();

      if (response.success) {
        // Tạo đối tượng user từ dữ liệu trả về
        const userData: User = {
          _id: response.data._id,
          email: response.data.email,
          fullname: response.data.fullname,
          phonenumber: response.data.phonenumber,
          address: response.data.address,
          token: token,
        };

        // Cập nhật state
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // Nếu không thành công, đăng xuất
        handleLogout();
      }
    } catch (error) {
      console.error("Lỗi khi làm mới trạng thái người dùng:", error);
      // Nếu có lỗi, đăng xuất
      handleLogout();
    } finally {
      setLoading(false);
      // Đánh dấu đã hoàn tất quá trình refresh
      isRefreshing.current = false;
    }
  }, []);

  // Kiểm tra xem người dùng đã đăng nhập chưa khi component mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Chỉ gọi refresh nếu có token, nếu không thì chỉ cần đặt loading = false
      refreshUserState();
    } else {
      setLoading(false);
    }
  }, [refreshUserState]);

  // Hàm đăng nhập
  const login = async (data: LoginRequest): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await apis.login(data);

      if (response.success) {
        const userData: User = {
          _id: response.data._id,
          email: response.data.email,
          fullname: response.data.fullname,
          phonenumber: response.data.phonenumber,
          address: response.data.address,
          token: response.data.token,
        };

        // Lưu token vào localStorage
        localStorage.setItem("token", response.data.token);

        // Cập nhật state
        setUser(userData);
        setIsAuthenticated(true);

        // Cập nhật thời gian refresh
        lastRefreshTime.current = Date.now();

        return true;
      } else {
        setError("Đăng nhập thất bại");
        return false;
      }
    } catch (error: unknown) {
      console.error("Lỗi khi đăng nhập:", error);
      const apiError = error as { response?: { data?: { message?: string } } };
      setError(apiError.response?.data?.message || "Đăng nhập thất bại");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Hàm đăng ký
  const register = async (data: RegisterRequest): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await apis.register(data);

      if (response.success) {
        const userData: User = {
          _id: response.data._id,
          email: response.data.email,
          fullname: response.data.fullname,
          phonenumber: response.data.phonenumber,
          address: response.data.address,
          token: response.data.token,
        };

        // Lưu token vào localStorage
        localStorage.setItem("token", response.data.token);

        // Cập nhật state
        setUser(userData);
        setIsAuthenticated(true);

        // Cập nhật thời gian refresh
        lastRefreshTime.current = Date.now();

        return true;
      } else {
        setError("Đăng ký thất bại");
        return false;
      }
    } catch (error: unknown) {
      console.error("Lỗi khi đăng ký:", error);
      const apiError = error as { response?: { data?: { message?: string } } };
      setError(apiError.response?.data?.message || "Đăng ký thất bại");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Hàm đăng xuất
  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("token");

    // Cập nhật state
    setUser(null);
    setIsAuthenticated(false);
  };

  // Hàm cập nhật thông tin cá nhân
  const updateProfile = async (
    data: UpdateProfileRequest
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await apis.updateUserProfile(data);

      if (response.success) {
        // Cập nhật thông tin người dùng trong state
        setUser((prev) => {
          if (!prev) return null;

          return {
            ...prev,
            fullname: response.data.fullname,
            phonenumber: response.data.phonenumber,
            address: response.data.address,
          };
        });

        // Cập nhật thời gian refresh
        lastRefreshTime.current = Date.now();

        return true;
      } else {
        setError("Cập nhật thông tin thất bại");
        return false;
      }
    } catch (error: unknown) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      const apiError = error as { response?: { data?: { message?: string } } };
      setError(
        apiError.response?.data?.message || "Cập nhật thông tin thất bại"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Hàm đổi mật khẩu
  const changePassword = async (
    data: ChangePasswordRequest
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await apis.changePassword(data);

      if (response.success) {
        return true;
      } else {
        setError("Đổi mật khẩu thất bại");
        return false;
      }
    } catch (error: unknown) {
      console.error("Lỗi khi đổi mật khẩu:", error);
      const apiError = error as { response?: { data?: { message?: string } } };
      setError(apiError.response?.data?.message || "Đổi mật khẩu thất bại");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout: handleLogout,
    updateProfile,
    changePassword,
    refreshUserState,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
