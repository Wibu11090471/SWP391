import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  X,
  Calendar,
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
  const { serviceId } = useParams();
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [unavailableTimeIndexes, setUnavailableTimeIndexes] = useState(
    new Set()
  );

  const TIME_SLOTS = [
    { time: "08:00", timeIndex: 0 },
    { time: "08:30", timeIndex: 1 },
    { time: "09:00", timeIndex: 2 },
    { time: "09:30", timeIndex: 3 },
    { time: "10:00", timeIndex: 4 },
    { time: "10:30", timeIndex: 5 },
    { time: "11:00", timeIndex: 6 },
    { time: "11:30", timeIndex: 7 },
    { time: "12:00", timeIndex: 8 },
    { time: "12:30", timeIndex: 9 },
    { time: "13:00", timeIndex: 10 },
    { time: "13:30", timeIndex: 11 },
    { time: "14:00", timeIndex: 12 },
    { time: "14:30", timeIndex: 13 },
    { time: "15:00", timeIndex: 14 },
    { time: "15:30", timeIndex: 15 },
    { time: "16:00", timeIndex: 16 },
    { time: "16:30", timeIndex: 17 },
    { time: "17:00", timeIndex: 18 },
    { time: "17:30", timeIndex: 19 },
    { time: "18:00", timeIndex: 20 },
    { time: "18:30", timeIndex: 21 },
    { time: "19:00", timeIndex: 22 },
    { time: "19:30", timeIndex: 23 },
    { time: "20:00", timeIndex: 24 },
  ];

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

  const fetchAvailableTimeIndexes = async (selectedDate) => {
    try {
      const service = selectedService.serviceEnity || selectedService.service;
      const serviceDuration = service.duration || service.timeService * 60;
      console.log("serviceDuration", serviceDuration);

      const listTime = TIME_SLOTS.map((slot) => {
        const startMinutes = parseInt(slot.time.split(":")[1]);
        const endMinutes = startMinutes + 30;
        const startTime = slot.time.split(":")[0];

        const endTime =
          endMinutes === 60
            ? `${parseInt(startTime) + 1}:00`
            : `${startTime}:${endMinutes < 10 ? "0" + endMinutes : endMinutes}`;

        return `${slot.time}-${endTime}`;
      });

      const payload = {
        listTime: listTime,
        date: new Date(selectedDate).toISOString(),
      };

      const api = createApiInstance();
      const response = await api.post(
        "/api/PaymentTransaction/availableTimeIndexes",
        payload
      );

      const unavailableIndexes = new Set(response.data);

      const finalUnavailableIndexes = new Set();

      TIME_SLOTS.forEach((slot, index) => {
        // Kiểm tra xem slot không khả dụng
        if (unavailableIndexes.has(index)) {
          // Tính toán số lượng slot cần chặn dựa trên thời lượng dịch vụ
          const blockedSlotsCount = Math.ceil(serviceDuration / 30);

          // Chặn các slot từ slot không khả dụng trở về trước
          for (let i = 0; i < blockedSlotsCount; i++) {
            const blockIndex = index - i;
            if (blockIndex >= 0) {
              finalUnavailableIndexes.add(blockIndex);
            }
          }
        }
      });

      setUnavailableTimeIndexes(finalUnavailableIndexes);
    } catch (error) {
      console.error("Error fetching available time indexes:", error.message);
    }
  };

  const generateAvailableTimes = (selectedDate) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    return TIME_SLOTS.map((slot) => {
      const isPastTime =
        format(now, "yyyy-MM-dd") === selectedDate &&
        (parseInt(slot.time.split(":")[0]) < currentHour ||
          (parseInt(slot.time.split(":")[0]) === currentHour &&
            parseInt(slot.time.split(":")[1]) <= currentMinute));

      const isUnavailable =
        unavailableTimeIndexes.has(slot.timeIndex) || isPastTime;

      return {
        time: slot.time,
        disabled: isUnavailable,
        timeIndex: slot.timeIndex,
      };
    });
  };

  useEffect(() => {
    const fetchServiceDetail = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token) {
        navigate("/login");
        return;
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      try {
        const api = createApiInstance();
        const response = await api.get(`/api/Service/detail/${serviceId}`);

        setSelectedService(response.data);
        setAvailableDates(generateAvailableDates());
      } catch (error) {
        console.error("Failed to fetch service details:", error);
        setError("Không thể tải chi tiết dịch vụ");
        navigate(-1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceDetail();
  }, [navigate, serviceId]);

  useEffect(() => {
    if (selectedDateTime?.date) {
      fetchAvailableTimeIndexes(selectedDateTime.date);
    }
  }, [selectedDateTime?.date]);

  useEffect(() => {
    if (selectedDateTime?.date) {
      setAvailableTimes(generateAvailableTimes(selectedDateTime.date));
    }
  }, [selectedDateTime?.date, unavailableTimeIndexes]);

  const handleBookingSubmit = async () => {
    try {
      const api = createApiInstance();
      const service = selectedService.serviceEnity || selectedService.service;

      // Chuyển đổi selectedTimeSlots thành startTimes
      const startTimes = selectedTimeSlots.map((slot) =>
        new Date(`${slot.date}T${slot.time}:00.000`).toISOString()
      );

      const bookingData = {
        serviceId: parseInt(serviceId),
        startTimes: startTimes,
        note: "Booking multiple slots via web app",
      };

      const bookingResponse = await api.post(
        "/api/Booking/create-multiple",
        bookingData
      );

      navigate("/booking-confirmation", {
        state: {
          bookingDetails: bookingResponse.data,
          service: service,
          selectedTimeSlots: selectedTimeSlots,
        },
      });
    } catch (error) {
      console.error("Booking Error:", error);
      setError(
        error.response?.data?.message || "Không thể đặt lịch. Vui lòng thử lại."
      );
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleBookingSubmit(); // Đặt lịch luôn ở bước 3
    }
  };

  const handleBack = () => {
    if (currentStep > 2) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleDateTimeSelection = (date, time, timeIndex) => {
    // Kiểm tra xem đã có slot nào trong ngày này chưa
    const existingSlotSameDay = selectedTimeSlots.find(
      (slot) => slot.date === date
    );

    if (existingSlotSameDay) {
      // Nếu đã có slot trong ngày này, thì loại bỏ slot cũ và thêm slot mới
      const newSelectedTimeSlots = selectedTimeSlots.filter(
        (slot) => slot.date !== date
      );

      setSelectedTimeSlots([
        ...newSelectedTimeSlots,
        {
          date,
          time,
          timeIndex,
        },
      ]);
    } else {
      // Nếu chưa có slot nào trong ngày này, thêm mới
      setSelectedTimeSlots([
        ...selectedTimeSlots,
        {
          date,
          time,
          timeIndex,
        },
      ]);
    }
  };

  const renderStep = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#8B4513]"></div>
          <span className="ml-4">Đang tải...</span>
        </div>
      );
    }

    if (!selectedService) {
      return (
        <div className="text-center text-red-600">
          Không tìm thấy thông tin dịch vụ
        </div>
      );
    }

    const service = selectedService.serviceEnity || selectedService.service;
    const images = selectedService.images || [];

    switch (currentStep) {
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
                      selectedTimeSlots.some((slot) => slot.date === date)
                        ? "bg-[#8B4513] text-white"
                        : "bg-white text-[#8B4513] hover:bg-[#DEB887]/20"
                    }`}
                    onClick={() => {
                      setSelectedDateTime((prev) => ({
                        date: date,
                        time: null,
                      }));
                    }}
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
                  {availableTimes.map((timeObj) => {
                    const isSelected = selectedTimeSlots.some(
                      (slot) =>
                        slot.date === selectedDateTime.date &&
                        slot.time === timeObj.time
                    );

                    return (
                      <button
                        key={timeObj.time}
                        className={`py-2 px-3 border rounded-md ${
                          isSelected
                            ? "bg-[#8B4513] text-white"
                            : timeObj.disabled
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50 line-through"
                            : "bg-white text-[#8B4513] hover:bg-[#DEB887]/20"
                        }`}
                        onClick={() =>
                          !timeObj.disabled &&
                          handleDateTimeSelection(
                            selectedDateTime.date,
                            timeObj.time,
                            timeObj.timeIndex
                          )
                        }
                        disabled={timeObj.disabled}
                      >
                        {timeObj.time}
                      </button>
                    );
                  })}
                </div>
                {selectedTimeSlots.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Các slot đã chọn:</h3>
                    <ul className="space-y-2">
                      {selectedTimeSlots.map((slot, index) => (
                        <li
                          key={index}
                          className="bg-[#DEB887]/20 p-2 rounded flex justify-between items-center"
                        >
                          {format(new Date(slot.date), "dd/MM/yyyy")} -{" "}
                          {slot.time}
                          <button
                            onClick={() => {
                              const newSlots = selectedTimeSlots.filter(
                                (_, i) => i !== index
                              );
                              setSelectedTimeSlots(newSlots);
                            }}
                            className="text-red-500"
                          >
                            Xóa
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div>
            {selectedTimeSlots.map((slot, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 mb-4"
              >
                <h3 className="text-xl font-bold mb-4 text-[#8B4513]">
                  Dịch Vụ: {service.serviceName}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-[#FDF5E6] p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="mr-2 text-[#8B4513]" size={20} />
                        <span className="font-semibold">Thời gian</span>
                      </div>
                      <p>
                        {format(new Date(slot.date), "EEEE, dd/MM/yyyy")}
                        <br />
                        {slot.time}
                      </p>
                    </div>
                    <div className="bg-[#FDF5E6] p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <MapPin className="mr-2 text-[#8B4513]" size={20} />
                        <span className="font-semibold">Địa điểm</span>
                      </div>
                      <p>{selectedService.branchName || "Chưa xác định"}</p>
                    </div>
                  </div>
                  <div className="bg-[#FDF5E6] p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Calendar className="mr-2 text-[#8B4513]" size={20} />
                      <span className="font-semibold">Chi tiết dịch vụ</span>
                    </div>
                    <div>
                      <p>
                        <strong>Tên dịch vụ:</strong> {service.serviceName}
                      </p>
                      <p>
                        <strong>Giá:</strong> {service.price.toLocaleString()}{" "}
                        VNĐ
                      </p>
                      <p>
                        <strong>Thời lượng:</strong> {service.duration} phút
                      </p>
                      {service.description && (
                        <p className="mt-2 text-sm">
                          <strong>Mô tả:</strong> {service.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
          {["Chọn Ngày & Giờ", "Kiểm Tra", "Xác Nhận"].map((title, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep > index + 2
                    ? "bg-[#8B4513] text-white"
                    : currentStep === index + 2
                    ? "bg-[#8B4513] text-white"
                    : "bg-[#DEB887] text-[#3E2723]"
                }`}
              >
                {index + 2}
              </div>
              <div className="ml-2">{title}</div>
            </div>
          ))}
        </div>

        <div className="mb-8">{renderStep()}</div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="bg-white text-[#8B4513] hover:bg-[#DEB887]/20 px-6 py-2 rounded-lg flex items-center"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Quay lại
          </button>
          <button
            onClick={handleNext}
            className="bg-[#8B4513] text-white px-6 py-2 rounded-lg flex items-center"
            disabled={
              (currentStep === 2 && selectedTimeSlots.length === 0) ||
              (currentStep === 3 && !selectedService)
            }
          >
            {currentStep === 3 ? "Xác Nhận Đặt Lịch" : "Tiếp tục"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingService;
