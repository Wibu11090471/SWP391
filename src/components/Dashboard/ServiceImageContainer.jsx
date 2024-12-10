import React, { useState } from "react";
import CreateService from "./ServiceImageContainer/CreateService";
import CreateImage from "./ServiceImageContainer/CreateImage";

const ServiceImageContainer = () => {
  const [activeView, setActiveView] = useState("service");
  const [serviceId, setServiceId] = useState(null);

  const handleServiceCreated = (id) => {
    setServiceId(id);
    setActiveView("image");
  };

  const handleBackToService = () => {
    setActiveView("service");
  };

  const renderView = () => {
    switch (activeView) {
      case "service":
        return (
          <CreateService
            onServiceCreated={handleServiceCreated}
            redirectToImageDisabled={true}
          />
        );
      case "image":
        return (
          <CreateImage
            initialServiceId={serviceId}
            onBackToService={handleBackToService}
          />
        );
      default:
        return null;
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
              href="/selectedField"
              className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
            >
              Lịch hẹn
            </a>
          </li>
          <li>
            <a
              href="/addserviceimage"
              className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
            >
              Thêm dịch vụ
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
              onClick={() => setActiveView("service")}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeView === "service"
                  ? "bg-[#8B4513] text-white"
                  : "bg-[#FFF0E1] text-[#5D4037] hover:bg-[#E6D2C1]"
              }`}
            >
              Tạo Dịch Vụ
            </button>

            <button
              onClick={() => setActiveView("image")}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                activeView === "image"
                  ? "bg-[#8B4513] text-white"
                  : "bg-[#FFF0E1] text-[#5D4037] hover:bg-[#E6D2C1]"
              }`}
              disabled={!serviceId}
            >
              Thêm Ảnh
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">{renderView()}</div>
      </div>
    </div>
  );
};

export default ServiceImageContainer;
