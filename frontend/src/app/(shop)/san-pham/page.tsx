import React from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function ProductsPage() {
  return (
    <div className="container">
      <Breadcrumb
        customLabels={{
          "san-pham": "Sản phẩm",
        }}
      />
    </div>
  );
}
