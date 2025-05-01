import React from "react";
// import Image from "next/image";
import Breadcrumb from "@/components/ui/Breadcrumb";
import LoginForm from "@/components/ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="container">
      <Breadcrumb
        customLabels={{
          "dang-nhap": "Đăng nhập",
        }}
      />
      <div className="flex items-center mx-auto max-w-4xl">
        <LoginForm />
        <div className="bg-radial-[at_25%_25%] from-sky-400 to-sky-600 to-75% w-full h-[410px] flex flex-col items-center justify-center rounded-r-lg shadow-md">
          <h1 className="text-lg font-medium text-center text-white mb-1">
            Đăng nhập
          </h1>
        </div>
      </div>
    </div>
  );
}
