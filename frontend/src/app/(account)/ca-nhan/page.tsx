import React from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function AccountPage() {
  return (
    <div className="container">
      <Breadcrumb
        customLabels={{
          "ca-nhan": "Cá nhân",
        }}
      />
    </div>
  );
}
