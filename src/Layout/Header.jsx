import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#8B4513] shadow-md fixed w-full top-0 z-50 border-b border-[#A0522D] h-20">
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center">
          <div className="flex">
            <img
              src="/assets/image/LogoHarmony1.png"
              alt="Hair Harmony Logo"
              className="w-40 h-20"
            />
          </div>
        </div>
        <nav className="flex items-center space-x-6 px-6">
          <a
            href="#"
            className="text-[#FDF5E6] hover:text-[#DEB887] font-medium transition-colors"
          >
            Trang Chủ
          </a>
          <a
            href="#"
            className="text-[#FDF5E6] hover:text-[#DEB887] font-medium transition-colors"
          >
            Giới Thiệu
          </a>
          <Link to="/login">
            <button className="ml-4 px-4 py-2 border border-[#DEB887] rounded-md text-[#FDF5E6] font-medium hover:bg-[#915C38] transition-colors">
              Đăng nhập
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
