import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Check, Calendar, MapPin, User, Printer, Home } from "lucide-react";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Safely extract booking details and service
  const bookingDetails = location.state?.bookingDetails || {};
  const service = location.state?.service || {};

  // Safely extract images with a fallback
  const images =
    service.images ||
    service.serviceImages ||
    service.image ||
    service.categoryService?.images ||
    [];

  const firstImageUrl =
    images.length > 0
      ? images[0].url || images[0]
      : "https://via.placeholder.com/400x300?text=Dịch+Vụ";

  const handleBackToServices = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF5E6] to-[#FAEBD7] py-12 px-4 pt-24 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
        {/* Success Header */}
        <div className="bg-[#8B4513] p-6 flex items-center justify-center">
          <div className="bg-white/20 p-4 rounded-full animate-pulse">
            <Check className="w-16 h-16 text-white" strokeWidth={3} />
          </div>
        </div>

        <div className="p-8 space-y-6">
          <h1 className="text-4xl font-extrabold text-center mb-6 text-[#3E2723] tracking-tight">
            Đặt Lịch Thành Công
          </h1>

          {/* Service Image with Overlay */}
          <div className="relative mb-6 overflow-hidden rounded-2xl shadow-lg">
            <img
              src={firstImageUrl}
              alt={service.title || "Dịch vụ"}
              className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#3E2723]/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-xl font-semibold bg-[#8B4513]/70 px-4 py-2 rounded-lg">
                {service.title || "Dịch vụ"}
              </span>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-4">
            {/* Service Details */}
            <div className="bg-[#FAEBD7] p-5 rounded-xl flex items-center shadow-sm">
              <MapPin className="w-8 h-8 mr-4 text-[#8B4513]" />
              <div>
                <h2 className="text-xl font-bold text-[#3E2723]">
                  {service.title || "Dịch vụ không xác định"}
                </h2>
                <p className="text-[#A0522D] font-semibold text-lg">
                  {service.price
                    ? `${service.price.toLocaleString()} VNĐ`
                    : "Giá chưa xác định"}
                </p>
              </div>
            </div>

            {/* Booking Time */}
            <div className="bg-[#FAEBD7] p-5 rounded-xl flex items-center shadow-sm">
              <Calendar className="w-8 h-8 mr-4 text-[#8B4513]" />
              <div>
                <h3 className="font-semibold text-[#5D4037]">
                  Thời Gian Đặt Lịch
                </h3>
                <p className="text-[#3E2723]">
                  {bookingDetails.startTime
                    ? format(
                        new Date(bookingDetails.startTime),
                        "EEEE, dd/MM/yyyy HH:mm"
                      )
                    : "Thời gian chưa xác định"}
                </p>
              </div>
            </div>

            {/* Booking Code */}
            <div className="bg-[#FAEBD7] p-5 rounded-xl flex items-center shadow-sm">
              <User className="w-8 h-8 mr-4 text-[#8B4513]" />
              <div>
                <h3 className="font-semibold text-[#5D4037]">Mã Đặt Lịch</h3>
                <p className="text-[#CD853F] font-bold text-xl tracking-wider">
                  {bookingDetails.bookingCode || "Chưa có mã đặt lịch"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center py-3 bg-white border-2 border-[#8B4513] text-[#8B4513] rounded-lg 
              hover:bg-[#FDF5E6] transition duration-300 transform hover:scale-[1.02] active:scale-95 space-x-2"
            >
              <Printer className="mr-2" />
              In Xác Nhận
            </button>
            <button
              onClick={handleBackToServices}
              className="flex items-center justify-center py-3 bg-[#8B4513] text-white rounded-lg 
              hover:bg-[#A0522D] transition duration-300 transform hover:scale-[1.02] active:scale-95 space-x-2"
            >
              <Home className="mr-2" />
              Về Trang Dịch Vụ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
