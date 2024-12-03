import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../ui/card";
import {
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { Alert, AlertDescription } from "../../ui/alert";

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

const BookingService = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(format(date, "yyyy-MM-dd"));
    }
    return dates;
  };

  const generateAvailableTimes = (selectedDate) => {
    const times = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    for (let hour = 8; hour <= 20; hour++) {
      ["00", "30"].forEach((minute) => {
        const timeToCheck = new Date();
        timeToCheck.setHours(hour, parseInt(minute), 0, 0);

        const isPastTime =
          format(now, "yyyy-MM-dd") === selectedDate &&
          (hour < currentHour ||
            (hour === currentHour && parseInt(minute) <= currentMinute));

        times.push({
          time: `${hour.toString().padStart(2, "0")}:${minute}`,
          disabled: isPastTime,
        });
      });
    }
    return times;
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const api = createApiInstance();
        const response = await api.get("/api/Service/getAll");
        setServices(response.data.items);
      } catch (error) {
        setError("Lỗi khi tải dịch vụ");
      }
    };

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchServices();
    setAvailableDates(generateAvailableDates());
  }, [navigate]);

  useEffect(() => {
    if (selectedDateTime?.date) {
      setAvailableTimes(generateAvailableTimes(selectedDateTime.date));
    }
  }, [selectedDateTime?.date]);

  const handleBookingSubmit = async () => {
    try {
      const api = createApiInstance();
      const bookingData = {
        startTime: new Date(
          `${selectedDateTime.date} ${selectedDateTime.time}`
        ).toISOString(),
        serviceId: selectedService.serviceEnity.id,
        note: "Booking via web app",
      };

      const bookingResponse = await api.post(
        "/api/Booking/create",
        bookingData
      );

      localStorage.setItem(
        "lastBooking",
        JSON.stringify({
          serviceName: selectedService.serviceEnity.title,
          servicePicture: selectedService.images?.[0]?.url || null,
          bookingDate: selectedDateTime.date,
          bookingTime: selectedDateTime.time,
          servicePrice: selectedService.serviceEnity.price,
        })
      );

      navigate("/booking-success", {
        state: {
          serviceName: selectedService.serviceEnity.title,
          bookingDate: selectedDateTime.date,
          bookingTime: selectedDateTime.time,
          servicePrice: selectedService.serviceEnity.price,
          serviceImage: selectedService.images?.[0]?.url || null,
        },
      });
    } catch (error) {
      setError(error.response?.data?.message || "Đặt lịch thất bại");
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleBookingSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item) => {
              const service = item.serviceEnity;
              return (
                <Card
                  key={service.id}
                  className={`cursor-pointer ${
                    selectedService?.serviceEnity.id === service.id
                      ? "border-2 border-[#8B4513]"
                      : "hover:shadow-lg"
                  }`}
                  onClick={() => setSelectedService(item)}
                >
                  <CardContent className="p-0">
                    <img
                      src={
                        item.images?.[0]?.url ||
                        "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{service.timeService} giờ</span>
                      </div>
                      <p className="text-sm mt-2">{service.description}</p>
                      <div className="mt-2 text-[#8B4513] font-bold">
                        {service.price.toLocaleString()} VNĐ
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        );

      case 2:
        return (
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Chọn ngày
              </label>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    className={`py-3 px-4 border rounded-lg text-center ${
                      selectedDateTime?.date === date
                        ? "bg-[#8B4513] text-white"
                        : "bg-white text-[#8B4513] hover:bg-[#DEB887]/20"
                    }`}
                    onClick={() =>
                      setSelectedDateTime((prev) => ({
                        date: date,
                        time: null,
                      }))
                    }
                    disabled={new Date(date) < new Date().setHours(0, 0, 0, 0)}
                  >
                    <div className="font-semibold">
                      {format(new Date(date), "EEE")}
                    </div>
                    <div className="text-lg">
                      {format(new Date(date), "dd/MM")}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {selectedDateTime?.date && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mt-6 mb-4">
                  Chọn giờ
                </label>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {availableTimes.map((timeObj) => (
                    <button
                      key={timeObj.time}
                      className={`py-2 px-3 border rounded-md ${
                        selectedDateTime?.time === timeObj.time
                          ? "bg-[#8B4513] text-white"
                          : timeObj.disabled
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-[#8B4513] hover:bg-[#DEB887]/20"
                      }`}
                      onClick={() =>
                        !timeObj.disabled &&
                        setSelectedDateTime((prev) => ({
                          ...prev,
                          time: timeObj.time,
                        }))
                      }
                      disabled={timeObj.disabled}
                    >
                      {timeObj.time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-100 rounded-full p-4">
                <Check className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-6 text-[#8B4513]">
              Xác Nhận Đặt Dịch Vụ
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  src={
                    selectedService.images?.[0]?.url ||
                    "https://via.placeholder.com/100x100?text=No+Image"
                  }
                  alt={selectedService.serviceEnity.title}
                  className="w-24 h-24 object-cover rounded-lg mr-6"
                />
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedService.serviceEnity.title}
                  </h3>
                  <p className="text-gray-600">
                    {selectedService.serviceEnity.description}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FDF5E6] p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 mr-2 text-[#8B4513]" />
                    <span className="font-semibold">Thời gian</span>
                  </div>
                  <p className="text-gray-700">
                    {format(
                      new Date(selectedDateTime.date),
                      "EEEE, dd/MM/yyyy"
                    )}
                    <br />
                    {selectedDateTime.time}
                  </p>
                </div>
                <div className="bg-[#FDF5E6] p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 mr-2 text-[#8B4513]" />
                    <span className="font-semibold">Giá dịch vụ</span>
                  </div>
                  <p className="text-[#8B4513] font-bold text-xl">
                    {selectedService.serviceEnity.price.toLocaleString()} VNĐ
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF5E6] py-8 pt-28">
      {error && (
        <div className="fixed bottom-4 right-4 z-50">
          <Alert variant="destructive" className="w-72 bg-red-700">
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              <X
                className="h-4 w-4 cursor-pointer opacity-70"
                onClick={() => setError(null)}
              />
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          {["Chọn Dịch Vụ", "Chọn Ngày & Giờ", "Xác Nhận"].map(
            (title, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > index + 1
                      ? "bg-[#8B4513] text-white"
                      : currentStep === index + 1
                      ? "bg-[#8B4513] text-white"
                      : "bg-[#DEB887] text-[#3E2723]"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="ml-2">{title}</div>
              </div>
            )
          )}
        </div>

        <div className="mb-8">{renderStep()}</div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className={`px-6 py-2 rounded-lg ${
              currentStep === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-[#8B4513] hover:bg-[#DEB887]/20"
            }`}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Quay lại
          </button>
          <button
            onClick={handleNext}
            className="bg-[#8B4513] text-white px-6 py-2 rounded-lg flex items-center"
            disabled={
              (currentStep === 1 && !selectedService) ||
              (currentStep === 2 &&
                (!selectedDateTime?.date || !selectedDateTime?.time))
            }
          >
            {currentStep === 3 ? "Hoàn tất" : "Tiếp tục"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingService;
