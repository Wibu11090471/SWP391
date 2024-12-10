import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Button } from "../../../ui/button";
import { useNavigate } from "react-router-dom"; // Sử dụng useNavigate để điều hướng

const api = axios.create({
  baseURL: "https://localhost:7081",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const PaymentCounter = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Thêm trạng thái để quản lý thông báo
  const navigate = useNavigate(); // Khởi tạo navigate

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    try {
      // Fetch bookings with check-in status
      const bookingsResponse = await api.get("/api/Booking/listAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          status: "check-in",
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
        })
      );

      setBookings(bookingsWithStylists);
      setIsLoading(false);
    } catch (err) {
      setError("Không thể tải danh sách đặt lịch");
      setIsLoading(false);
    }
  };

  const handlePayment = async (bookingId) => {
    const token = localStorage.getItem("token");

    try {
      // Update booking status to paid
      await api.put(
        `/api/Booking/${bookingId}`,
        {
          status: "paid",
          note: "Đã thanh toán",
          serviceId: bookings.find((b) => b.id === bookingId).service.id,
          startTime: bookings.find((b) => b.id === bookingId).startTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Set payment success to show the notification
      setPaymentSuccess(true);

      // Refetch bookings to update the list
      await fetchBookings();

      setTimeout(() => {
        setPaymentSuccess(false); 
        navigate("/"); 
      }, 5000);
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      alert("Không thể thanh toán. Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF5E6] p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-[#5D4037] mb-6">
          Thanh Toán Dịch Vụ
        </h1>

        {/* Hiển thị thông báo thanh toán thành công */}
        {paymentSuccess && (
          <div className="bg-green-500 text-white p-3 rounded-md mb-4 text-center">
            Thanh toán thành công!
          </div>
        )}

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
                  <td className="px-4 py-3 text-sm text-[#5D4037]">
                    {booking.assignedStylist
                      ? booking.assignedStylist.fullName
                      : "Không có thông tin"}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      onClick={() => handlePayment(booking.id)}
                      className="bg-[#8B4513] hover:bg-[#915C38] text-white"
                    >
                      Thanh Toán
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <div className="text-center py-6 text-[#5D4037]">
              Không có lịch đặt chờ thanh toán
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCounter;
