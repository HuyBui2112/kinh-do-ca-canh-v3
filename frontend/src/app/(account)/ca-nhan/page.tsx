"use client";

import React from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Link from "next/link";
import { User, Package, Settings } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

export default function AccountPage() {
  // Call function
  const { user } = useUser();

  // Data
  const option = [
    { key: 1, title: "Thông tin cá nhân", href: "/ca-nhan", icon: User },
    { key: 2, title: "Đơn hàng của tôi", href: "/don-hang", icon: Package },
    { key: 3, title: "Cài đặt", href: "/cai-dat", icon: Settings },
  ];
  return (
    <div className="container">
      <Breadcrumb
        customLabels={{
          "ca-nhan": "Cá nhân",
        }}
      />
      <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
        <div className="bg-white px-4 py-10 rounded-lg shadow-md">
          {option.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                href={item.href}
                key={item.key}
                className="flex items-center gap-5 px-4 py-4 border-b border-sky-950/20"
              >
                <Icon size={20} />
                <h1>{item.title}</h1>
              </Link>
            );
          })}
        </div>
        {user && (
          <div className="col-span-2 bg-white p-10 rounded-lg shadow-md">
            <div className="text-sky-600 text-2xl font-bold border-b border-sky-950/40 pb-4">
              <h1>Thông tin cá nhân</h1>
            </div>
            <div className="grid grid-cols-2 pt-4">
              <div className="text-start text-gray-600 font-medium">
                <p className="pb-3">Họ</p>
                <p className="pb-3">Tên</p>
                <p className="pb-3">Email</p>
                <p className="pb-3">Số điện thoại</p>
                <p>Địa chỉ</p>
              </div>
              <div className="text-end text-gray-600">
                <p className="pb-3">{user.fullname.lastname}</p>
                <p className="pb-3">{user.fullname.firstname}</p>
                <p className="pb-3">{user.email}</p>
                <p className="pb-3">{user.phonenumber}</p>
                <p>{user.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
