"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Phone, Mail, Search, ShoppingCart, Menu, X, User } from "lucide-react";

const Header = () => {
  const navigation = [
    {
      id: 1,
      title: "Danh mục sản phẩm",
      href: "#",
      sub: [
        { name: "Cá cảnh", slug: "ca-canh" },
        { name: "Thức ăn cho cá", slug: "thuc-an" },
        { name: "Cá cảnh", slug: "thuoc" },
        { name: "Cá cảnh", slug: "be-ca" },
        { name: "Cá cảnh", slug: "thuc-vat-thuy-sinh" },
        { name: "Cá cảnh", slug: "thiet-bi" },
        { name: "Cá cảnh", slug: "phu-kien" },
        { name: "Cá cảnh", slug: "phan-cot-nen" },
      ],
    },
  ];
  return (
    <header className="min-w-[320px] bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="hidden lg:block bg-sky-600 text-sm text-sky-100 py-1">
        <div className="container flex items-center justify-between">
          {/* Contact Info */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>0987 654 321</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>kinhdocacanh@gmail.com</span>
            </div>
          </div>

          {/* Login/Register Button */}
          <div className="flex items-center gap-2">
            {/* Login Button */}
            <Link
              href="/dang-nhap"
              className="px-2 rounded-md hover:bg-sky-400"
            >
              Đăng nhập
            </Link>

            <span>|</span>

            {/* Register Button */}
            <Link href="/dang-ky" className="px-2 rounded-md hover:bg-sky-400">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-sky-50 h-[52] flex items-center">
        <div className="container grid grid-cols-2 lg:grid-cols-5">
          <div className="col-span-3 flex items-center gap-10">
            {/* Logo */}
            <Link href="/">
              {/* Screen >= 1240px */}
              <div className="hidden lg:block">
                <div className="relative w-[215] h-[43]">
                  <Image
                    src="/logos/kinhdocacanh-logo-full.png"
                    alt="Logo Kinh Đô Cá Cảnh"
                    fill
                    priority
                    objectFit="contain"
                  />
                </div>
              </div>

              {/* Screen < 1024px */}
              <div className="block lg:hidden">
                <div className="relative w-[43] h-[43]">
                  <Image
                    src="/logos/kinhdocacanh-logo-small.png"
                    alt="Logo Kinh Đô Cá Cảnh"
                    fill
                    priority
                    objectFit="contain"
                  />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center justify-between text">
              <p>Danh mục sản phẩm</p>
              <p>2</p>
              <p>3</p>
            </div>
          </div>

          {/* Header Button */}
          <div className="flex items-center">
            {/* Search Button */}

            {/* Cart Button */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
