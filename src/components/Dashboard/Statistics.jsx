import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const api = axios.create({
  baseURL: "https://localhost:7081",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const Statistics = () => {
  const [bookings, setBookings] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await api.get("/api/Booking/listAll", {
          params: { status: "paid" },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(response.data.items);

        // Process monthly revenue
        const revenueByMonth = processMonthlyRevenue(response.data.items);
        setMonthlyRevenue(revenueByMonth);

        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          // Handle other errors
          setError(err.message || "Có lỗi xảy ra khi tải dữ liệu");
        }
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const getAllMonths = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(2024, i); // Sử dụng năm bất kỳ
      months.push(
        date.toLocaleString("default", { month: "short", year: "numeric" })
      );
    }
    return months;
  };

  const processMonthlyRevenue = (items) => {
    const monthlyRevenueMap = {};

    items.forEach((booking) => {
      const month = new Date(booking.startTime).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      const servicePrice = booking.service.price;

      if (monthlyRevenueMap[month]) {
        monthlyRevenueMap[month] += servicePrice;
      } else {
        monthlyRevenueMap[month] = servicePrice;
      }
    });

    // Tạo danh sách tất cả các tháng với doanh thu mặc định là 0
    const allMonths = getAllMonths();
    const revenueByMonth = allMonths.map((month) => ({
      name: month,
      revenue: monthlyRevenueMap[month] || 0,
    }));

    return revenueByMonth;
  };

  const totalRevenue = monthlyRevenue.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-[#8B4513]"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#8B4513] text-white px-6 py-2 rounded-md"
          >
            Thử lại
          </button>
        </div>
      </div>
    );

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
              className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
            >
              Thông Báo
            </a>
          </li>
          <li>
            <a
              href="/statistics"
              className="block py-3 text-lg bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out text-yellow-400"
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
        <h1 className="text-3xl font-bold mb-6 text-center">
          Thống Kê Doanh Thu Theo Tháng
        </h1>

        {/* Total Revenue */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md mt-6 text-center">
          <h2 className="text-xl font-bold mb-2">Tổng Doanh Thu</h2>
          <p className="text-2xl text-blue-600 font-semibold">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>

        {/* Revenue Line Chart */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4 text-center">
            Biểu Đồ Doanh Thu Theo Tháng
          </h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    `$${value.toLocaleString()}`,
                    "Doanh Thu",
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Doanh Thu"
                  stroke="#8B4513"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
