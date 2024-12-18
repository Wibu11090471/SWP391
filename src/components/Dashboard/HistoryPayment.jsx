import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const createApiInstance = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "https://localhost:7081",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

const HistoryPayment = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiInstance = createApiInstance();
      try {
        // Fetch all bookings from the API
        const bookingResponse = await apiInstance.get("/api/Booking/listAll");

        // Check if the response contains the 'items' field
        if (bookingResponse.data && Array.isArray(bookingResponse.data.items)) {
          const rejectedBookings = bookingResponse.data.items
            .filter((booking) => booking.status === "rejected") // Filter out rejected bookings
            .map((booking) => ({
              service: booking.service?.title || "N/A",
              customer: booking.createdBy?.fullName || "N/A",
              createdOn: booking.createdOn,
              status: booking.status,
            }));

          // Set the rejected bookings in state
          setBookings(rejectedBookings);
        } else {
          console.error("Booking response data is not in the expected format.");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Đang tải dữ liệu...</p>;
  }

  return (
    <div className="flex min-h-screen bg-[#FDF5E6] pt-20">
      {/* Sidebar */}
      <div className="sidebar w-1/4 bg-gray-800 text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8 pl-3 text-yellow-400">Dashboard</h2>
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
              href="/history"
              className="block py-3 text-lg bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out text-yellow-400"
            >
              Lịch sử giao dịch
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

      {/* Main Content */}
      <div className="main-container flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Lịch sử giao dịch</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#FAEBD7]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                  Dịch vụ
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td className="border p-3">{booking.service}</td>
                  <td className="border p-3">{booking.createdBy.fullName}</td>
                  <td className="border p-3">
                    {format(new Date(booking.createdOn), "dd/MM/yyyy", {
                      locale: vi,
                    })}
                  </td>
                  <td className="border p-3 text-red-500 font-semibold">
                    {booking.status === "rejected" ? "Bị từ chối" : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPayment;
