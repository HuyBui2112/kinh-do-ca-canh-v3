import React from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import RegisterForm from "@/components/ui/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="container">
      <Breadcrumb
        customLabels={{
          "dang-ky": "Đăng ký",
        }}
      />
      <div className="flex items-center justify-center mx-auto max-w-4xl">
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-full lg:h-[730px] bg-radial-[at_25%_25%] from-sky-400 to-sky-600 to-75%  rounded-l-lg shadow-md">
          <h1 className="text-lg font-medium text-center text-white mb-1">
            Đăng ký
          </h1>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
