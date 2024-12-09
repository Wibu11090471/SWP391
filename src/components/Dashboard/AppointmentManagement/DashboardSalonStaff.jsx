import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// Cấu hình axios tương tự như trong Login.jsx
const api = axios.create({
  baseURL: "https://localhost:7081",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Component hiển thị chi tiết booking
const BookingDetailModal = ({ booking, onClose, onStatusChange }) => {
  if (!booking) return null;

  const handleStatusChange = async (newStatus) => {
    try {
      await onStatusChange(booking.id, newStatus);
      onClose();
    } catch (error) {
      console.error("Lỗi khi thay đổi trạng thái:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#5D4037]">
            Chi tiết đặt lịch
          </h2>
          <button
            onClick={onClose}
            className="text-[#8B4513] hover:text-[#915C38]"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-[#5D4037]">Dịch vụ:</p>
            <p>{booking.service.title}</p>
          </div>
          <div>
            <p className="font-semibold text-[#5D4037]">Khách hàng:</p>
            <p>{booking.createdBy.fullName}</p>
          </div>
          <div>
            <p className="font-semibold text-[#5D4037]">Thời gian:</p>
            <p>
              {format(new Date(booking.startTime), "EEEE, dd/MM/yyyy HH:mm", {
                locale: vi,
              })}
            </p>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => handleStatusChange("confirmed")}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Chấp nhận
            </button>
            <button
              onClick={() => handleStatusChange("rejected")}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Từ chối
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardSalonStaff = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await api.get("/api/Booking/listAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(response.data.items);
      setIsLoading(false);
    } catch (err) {
      setError("Không thể tải danh sách đặt lịch");
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    const token = localStorage.getItem("token");

    try {
      // Lấy thông tin booking hiện tại
      const bookingToUpdate = bookings.find((b) => b.id === bookingId);

      // Kiểm tra điều kiện chuyển trạng thái
      const isValidStatusChange =
        bookingToUpdate.status === "booked" &&
        ["confirmed", "rejected"].includes(newStatus);

      if (!isValidStatusChange) {
        alert("Không thể chuyển trạng thái này.");
        return;
      }

      // Tạo payload chỉ thay đổi status
      const updatePayload = {
        serviceId: bookingToUpdate.service.id,
        startTime: bookingToUpdate.startTime,
        status: newStatus,
        note: bookingToUpdate.note,
      };

      await api.put(`/api/Booking/${bookingId}`, updatePayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Cập nhật trạng thái trong state
      const updatedBookings = bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      );

      setBookings(updatedBookings);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Không thể cập nhật trạng thái. Vui lòng thử lại.");
    }
  };

  const renderBookingStatus = (status) => {
    const statusMap = {
      booked: { text: "Chờ duyệt", color: "bg-yellow-100 text-yellow-800" },
      confirmed: { text: "Đã duyệt", color: "bg-green-100 text-green-800" },
      rejected: { text: "Đã từ chối", color: "bg-red-100 text-red-800" },
    };

    const statusInfo = statusMap[status] || {
      text: "Không xác định",
      color: "bg-gray-100 text-gray-800",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDF5E6] flex items-center justify-center">
        <div className="text-center">
          <div
            className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-[#8B4513] rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2 text-[#5D4037]">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDF5E6] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF5E6] p-8">
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-[#5D4037] mb-6">
          Quản lý Đặt lịch
        </h1>

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
                <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-[#FFF0E1]">
                  <td className="px-4 py-3">
                    <div className="text-sm text-[#5D4037]">
                      {booking.service.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {booking.service.price.toLocaleString()} VNĐ
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#5D4037]">
                    {booking.createdBy.fullName}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#5D4037]">
                    {format(new Date(booking.startTime), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td className="px-4 py-3">
                    {renderBookingStatus(booking.status)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="text-[#8B4513] hover:text-[#915C38] text-sm"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <div className="text-center py-6 text-[#5D4037]">
              Không có lịch đặt nào
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSalonStaff;
