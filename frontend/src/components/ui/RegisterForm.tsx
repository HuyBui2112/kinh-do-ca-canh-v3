"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, User, Phone, MapPin } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const RegisterForm: React.FC = () => {
  // State cho form
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    fullname?: string;
    phonenumber?: string;
    address?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Lấy các hàm và trạng thái từ UserContext
  const { register, user, error, isAuthenticated } = useUser();

  // Router để điều hướng sau khi đăng ký
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

  // Xử lý hiển thị/ẩn xác nhận mật khẩu
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // Xác thực form trước khi gửi
  const validateForm = (): boolean => {
    const errors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
      fullname?: string;
      phonenumber?: string;
      address?: string;
    } = {};

    // Xác thực email
    if (!email) {
      errors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email không hợp lệ";
    }

    // Xác thực fullname
    if (!fullname) {
      errors.fullname = "Vui lòng nhập họ tên";
    }

    // Xác thực số điện thoại
    if (!phonenumber) {
      errors.phonenumber = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(phonenumber)) {
      errors.phonenumber = "Số điện thoại không hợp lệ (10-11 số)";
    }

    // Xác thực địa chỉ
    if (!address) {
      errors.address = "Vui lòng nhập địa chỉ";
    }

    // Xác thực mật khẩu
    if (!password) {
      errors.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    // Xác thực xác nhận mật khẩu
    if (!confirmPassword) {
      errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Xác nhận mật khẩu không khớp";
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

      // Gọi hàm register từ context
      const success = await register({
        email,
        password,
        phonenumber,
        address,
        fullname,
      });

      if (success) {
        // Chuyển hướng đến trang chủ
        router.push("/");
      } else {
        // Đăng ký thất bại, hiển thị lỗi
        setFormErrors({
          general: error || "Đăng ký thất bại. Vui lòng thử lại sau.",
        });
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      setFormErrors({
        general: "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-r-lg shadow-md">
      <h1 className="text-lg font-medium text-center text-sky-950 mb-1">
        Đăng ký tài khoản
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
            Email <span className="text-red-500">*</span>
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

        {/* Fullname input */}
        <div>
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-sky-950 mb-1"
          >
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 border ${
                formErrors.fullname ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
              placeholder="Nhập họ và tên của bạn"
              disabled={isSubmitting}
            />
            <User
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          {formErrors.fullname && (
            <p className="mt-1 text-sm text-red-500">{formErrors.fullname}</p>
          )}
        </div>

        {/* Phone number input */}
        <div>
          <label
            htmlFor="phonenumber"
            className="block text-sm font-medium text-sky-950 mb-1"
          >
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              id="phonenumber"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 border ${
                formErrors.phonenumber ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
              placeholder="Nhập số điện thoại của bạn"
              disabled={isSubmitting}
            />
            <Phone
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          {formErrors.phonenumber && (
            <p className="mt-1 text-sm text-red-500">
              {formErrors.phonenumber}
            </p>
          )}
        </div>

        {/* Address input */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-sky-950 mb-1"
          >
            Địa chỉ <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 border ${
                formErrors.address ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
              placeholder="Nhập địa chỉ của bạn"
              disabled={isSubmitting}
            />
            <MapPin
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          {formErrors.address && (
            <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>
          )}
        </div>

        {/* Password input */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-sky-950 mb-1"
          >
            Mật khẩu <span className="text-red-500">*</span>
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
          <p className="mt-1 text-xs text-gray-500">
            Mật khẩu phải có ít nhất 6 ký tự
          </p>
        </div>

        {/* Confirm Password input */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-sky-950 mb-1"
          >
            Xác nhận mật khẩu <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-2 border ${
                formErrors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500`}
              placeholder="Xác nhận mật khẩu của bạn"
              disabled={isSubmitting}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={toggleShowConfirmPassword}
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {formErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang đăng ký..." : "Đăng ký tài khoản"}
          </button>
        </div>

        {/* Login link */}
        <div className="text-sm text-center mt-4">
          <span className="text-gray-600">Đã có tài khoản? </span>
          <Link
            href="/dang-nhap"
            className="font-medium text-sky-600 hover:text-sky-500"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
