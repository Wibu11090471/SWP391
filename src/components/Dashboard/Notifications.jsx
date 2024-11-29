import React, { useState } from "react";
import { Link } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Bạn có cuộc hẹn mới với khách hàng vào ngày mai.", read: false },
    { id: 2, message: "Đã cập nhật lịch làm việc tuần tới.", read: false },
    { id: 3, message: "Lịch nghỉ lễ được cập nhật, kiểm tra ngay!", read: true },
    { id: 4, message: "Yêu cầu đổi ca làm việc đã được phê duyệt.", read: false },
    { id: 5, message: "Khách hàng hủy lịch hẹn ngày hôm nay.", read: true },
    { id: 6, message: "Nhớ cập nhật lịch làm việc tháng tới.", read: false },
    { id: 7, message: "Có phản hồi mới từ khách hàng, vui lòng kiểm tra.", read: false },
    // { id: 8, message: "Đơn đặt sản phẩm mới từ khách hàng đã được xác nhận.", read: true },
    // { id: 9, message: "Thay đổi chính sách làm việc vào cuối tuần, đọc ngay!", read: false },
    // { id: 10, message: "Hệ thống sẽ bảo trì vào lúc 22:00 tối nay.", read: true },
    // { id: 11, message: "Khách hàng đã đánh giá 5 sao, hãy cảm ơn ngay!", read: false },
    // { id: 12, message: "Lịch hẹn ngày mai cần xác nhận sớm.", read: false },
    // { id: 13, message: "Bạn đã nhận được bonus tháng này!", read: true },
    // { id: 14, message: "Có tin nhắn mới từ quản lý. Vui lòng kiểm tra.", read: false },
    // { id: 15, message: "Báo cáo doanh thu tuần này đã được gửi qua email.", read: true },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-9 mt-6 w-full min-h-screen">
      <div
        className="stylish-detail container mx-auto flex justify-between items-center p-6"
        style={{ paddingTop: "50px" }}
      >
        <Link to="/hairsalon-staff">
          <button className="bg-[#8B4513] text-white px-8 py-2 rounded-md">
            Quay về Dashboard
          </button>
        </Link>
        <button
          onClick={markAllAsRead}
          className="bg-[#8B4513] text-white px-8 py-2 rounded-md"
        >
          Đánh dấu tất cả là đã đọc
        </button>
      </div>

      <div className="w-full bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-6 flex justify-center items-center">
          Thông Báo
        </h1>
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`bg-gray-100 p-4 rounded-lg shadow-sm flex items-center justify-between cursor-pointer ${
                !notif.read ? "border-l-4 border-blue-500" : ""
              }`}
            >
              <p
                className={`text-lg ${!notif.read ? "font-bold" : "text-gray-500"}`}
              >
                {notif.message}
              </p>
              {!notif.read && (
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
