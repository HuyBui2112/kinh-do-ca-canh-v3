"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Phone, Mail, Search, ShoppingCart, Menu, X, User } from "lucide-react";

export interface NavigationType {
  id: number;
  title: string;
  href: string;
}

const Header = () => {
  const navigation: NavigationType[] = [
    {
      id: 1,
      title: "Sản phẩm",
      href: "/san-pham",
    },
    {
      id: 2,
      title: "Bài viết",
      href: "/bai-viet",
    },
    {
      id: 3,
      title: "Về chúng tôi",
      href: "/ve-chung-toi",
    },
    {
      id: 4,
      title: "Liên hệ",
      href: "/lien-he",
    },
  ];

  // Hooks
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  // Function to check if a navigation item is active
  const isNavActive = (navHref: string) => {
    // Special case for homepage
    if (navHref === "/" && pathname === "/") return true;

    // Check if current path exactly matches the nav href
    if (navHref !== "#" && pathname === navHref) return true;

    // Check if current path starts with the nav href (for nested routes)
    if (navHref !== "/" && navHref !== "#" && pathname.startsWith(navHref))
      return true;

    return false;
  };

  // Function to handle search form submission
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      // Encode the search keyword for URL
      const encodedKeyword = encodeURIComponent(searchKeyword.trim());
      // Navigate to search results page
      router.push(`/ket-qua-tim-kiem?q=${encodedKeyword}`);
      // Close mobile menu after search
      setMobileMenuOpen(false);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Render Navigation
  const _renderNavigationDesktop = () => (
    <>
      {/* Screen >= 1280px */}
      <div className="flex items-center justify-between text-sky-950 text-sm font-medium gap-6 xl:gap-10">
        {navigation.map((item) => {
          const isItemActive = isNavActive(item.href);
          return (
            <div
              key={item.id}
              className={`relative hover:text-sky-500 ${
                isItemActive ? "text-sky-500" : ""
              }`}
            >
              <Link
                href={item.href}
                className={`h-[52px] flex items-center ${
                  isItemActive
                    ? "text-sky-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sky-500"
                    : ""
                }`}
              >
                <p>{item.title}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );

  // Render search bar
  const _renderSearchBar = () => {
    return (
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full md:w-70 lg:w-64 xl:w-96 text-sm rounded-md overflow-hidden"
      >
        <input
          type="text"
          placeholder="Bạn muốn tìm gì..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="w-full px-4 py-2 text-md text-sky-950 border border-r-0 border-sky-600/15 rounded-l-md hover:border-sky-600 focus:border-sky-600 focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center min-w-[50px] h-[38px] border border-sky-600 rounded-r-md bg-sky-600 text-white hover:bg-white hover:text-sky-600 hover:border-sky-600 transition-colors"
          aria-label="Tìm kiếm"
        >
          <Search size={18} />
        </button>
      </form>
    );
  };

  // Render mobile navigation
  const _renderMobileNavigation = () => (
    <>
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out ${
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleMobileMenu}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile menu header with close button */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-b-blue-950/20">
            <span className="font-medium text-sky-950">Menu</span>
            <button
              onClick={toggleMobileMenu}
              className="text-sky-950 hover:text-sky-500"
              aria-label="Đóng menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search bar in mobile view (only visible at <md screens) */}
          <div className="px-4 py-3 border-b border-b-blue-950/20 md:hidden">
            {_renderSearchBar()}
          </div>

          {/* Mobile navigation */}
          <div className="overflow-y-auto flex-grow">
            <nav className="py-2">
              {navigation.map((item) => {
                const isItemActive = isNavActive(item.href);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className={`block px-4 py-3 text-sm font-medium hover:bg-sky-50 ${
                      isItemActive
                        ? "text-sky-500 border-l-4 border-sky-500"
                        : "text-sky-950"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile top bar elements */}
          <div className="border-t border-t-blue-950/20">
            <div className="p-4 space-y-3 text-sm">
              {/* Contact info */}
              <div className="flex items-center gap-2 text-sky-950">
                <Phone size={14} />
                <span>0987 654 321</span>
              </div>
              <div className="flex items-center gap-2 text-sky-950">
                <Mail size={14} />
                <span>kinhdocacanh@gmail.com</span>
              </div>

              {/* Authentication links */}
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href="/dang-nhap"
                  onClick={toggleMobileMenu}
                  className="flex-1 py-2 px-3 bg-sky-600 text-white text-center rounded-md hover:bg-sky-700"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/dang-ky"
                  onClick={toggleMobileMenu}
                  className="flex-1 py-2 px-3 border border-sky-600 text-sky-600 text-center rounded-md hover:bg-sky-50"
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Render cart button
  const _renderCartButton = () => {
    return (
      <Link
        href="/gio-hang"
        className="relative w-[40px] h-[38px] mr-4 flex items-center justify-center text-sky-950 hover:text-sky-500"
      >
        <ShoppingCart size={22} />
        <div className="absolute -top-1 left-6">
          <span className="bg-red-500 border border-white text-white text-xs font-medium rounded-full h-5 flex items-center justify-center px-1.5">
            10
          </span>
        </div>
      </Link>
    );
  };

  // Render hamburger menu button
  const _renderHamburgerButton = () => {
    return (
      <button
        onClick={toggleMobileMenu}
        className="ml-4 text-sky-950 hover:text-sky-500 focus:outline-none"
        aria-expanded={mobileMenuOpen}
        aria-label="Menu chính"
      >
        <Menu size={24} />
      </button>
    );
  };

  return (
    <header className="min-w-[320px] bg-white border-b border-sky-950/15 sticky top-0 z-40">
      {/* Top Bar - only visible on lg screens */}
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
      <div className="bg-white h-[52px] flex items-center">
        {/* Screen >= 1024px */}
        <div className="hidden container h-[52px] lg:grid lg:grid-cols-5">
          <div className="col-span-3 flex items-center gap-10 xl:gap-25">
            {/* Logo */}
            <Link href="/">
              <div className="hidden lg:block">
                <div className="relative w-[215px] h-[43px]">
                  <Image
                    src="/logos/kinhdocacanh-logo-full.png"
                    alt="Logo Kinh Đô Cá Cảnh"
                    fill
                    priority
                    sizes="215px"
                  />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {_renderNavigationDesktop()}
          </div>

          {/* Header Button */}
          <div className="col-span-2 flex items-center justify-end lg:gap-10 xl:gap-30">
            {/* Search Bar */}
            {_renderSearchBar()}

            {/* Cart Button */}
            {_renderCartButton()}
          </div>
        </div>

        {/* Screen < 1024px */}
        <div className="container h-[52px] grid grid-cols-4 lg:hidden">
          <div className="flex items-center col-span-3 justify-between">
            {/* Logo */}
            <Link href="/">
              {/* Screen >= 440px */}
              <div className="hidden min-[440px]:block lg:hidden">
                <div className="relative w-[196px] h-[44px]">
                  <Image
                    src="/logos/kinhdocacanh-logo-half-full.png"
                    alt="Logo Kinh Đô Cá Cảnh"
                    fill
                    priority
                    sizes="196px"
                  />
                </div>
              </div>

              {/* Screen < 440px */}
              <div className="block min-[440px]:hidden">
                <div className="relative w-[44px] h-[44px]">
                  <Image
                    src="/logos/kinhdocacanh-logo-small.png"
                    alt="Logo Kinh Đô Cá Cảnh"
                    fill
                    priority
                    sizes="44px"
                  />
                </div>
              </div>
            </Link>

            {/* Search bar only visible at md screens and above */}
            <div className="hidden md:flex md:items-center lg:hidden">
              {_renderSearchBar()}
            </div>
          </div>

          {/* Cart and Hamburger Menu Button */}
          <div className="flex items-center justify-end">
            {_renderCartButton()}
            {_renderHamburgerButton()}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {_renderMobileNavigation()}
    </header>
  );
};

export default Header;
