import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Clock, MapPin } from "lucide-react";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const lastBooking = localStorage.getItem("lastBooking");
    if (lastBooking) {
      setBookingDetails(JSON.parse(lastBooking));
    }

    // Countdown logic
    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(countdownTimer);
          navigate("/");
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FDF5E6] flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4">
            <Check className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-[#8B4513] mb-4">
          Đặt Lịch Thành Công
        </h1>
        <p className="text-gray-600 mb-6">
          Hair Harmony chúc bạn có trải nghiệm dịch vụ tuyệt vời!
        </p>

        {bookingDetails && (
          <div className="bg-[#FDF5E6] rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <img
                src={
                  bookingDetails.servicePicture ||
                  "https://via.placeholder.com/100x100?text=Service"
                }
                alt={bookingDetails.serviceName}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div className="text-left">
                <h3 className="font-bold text-xl text-[#8B4513]">
                  {bookingDetails.serviceName}
                </h3>
                <p className="text-gray-600">
                  {bookingDetails.servicePrice.toLocaleString()} VNĐ
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[#8B4513]" />
                <span>{bookingDetails.bookingTime}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-[#8B4513]" />
                <span>{bookingDetails.bookingDate}</span>
              </div>
            </div>
          </div>
        )}

        <div className="text-2xl font-bold text-[#8B4513]">
          Chuyển trang sau: {countdown} giây
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
