import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, User, LayoutDashboard } from "lucide-react";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "UN";
    return name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const renderDashboardButton = () => {
    if (!user) return null;

    switch (user.role) {
      case "admin":
        return (
          <button
            onClick={() => {
              setIsDropdownOpen(false);
              navigate("/overview-management");
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LayoutDashboard className="mr-2 w-4 h-4" /> Admin Dashboard
          </button>
        );
      case "staff":
        return (
          <button
            onClick={() => {
              setIsDropdownOpen(false);
              navigate("/selectedField");
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LayoutDashboard className="mr-2 w-4 h-4" /> Staff Dashboard
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <header className="bg-[#8B4513] shadow-md fixed w-full top-0 z-50 border-b border-[#A0522D] h-20">
      <div className="flex justify-between items-center h-full px-0">
        <div className="flex items-center">
          <img
            src="/assets/image/LogoHarmony1.png"
            alt="Hair Harmony Logo"
            className="w-40 h-20"
          />
        </div>
        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-[#FDF5E6] hover:text-[#DEB887] font-medium"
          >
            Trang Chủ
          </Link>
          <Link
            to="/introduction"
            className="text-[#FDF5E6] hover:text-[#DEB887] font-medium"
          >
            Giới thiệu
          </Link>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-[#DEB887] flex items-center justify-center text-[#8B4513] font-bold">
                  {getInitials(user.fullName || user.username)}
                </div>
                <ChevronDown className="text-[#FDF5E6] w-5 h-5" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  {renderDashboardButton()}
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User className="mr-2 w-4 h-4" /> Hồ sơ
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="mr-2 w-4 h-4" /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 border border-[#DEB887] rounded-md text-[#FDF5E6] font-medium hover:bg-[#915C38] transition-colors">
                Đăng nhập
              </button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
