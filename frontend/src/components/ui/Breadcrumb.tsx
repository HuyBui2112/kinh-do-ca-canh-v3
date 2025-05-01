"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  /**
   * Map các đường dẫn với tên hiển thị tùy chỉnh
   * Ví dụ: { 'san-pham': 'Sản phẩm', 'gioi-thieu': 'Giới thiệu' }
   */
  customLabels?: Record<string, string>;
  
  /**
   * Hiển thị biểu tượng trang chủ
   * @default true
   */
  showHomeIcon?: boolean;
  
  /**
   * Tùy chỉnh đường dẫn trang chủ
   * @default "/"
   */
  homeHref?: string;
  
  /**
   * Tùy chỉnh nhãn trang chủ
   * @default "Trang chủ"
   */
  homeLabel?: string;
  
  /**
   * CSS classes để tùy chỉnh container
   */
  className?: string;
}

// Định dạng phần đường dẫn thành chuỗi đọc được
const formatSegment = (segment: string): string => {
  // Chuyển đổi các ký tự gạch ngang thành khoảng trắng
  const withSpaces = segment.replace(/-/g, " ");
  
  // Viết hoa chữ cái đầu của mỗi từ
  return withSpaces
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function Breadcrumb({
  customLabels = {},
  showHomeIcon = true,
  homeHref = "/",
  homeLabel = "Trang chủ",
  className = "",
}: BreadcrumbProps) {
  // Lấy đường dẫn hiện tại từ hook usePathname của Next.js
  const pathname = usePathname();
  
  // Tính toán các mục breadcrumb dựa trên đường dẫn
  const breadcrumbItems = useMemo(() => {
    // Bỏ qua query params nếu có
    const cleanPath = pathname.split("?")[0];
    
    // Tách đường dẫn thành mảng các phần
    const pathSegments = cleanPath.split("/").filter(Boolean);
    
    // Tạo mảng các item breadcrumb với href và label tương ứng
    const items = pathSegments.map((segment, index) => {
      // Tạo đường dẫn cho phần tử hiện tại (tích lũy từ các phần tử trước)
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
      
      // Sử dụng nhãn tùy chỉnh nếu có, nếu không thì format chuỗi đường dẫn
      const label = customLabels[segment] || formatSegment(segment);
      
      return { href, label, segment };
    });
    
    // Thêm trang chủ vào đầu danh sách
    return [
      { href: homeHref, label: homeLabel, segment: "" },
      ...items,
    ];
  }, [pathname, customLabels, homeHref, homeLabel]);
  
  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-3 text-sm ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          return (
            <li
              key={item.href}
              className="flex items-center"
            >
              {/* Link hoặc text tùy thuộc vào vị trí (nếu là mục cuối cùng thì không phải là link) */}
              {index === 0 ? (
                // Item trang chủ với icon
                <Link
                  href={item.href}
                  className="flex items-center text-sky-600 hover:text-sky-800 transition-colors"
                  aria-current={isLast ? "page" : undefined}
                >
                  {showHomeIcon && <Home className="h-4 w-4 mr-1" />}
                  <span className={isLast ? "font-medium" : ""}>{item.label}</span>
                </Link>
              ) : isLast ? (
                // Mục cuối cùng (không phải link)
                <span className="font-medium text-sky-950">{item.label}</span>
              ) : (
                // Các mục khác (là links)
                <Link
                  href={item.href}
                  className="text-sky-600 hover:text-sky-800 transition-colors"
                >
                  {item.label}
                </Link>
              )}
              
              {/* Hiển thị chevron sau mỗi phần tử (trừ phần tử cuối cùng) */}
              {!isLast && (
                <ChevronRight className="h-3.5 w-3.5 mx-1 text-gray-400" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
