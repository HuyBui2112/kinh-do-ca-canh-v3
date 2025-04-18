'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-800 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-4">KINH ĐÔ CÁ CẢNH</h3>
            <p className="text-neutral-300 mb-4">
              Chuyên cung cấp các loại cá cảnh, thủy sinh, phụ kiện và thức ăn cho cá với chất lượng cao và giá cả hợp lý.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary-300 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-300">123 Đường Cá Cảnh, Quận Thủy Sinh, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary-300 flex-shrink-0" />
                <span className="text-neutral-300">0123.456.789</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary-300 flex-shrink-0" />
                <span className="text-neutral-300">contact@kinhdocacanh.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock size={20} className="text-primary-300 flex-shrink-0" />
                <span className="text-neutral-300">08:00 - 20:00, Thứ 2 - Chủ nhật</span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ve-chung-toi" className="text-neutral-300 hover:text-white transition-colors">
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link href="/san-pham" className="text-neutral-300 hover:text-white transition-colors">
                  Sản Phẩm
                </Link>
              </li>
              <li>
                <Link href="/thuy-sinh" className="text-neutral-300 hover:text-white transition-colors">
                  Thủy Sinh
                </Link>
              </li>
              <li>
                <Link href="/phu-kien" className="text-neutral-300 hover:text-white transition-colors">
                  Phụ Kiện
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="text-neutral-300 hover:text-white transition-colors">
                  Tin Tức
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="text-neutral-300 hover:text-white transition-colors">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Danh Mục Sản Phẩm</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ca-canh" className="text-neutral-300 hover:text-white transition-colors">
                  Cá Cảnh
                </Link>
              </li>
              <li>
                <Link href="/ca-rong" className="text-neutral-300 hover:text-white transition-colors">
                  Cá Rồng
                </Link>
              </li>
              <li>
                <Link href="/ca-koi" className="text-neutral-300 hover:text-white transition-colors">
                  Cá Koi
                </Link>
              </li>
              <li>
                <Link href="/be-ca" className="text-neutral-300 hover:text-white transition-colors">
                  Bể Cá
                </Link>
              </li>
              <li>
                <Link href="/thuc-an" className="text-neutral-300 hover:text-white transition-colors">
                  Thức Ăn
                </Link>
              </li>
              <li>
                <Link href="/phu-kien" className="text-neutral-300 hover:text-white transition-colors">
                  Phụ Kiện
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Đăng Ký Nhận Tin</h3>
            <p className="text-neutral-300 mb-4">
              Đăng ký nhận thông tin về sản phẩm mới, khuyến mãi và các mẹo chăm sóc cá cảnh.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none text-neutral-900"
                />
                <button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-r-md transition-colors"
                >
                  Đăng Ký
                </button>
              </div>
            </form>

            {/* Social media */}
            <h3 className="text-lg font-bold mb-3">Kết Nối Với Chúng Tôi</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-700 hover:bg-primary-600 p-2 rounded-full transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-700 hover:bg-primary-600 p-2 rounded-full transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-700 hover:bg-primary-600 p-2 rounded-full transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-primary-700 text-center md:flex md:justify-between md:text-left text-sm text-neutral-400">
          <p>© {new Date().getFullYear()} Kinh Đô Cá Cảnh. Tất cả các quyền được bảo lưu.</p>
          <div className="mt-2 md:mt-0 space-x-4">
            <Link href="/chinh-sach-bao-mat" className="hover:text-white transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/dieu-khoan-su-dung" className="hover:text-white transition-colors">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
