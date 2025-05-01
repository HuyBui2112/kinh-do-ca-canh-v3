"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const LoginForm: React.FC = () => {
  // State cho form
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Lấy các hàm và trạng thái từ UserContext
  const { login, user, loading, error, isAuthenticated } = useUser();

  // Router để điều hướng sau khi đăng nhập
  const router = useRouter();

  // Kiểm tra nếu người dùng đã đăng nhập, chuyển hướng về trang chủ
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  // Xử lý hiển thị/ẩn mật khẩu
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Xác thực form trước khi gửi
  const validateForm = (): boolean => {
    const errors: {
      email?: string;
      password?: string;
    } = {};

    // Xác thực email
    if (!email) {
      errors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email không hợp lệ";
    }

    // Xác thực mật khẩu
    if (!password) {
      errors.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Xử lý khi submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Xác thực form
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setFormErrors({});

      // Gọi hàm login từ context
      const success = await login({ email, password });

      if (success) {
        // Lưu thông tin "remember me" nếu được chọn
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        // Chuyển hướng đến trang chủ hoặc trang trước đó
        router.push("/");
      } else {
        // Đăng nhập thất bại, hiển thị lỗi
        setFormErrors({
          general:
            error ||
            "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.",
        });
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      setFormErrors({
        general: "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Nạp email đã lưu nếu có
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-l-lg shadow-md ">
      <h1 className="text-lg font-medium text-center text-sky-950 mb-1">
        Chào mừng đến với
      </h1>
      <h2 className="text-2xl font-bold text-center text-sky-500 mb-6">
        KINH ĐÔ CÁ CẢNH
      </h2>

      {/* Hiển thị lỗi chung nếu có */}
      {formErrors.general && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {formErrors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-sky-950 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border ${
              formErrors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
            placeholder="Nhập email của bạn"
            disabled={isSubmitting}
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
          )}
        </div>

        {/* Password input */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-sky-950 mb-1"
          >
            Mật khẩu
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border ${
                formErrors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
              placeholder="Nhập mật khẩu của bạn"
              disabled={isSubmitting}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={toggleShowPassword}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formErrors.password && (
            <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
          )}
        </div>

        {/* Remember me and forgot password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
              disabled={isSubmitting}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Ghi nhớ đăng nhập
            </label>
          </div>

          <div className="text-sm">
            <Link
              href="/quen-mat-khau"
              className="font-medium text-sky-600 hover:text-sky-500"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </div>

        {/* Register link */}
        <div className="text-sm text-center mt-4">
          <span className="text-gray-600">Chưa có tài khoản? </span>
          <Link
            href="/dang-ky"
            className="font-medium text-sky-600 hover:text-sky-500"
          >
            Đăng ký ngay
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
