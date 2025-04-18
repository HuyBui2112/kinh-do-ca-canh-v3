"use client";

import Link from "next/link";
// import Image from 'next/image';
import { useState } from "react";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary-600 text-white sticky top-0 z-50 shadow-md">
      {/* Top bar - desktop */}
      <div className="hidden md:block bg-primary-700 py-1">
        <div className="container mx-auto px-4 flex justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span>Hotline: 0123.456.789</span>
            <span>|</span>
            <span>Email: contact@kinhdocacanh.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/dang-nhap"
              className="hover:text-primary-200 transition-colors"
            >
              Đăng nhập
            </Link>
            <span>|</span>
            <Link
              href="/dang-ky"
              className="hover:text-primary-200 transition-colors"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {/* Placeholder for logo - replace with your actual logo */}
              <div className="h-10 w-36 bg-primary-400 flex items-center justify-center rounded-md">
                <span className="font-bold text-lg">KINH ĐÔ CÁ CẢNH</span>
              </div>
            </Link>
          </div>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full py-2 pl-4 pr-10 rounded-full text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <button className="absolute right-0 top-0 h-full px-3 text-neutral-500 hover:text-primary-600">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Navigation - desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/san-pham"
              className="hover:text-primary-200 transition-colors font-medium"
            >
              Sản phẩm
            </Link>
            <Link
              href="/thuy-sinh"
              className="hover:text-primary-200 transition-colors font-medium"
            >
              Thủy sinh
            </Link>
            <Link
              href="/phu-kien"
              className="hover:text-primary-200 transition-colors font-medium"
            >
              Phụ kiện
            </Link>
            <Link
              href="/tin-tuc"
              className="hover:text-primary-200 transition-colors font-medium"
            >
              Tin tức
            </Link>
          </nav>

          {/* User & Cart */}
          <div className="flex items-center space-x-4">
            <Link
              href="/account"
              className="hidden md:flex items-center hover:text-primary-200 transition-colors"
            >
              <User size={22} />
            </Link>
            <Link
              href="/cart"
              className="flex items-center hover:text-primary-200 transition-colors"
            >
              <div className="relative">
                <ShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-warning-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Search bar - mobile */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full py-2 pl-4 pr-10 rounded-full text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <button className="absolute right-0 top-0 h-full px-3 text-neutral-500 hover:text-primary-600">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-primary-700 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <Link
            href="/san-pham"
            className="hover:text-primary-200 transition-colors font-medium py-2 border-b border-primary-600"
          >
            Sản phẩm
          </Link>
          <Link
            href="/thuy-sinh"
            className="hover:text-primary-200 transition-colors font-medium py-2 border-b border-primary-600"
          >
            Thủy sinh
          </Link>
          <Link
            href="/phu-kien"
            className="hover:text-primary-200 transition-colors font-medium py-2 border-b border-primary-600"
          >
            Phụ kiện
          </Link>
          <Link
            href="/tin-tuc"
            className="hover:text-primary-200 transition-colors font-medium py-2 border-b border-primary-600"
          >
            Tin tức
          </Link>
          <div className="flex justify-between py-2">
            <Link
              href="/dang-nhap"
              className="hover:text-primary-200 transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              href="/dang-ky"
              className="hover:text-primary-200 transition-colors"
            >
              Đăng ký
            </Link>
          </div>
        </nav>
      </div>

      {/* Categories nav bar */}
      <div className="hidden md:block bg-primary-500">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8 py-2 text-sm">
            <Link
              href="/ca-canh"
              className="hover:text-primary-200 transition-colors"
            >
              Cá Cảnh
            </Link>
            <Link
              href="/ca-rong"
              className="hover:text-primary-200 transition-colors"
            >
              Cá Rồng
            </Link>
            <Link
              href="/ca-koi"
              className="hover:text-primary-200 transition-colors"
            >
              Cá Koi
            </Link>
            <Link
              href="/ca-dia-phung"
              className="hover:text-primary-200 transition-colors"
            >
              Cá Dĩa Phụng
            </Link>
            <Link
              href="/be-ca"
              className="hover:text-primary-200 transition-colors"
            >
              Bể Cá
            </Link>
            <Link
              href="/thuc-an"
              className="hover:text-primary-200 transition-colors"
            >
              Thức Ăn
            </Link>
            <Link
              href="/thuoc-cho-ca"
              className="hover:text-primary-200 transition-colors"
            >
              Thuốc Cho Cá
            </Link>
            <Link
              href="/may-bom-oxy"
              className="hover:text-primary-200 transition-colors"
            >
              Máy Bơm & Oxy
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
