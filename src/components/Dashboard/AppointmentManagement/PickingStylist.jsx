import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Button } from "../../../ui/button";

// Cấu hình axios
const api = axios.create({
  baseURL: "https://localhost:7081",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const DashboardSalonStaff = () => {
  const [bookings, setBookings] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchBookings(), fetchStylists()]);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    try {
      // First, fetch the confirmed bookings
      const bookingsResponse = await api.get("/api/Booking/listAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          status: "confirmed",
        },
      });

      // Fetch payment transactions to get stylist information
      const transactionsResponse = await api.get(
        "/api/PaymentTransaction/getAll",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Create a map of booking IDs to stylists
      const stylistMap = {};
      transactionsResponse.data.paymentTransactions.forEach((transaction) => {
        if (transaction.booking && transaction.stylist) {
          stylistMap[transaction.booking.id] = transaction.stylist;
        }
      });

      // Attach stylist information to bookings
      const bookingsWithStylists = bookingsResponse.data.items.map(
        (booking) => ({
          ...booking,
          assignedStylist: stylistMap[booking.id] || null,
          bookingStatus: booking.status || "Confirmed", // Add booking status
        })
      );

      setBookings(bookingsWithStylists);
      setIsLoading(false);
    } catch (err) {
      setError("Không thể tải danh sách đặt lịch");
      setIsLoading(false);
    }
  };

  const fetchStylists = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await api.get("/api/User/getAllStylists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStylists(response.data.items || response.data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách stylist:", err);
    }
  };

  const handleStylistSelection = async (bookingId, stylistId) => {
    const token = localStorage.getItem("token");

    try {
      // Update the payment transaction with the selected stylist
      await api.post(
        `/api/PaymentTransaction/create`,
        {
          note: "Đã chọn stylist",
          stylistId: stylistId,
          bookingId: bookingId,
          status: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refetch bookings to update the list with the new stylist assignment
      await fetchBookings();
      setSelectedBooking(null);
    } catch (error) {
      console.error("Lỗi khi chọn stylist:", error);
      alert("Không thể chọn stylist. Vui lòng thử lại.");
    }
  };

  const handleCheckIn = async (bookingId) => {
    const token = localStorage.getItem("token");

    try {
      // Update booking status to check-in
      await api.put(
        `/api/Booking/${bookingId}`,
        {
          status: "check-in",
          note: "Đã check-in",
          // Keeping other details same as original booking
          serviceId: bookings.find((b) => b.id === bookingId).service.id,
          startTime: bookings.find((b) => b.id === bookingId).startTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refetch bookings to update the list
      await fetchBookings();
    } catch (error) {
      console.error("Lỗi khi check-in:", error);
      alert("Không thể check-in. Vui lòng thử lại.");
    }
  };

  const BookingDetailModal = ({ booking, onClose, stylists }) => {
    const [selectedStylist, setSelectedStylist] = useState(null);

    const onSubmit = () => {
      if (!selectedStylist) {
        alert("Vui lòng chọn stylist");
        return;
      }
      handleStylistSelection(booking.id, selectedStylist);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#5D4037]">Chọn Stylist</h2>
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

            <div className="mb-4">
              <p className="font-semibold text-[#5D4037] mb-2">Chọn Stylist:</p>
              <Select
                value={selectedStylist}
                onValueChange={setSelectedStylist}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn stylist" />
                </SelectTrigger>
                <SelectContent>
                  {stylists.map((stylist) => (
                    <SelectItem key={stylist.id} value={stylist.id}>
                      {stylist.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                onClick={onSubmit}
                className="bg-[#8B4513] hover:bg-[#915C38] text-white"
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDF5E6] p-8">
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          stylists={stylists}
          onClose={() => setSelectedBooking(null)}
        />
      )}

      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-[#5D4037] mb-6">
          Chọn Stylist cho Đặt lịch
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
                  Stylist
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                  Thao tác
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                  Check-in
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
                  <td className="px-4 py-3 text-sm text-[#5D4037]">
                    {booking.assignedStylist
                      ? booking.assignedStylist.fullName
                      : "Chưa chọn stylist"}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#5D4037]">
                    {booking.bookingStatus}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="text-[#8B4513] hover:text-[#915C38] text-sm"
                    >
                      Chọn Stylist
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    {booking.assignedStylist && (
                      <button
                        onClick={() => handleCheckIn(booking.id)}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        Check-in
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <div className="text-center py-6 text-[#5D4037]">
              Không có lịch đặt chờ chọn stylist
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSalonStaff;
