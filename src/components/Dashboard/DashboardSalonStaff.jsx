import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const DashboardSalonStaff = () => {
  const [stylists, setStylists] = useState([
    { id: 1, name: "Minh Tuấn", specialty: "Chuyên gia tạo kiểu Hàn Quốc", experience: "8 năm", bookings: [] },
    { id: 2, name: "Lan Phương", specialty: "Chuyên gia nhuộm và uốn", experience: "6 năm", bookings: [] },
    { id: 3, name: "Việt Anh", specialty: "Chuyên gia cắt tóc nam", experience: "10 năm", bookings: [] },
    { id: 4, name: "Hương Giang", specialty: "Chuyên gia tạo mẫu tóc cô dâu", experience: "7 năm", bookings: [] },
    { id: 5, name: "Quang Minh", specialty: "Chuyên gia tóc nam đương đại", experience: "5 năm", bookings: [] },
    { id: 6, name: "Mai Ly", specialty: "Chuyên gia uốn và duỗi", experience: "9 năm", bookings: [] },
    { id: 7, name: "Đức Trọng", specialty: "Chuyên gia tạo kiểu nghệ thuật", experience: "12 năm", bookings: [] },
    { id: 8, name: "Thảo Linh", specialty: "Chuyên gia nhuộm màu hiện đại", experience: "6 năm", bookings: [] },
    { id: 9, name: "Minh Khang", specialty: "Chuyên gia tóc nam phong cách", experience: "7 năm", bookings: [] },
    { id: 10, name: "Phương Anh", specialty: "Chuyên gia tạo kiểu Âu Mỹ", experience: "8 năm", bookings: [] },
  ]);

  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Hàm để chuyển hướng đến trang chi tiết của stylist
  const handleBooking = (stylistId) => {
    navigate(`/stylist/${stylistId}`); // Điều hướng đến StylistDetail với ID stylist
  };

  return (
    <div className="dashboard-container flex" style={{ paddingTop: "80px" }}>
      {/* Sidebar */}
      <div className="sidebar w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Stylish Management</h2>
        <ul>
          <li>
            <Link to="/dashboard" className="block py-2 text-lg hover:bg-gray-700 px-2 rounded">
              Lịch hẹn
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="block py-2 text-lg hover:bg-gray-700 px-2 rounded">
              Thông báo
            </Link>
          </li>
          <li>
            <Link to="/statistics" className="block py-2 text-lg hover:bg-gray-700 px-2 rounded">
              Thống kê
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="main-content flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">Quản lý Stylish</h2>

        {/* Display all stylists */}
        <div className="grid grid-cols-3 gap-6">
          {stylists.map((stylist) => (
            <div key={stylist.id} className="stylist-card bg-white shadow-md rounded-lg p-4">
              <img
                src={stylist.imageUrl || "/assets/image/cáooooooo.jpg"}
                alt={stylist.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <h4 className="text-xl font-semibold mt-2">{stylist.name}</h4>
              <p className="text-gray-600">{stylist.specialty}</p>
              <p className="text-gray-500">Kinh nghiệm: {stylist.experience}</p>
              <div className="mt-4">
                <button
                  className="bg-[#8B4513] text-white px-4 py-2 rounded"
                  onClick={() => handleBooking(stylist.id)} // Khi nhấn, sẽ điều hướng đến trang StylistDetail
                >
                  Xem lịch
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSalonStaff;
