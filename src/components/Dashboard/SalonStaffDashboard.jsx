import React, { useState } from "react";
import DashboardSalonStaff from "./AppointmentManagement/DashboardSalonStaff";
import PickingStylist from "./AppointmentManagement/PickingStylist";
import PaymentCounter from "./AppointmentManagement/PaymentCounter";

const SalonStaffDashboard = () => {
  const [activeView, setActiveView] = useState("booking");

  const renderView = () => {
    switch (activeView) {
      case "booking":
        return <DashboardSalonStaff />;
      case "stylist":
        return <PickingStylist />;
      case "payment":
        return <PaymentCounter />;
      default:
        return <DashboardSalonStaff />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FDF5E6] pt-20">
      {/* Sidebar */}
      <div className="sidebar w-1/4 bg-gray-800 text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8 pl-3 text-yellow-400">
          Dashboard
        </h2>
        <ul>
          <li>
            <a
              href="/hairsalon-staff"
              className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
            >
              Lịch hẹn
            </a>
          </li>
          <li>
            <a
              href="/notifications"
              className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
            >
              Thông báo
            </a>
          </li>
          <li>
            <a
              href="/statistics"
              className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
            >
              Thống kê
            </a>
          </li>
        </ul>
      </div>

      {/* Main Container */}
      <div className="main-container flex-1">
        {/* Top Navbar */}
        <div className="sticky top-0 z-10 bg-white shadow-md">
          <div className="container mx-auto flex justify-center space-x-4 py-4">
            <button
              onClick={() => setActiveView("booking")}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeView === "booking"
                  ? "bg-[#8B4513] text-white"
                  : "bg-[#FFF0E1] text-[#5D4037] hover:bg-[#E6D2C1]"
              }`}
            >
              Duyệt Đơn
            </button>

            <button
              onClick={() => setActiveView("stylist")}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeView === "stylist"
                  ? "bg-[#8B4513] text-white"
                  : "bg-[#FFF0E1] text-[#5D4037] hover:bg-[#E6D2C1]"
              }`}
            >
              Chọn Stylist
            </button>

            <button
              onClick={() => setActiveView("payment")}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeView === "payment"
                  ? "bg-[#8B4513] text-white"
                  : "bg-[#FFF0E1] text-[#5D4037] hover:bg-[#E6D2C1]"
              }`}
            >
              Thanh Toán
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">{renderView()}</div>
      </div>
    </div>
  );
};

export default SalonStaffDashboard;
