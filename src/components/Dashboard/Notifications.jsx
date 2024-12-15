import React, { useState, useEffect } from "react";
import axios from "axios";

const createApiInstance = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "https://localhost:7081",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token} ` }),
    },
  });
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const api = createApiInstance();
      try {
        const response = await api.get("/api/notifications");
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError(
          error.response?.status === 401
            ? "Unauthorized: Please check your token."
            : "Failed to load notifications."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    const api = createApiInstance();
    try {
      await api.put("/api/notifications/markAllAsRead"); // API giả định
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const markAsRead = async (id) => {
    const api = createApiInstance();
    try {
      await api.put(`/api/notifications/${id}/markAsRead`); // API giả định
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error(`Error marking notification ${id} as read:`, error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDF5E6] pt-20">
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
              Thêm Dịch Vụ
            </a>
          </li>
          <li>
            <a
              href="/notifications"
              className="block py-3 text-lg bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out text-yellow-400"
            >
              Thông Báo
            </a>
          </li>
          <li>
            <a
              href="/statistics"
              className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
            >
              Thống Kê
            </a>
          </li>
          <li>
            <a
              href="/stylistcommission"
              className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
            >
              Quản Lý Thu Nhập Stylist
            </a>
          </li>
        </ul>
      </div>

      {/* Main Container */}
      <div className="main-container flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Thông Báo</h1>

        <div className="w-full bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-end mb-4">
            <button
              onClick={markAllAsRead}
              className="bg-[#8B4513] text-white px-6 py-2 rounded-md"
              disabled={loading || error}
            >
              Đánh dấu tất cả là đã đọc
            </button>
          </div>

          {loading ? (
            <p>Đang tải thông báo...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="space-y-4">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`bg-gray-100 p-4 rounded-lg shadow-sm flex items-center justify-between cursor-pointer ${
                    !notif.read ? "border-l-4 " : ""
                  } ${
                    notif.type === "success"
                      ? "border-green-500"
                      : notif.type === "error"
                      ? "border-red-500"
                      : "border-blue-500"
                  }`}
                >
                  <p
                    className={`text-lg ${
                      !notif.read ? "font-bold" : "text-gray-500"
                    }`}
                  >
                    {notif.message}
                  </p>
                  {!notif.read && (
                    <span
                      className={`w-3 h-3 rounded-full animate-ping ${
                        notif.type === "success"
                          ? "bg-green-500"
                          : notif.type === "error"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }`}
                    ></span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
