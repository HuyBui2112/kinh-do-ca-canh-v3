import React from "react";
import LoginForm from "@/components/ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="container ">
      <div className="flex items-center mx-auto max-w-4xl">
        <LoginForm />
        <div className="bg-sky-600 w-full h-full">Hello</div>
      </div>
    </div>
  );
}
