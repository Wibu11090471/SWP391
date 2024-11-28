import React, { useState } from "react";
import { Card, CardContent } from "../../ui/card";
import {
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  Calendar,
  User,
} from "lucide-react";

const BookingService = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  // Branches Data
  const branches = [
    {
      id: 1,
      name: "HAIR HARMONY 1",
      address: "3 Đường Số 671, Long Thạnh Mỹ, Quận 9, Hồ Chí Minh, Vietnam",
      rating: "Không có đánh giá",
      image: "/assets/image/Branch.png",
    },
    {
      id: 2,
      name: "HAIR HARMONY 2",
      address: "337 đường hoàng hữu Nam, Long Thạnh Mỹ, quận 9, hồ chí minh",
      rating: "Không có đánh giá",
      image: "/assets/image/Branch.png",
    },
    {
      id: 3,
      name: "HAIR HARMONY 3",
      address:
        "C1/3 Lê Văn Việt, Lê Văn Việt, Tăng Nhơn Phú A, Quận 9, Hồ Chí Minh, Việt Nam",
      rating: "5/5 (4 đánh giá)",
      image: "/assets/image/Branch.png",
    },
    {
      id: 4,
      name: "HAIR HARMONY 4",
      address:
        "89/12 Đường Hằng Tre, Long Thạnh Mỹ, Quận 9, Hồ Chí Minh, Vietnam",
      rating: "4.165/5 (2 đánh giá)",
      image: "/assets/image/Branch.png",
    },
    {
      id: 5,
      name: "HAIR HARMONY 5",
      address:
        "C1/3 Lê Văn Việt, Lê Văn Việt, Tăng Nhơn Phú A, Quận 9, Hồ Chí Minh, Việt Nam",
      rating: "5/5 (4 đánh giá)",
      image: "/assets/image/Branch.png",
    },
    {
      id: 6,
      name: "HAIR HARMONY 6",
      address:
        "C1/3 Lê Văn Việt, Lê Văn Việt, Tăng Nhơn Phú A, Quận 9, Hồ Chí Minh, Việt Nam",
      rating: "5/5 (4 đánh giá)",
      image: "/assets/image/Branch.png",
    },
  ];

  const services = {
    haircut: [
      {
        id: "haircut_1",
        name: "Cắt gội khoang thương gia",
        duration: "50 Phút",
        features: ["Combo cắt kỳ", "Combo gội massage"],
        mainImage: "/assets/image/1.jpg",
        subImages: ["/assets/image/1.jpg", "/assets/image/1.jpg"],
      },
      {
        id: "haircut_2",
        name: "Cắt gội Combo 1",
        duration: "45 Phút",
        features: ["Combo cắt kỳ", "Combo gội massage"],
        mainImage: "/assets/image/2.jpg",
        subImages: ["/assets/image/2.jpg", "/assets/image/2.jpg"],
      },
      {
        id: "haircut_3",
        name: "Cắt gội Combo 2",
        duration: "55 Phút",
        features: ["Combo cắt kỳ", "Combo gội massage cổ vai gáy"],
        mainImage: "/assets/image/3.jpg",
        subImages: ["/assets/image/3.jpg", "/assets/image/3.jpg"],
      },
      {
        id: "haircut_4",
        name: "Cắt gội Combo 3",
        duration: "65 Phút",
        features: ["Combo cắt kỳ", "Combo gội massage chăm sóc da"],
        mainImage: "/assets/image/1.jpg",
        subImages: ["/assets/image/1.jpg", "/assets/image/1.jpg"],
      },
      {
        id: "haircut_5",
        name: "Cắt gội Combo 4",
        duration: "75 Phút",
        features: ["Combo cắt kỳ", "Combo gội massage bằng đá nóng"],
        mainImage: "/assets/image/1.jpg",
        subImages: ["/assets/image/1.jpg", "/assets/image/1.jpg"],
      },
      {
        id: "haircut_6",
        name: "Cắt gội Combo 5",
        duration: "75 Phút",
        features: ["Combo cắt kỳ", "Combo gội massage lấy nhân mụn chuyên sâu"],
        mainImage: "/assets/image/1.jpg",
        subImages: ["/assets/image/1.jpg", "/assets/image/1.jpg"],
      },
    ],
    dyeing: [
      {
        id: "hairdye_1",
        name: "Nhuộm Màu Cơ Bản",
        duration: "90 Phút",
        features: ["Tư vấn màu phù hợp", "Thuốc nhuộm cao cấp"],
        mainImage: "/assets/image/1.jpg",
        subImages: ["/assets/image/1.jpg", "/assets/image/1.jpg"],
      },
      {
        id: "hairdye_2",
        name: "Nhuộm Highlight",
        duration: "120 Phút",
        features: ["Tẩy tóc cục bộ", "Thuốc nhuộm cao cấp"],
        mainImage: "/assets/image/2.jpg",
        subImages: ["/assets/image/2.jpg", "/assets/image/2.jpg"],
      },
      {
        id: "hairdye_3",
        name: "Nhuộm Thời Trang",
        duration: "150 Phút",
        features: ["Tẩy tóc toàn bộ", "Thuốc nhuộm nhập khẩu"],
        mainImage: "/assets/image/3.jpg",
        subImages: ["/assets/image/3.jpg", "/assets/image/3.jpg"],
      },
      {
        id: "hairdye_4",
        name: "Nhuộm Thảo Dược",
        duration: "100 Phút",
        features: ["Thuốc nhuộm thảo dược", "An toàn cho da đầu"],
        mainImage: "/assets/image/1.jpg",
        subImages: ["/assets/image/1.jpg", "/assets/image/1.jpg"],
      },
      {
        id: "hairdye_5",
        name: "Nhuộm Phủ Bạc",
        duration: "80 Phút",
        features: ["Thuốc nhuộm chuyên dụng", "Phủ bạc hiệu quả"],
        mainImage: "/assets/image/1.jpg",
        subImages: ["/assets/image/1.jpg", "/assets/image/1.jpg"],
      },
      {
        id: "hairdye_6",
        name: "Nhuộm Balayage",
        duration: "180 Phút",
        features: ["Tẩy tóc theo kỹ thuật balayage", "Nhuộm màu gradient"],
        mainImage: "/assets/image/1.jpg",
        subImages: ["/assets/image/1.jpg", "/assets/image/1.jpg"],
      },
    ],
    perm: [
      {
        id: "hairperm_1",
        name: "Uốn Cơ Bản",
        duration: "120 Phút",
        features: ["Uốn basic form đơn giản", "Phù hợp mọi độ tuổi"],
        mainImage: "/assets/image/1.jpg",
        subImages: ["/assets/image/1.jpg", "/assets/image/1.jpg"],
      },
      {
        id: "hairperm_2",
        name: "Uốn Phồng",
        duration: "150 Phút",
        features: ["Uốn tạo độ phồng", "Setting kỹ thuật cao"],
        mainImage: "/assets/image/2.jpg",
        subImages: ["/assets/image/2.jpg", "/assets/image/2.jpg"],
      },
      {
        id: "hairperm_3",
        name: "Uốn Gợn Sóng",
        duration: "140 Phút",
        features: ["Uốn sóng nhẹ nhàng", "Phong cách tự nhiên"],
        mainImage: "/assets/image/3.jpg",
        subImages: ["/assets/image/3.jpg", "/assets/image/3.jpg"],
      },
      {
        id: "hairperm_4",
        name: "Uốn Xoăn",
        duration: "160 Phút",
        features: ["Uốn xoăn đa dạng", "Nhiều lựa chọn độ xoăn"],
        mainImage: "/assets/image/1.jpg",
        subImages: ["/assets/image/1.jpg", "/assets/image/1.jpg"],
      },
      {
        id: "hairperm_5",
        name: "Uốn Tạo Kiểu",
        duration: "180 Phút",
        features: ["Uốn theo yêu cầu", "Tạo kiểu đa dạng"],
        mainImage: "/assets/image/1.jpg",
        subImages: ["/assets/image/1.jpg", "/assets/image/1.jpg"],
      },
      {
        id: "hairperm_6",
        name: "Uốn Setting",
        duration: "200 Phút",
        features: ["Kỹ thuật setting cao cấp", "Độ bền cao"],
        mainImage: "/assets/image/1.jpg",
        subImages: ["/assets/image/1.jpg", "/assets/image/1.jpg"],
      },
    ],
  };

  const stylists = [
    {
      id: 1,
      name: "Minh Tuấn",
      specialty: "Chuyên gia tạo kiểu Hàn Quốc",
      experience: "8 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
    },
    {
      id: 2,
      name: "Lan Phương",
      specialty: "Chuyên gia nhuộm và uốn",
      experience: "6 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
    },
    {
      id: 3,
      name: "Việt Anh",
      specialty: "Chuyên gia cắt tóc nam",
      experience: "10 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
    },
    {
      id: 4,
      name: "Hương Giang",
      specialty: "Chuyên gia tạo mẫu tóc cô dâu",
      experience: "7 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
    },
  ];

  // Stylist Availability Mock Data
  const stylistAvailability = {
    1: {
      workDays: [0, 1, 2, 3, 4, 5, 6], // All days of the week
      timeSlots: [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
      ],
    },
    2: {
      workDays: [0, 1, 2, 3, 4, 5, 6], // All days of the week
      timeSlots: [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
      ],
    },
    3: {
      workDays: [0, 1, 2, 3, 4, 5, 6], // All days of the week
      timeSlots: [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
      ],
    },
    4: {
      workDays: [0, 1, 2, 3, 4, 5, 6], // All days of the week
      timeSlots: [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
      ],
    },
  };

  // Helper function to generate stylist-specific dates
  const generateStylistSpecificDates = (stylistId) => {
    const stylist = stylistAvailability[stylistId];
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Check if the day of week matches stylist's work days
      if (stylist.workDays.includes(date.getDay())) {
        dates.push(date);
      }
    }

    return dates;
  };

  // Helper function to get stylist-specific time slots
  const getStylistTimeSlots = (stylistId) => {
    return stylistAvailability[stylistId]?.timeSlots || [];
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist);
    // Reset date and time when changing stylist
    setSelectedDateTime(null);
  };

  // Render different steps of booking process
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {branches.map((branch) => (
              <Card
                key={branch.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedSalon?.id === branch.id
                    ? "border-2 border-[#8B4513]"
                    : "hover:shadow-lg"
                }`}
                onClick={() => setSelectedSalon(branch)}
              >
                <CardContent className="p-0">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#3E2723] mb-2">
                      {branch.name}
                    </h3>
                    <div className="flex items-start text-[#5D4037]">
                      <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                      <p className="text-sm">{branch.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(services).map(([type, serviceList]) => (
                <div key={type} className="space-y-4">
                  {serviceList.map((service) => (
                    <Card
                      key={service.id}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedService?.id === service.id
                          ? "border-2 border-[#8B4513]"
                          : "hover:shadow-lg"
                      }`}
                      onClick={() => setSelectedService(service)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-[#3E2723]">
                            {service.name}
                          </h3>
                          <div className="flex items-center text-[#8B4513]">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{service.duration}</span>
                          </div>
                        </div>
                        <div className="text-sm text-[#5D4037]">
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <div className="w-1 h-1 bg-[#DEB887] rounded-full mr-2"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stylists.map((stylist) => (
                <Card
                  key={stylist.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedStylist?.id === stylist.id
                      ? "border-2 border-[#8B4513]"
                      : "hover:shadow-lg"
                  }`}
                  onClick={() => handleStylistSelect(stylist)}
                >
                  <CardContent className="p-0">
                    <img
                      src={stylist.imageUrl}
                      alt={stylist.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-[#3E2723] mb-1">
                        {stylist.name}
                      </h3>
                      <p className="text-sm text-[#5D4037] mb-1">
                        {stylist.specialty}
                      </p>
                      <p className="text-sm text-[#8B4513]">
                        Kinh nghiệm: {stylist.experience}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedStylist && (
              <div className="space-y-6">
                <div className="text-xl font-semibold mb-4">
                  Chọn ngày và giờ với {selectedStylist.name}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {generateStylistSpecificDates(selectedStylist.id).map(
                    (date, index) => (
                      <button
                        key={index}
                        className={`p-2 rounded-lg text-center ${
                          selectedDateTime?.date === date.toDateString()
                            ? "bg-[#8B4513] text-white"
                            : "bg-white hover:bg-[#DEB887]/20"
                        }`}
                        onClick={() =>
                          setSelectedDateTime({
                            ...selectedDateTime,
                            date: date.toDateString(),
                          })
                        }
                      >
                        <div className="text-sm font-medium">
                          {date.toLocaleDateString("vi-VN", {
                            weekday: "short",
                          })}
                        </div>
                        <div className="text-lg font-bold">
                          {date.getDate()}
                        </div>
                      </button>
                    )
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {getStylistTimeSlots(selectedStylist.id).map(
                    (time, index) => (
                      <button
                        key={index}
                        className={`p-2 rounded-lg ${
                          selectedDateTime?.time === time
                            ? "bg-[#8B4513] text-white"
                            : "bg-white hover:bg-[#DEB887]/20"
                        }`}
                        onClick={() =>
                          setSelectedDateTime({
                            ...selectedDateTime,
                            time,
                          })
                        }
                      >
                        {time}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Step titles
  const stepTitles = ["Chọn Salon", "Chọn Dịch Vụ", "Chọn Stylist & Thời Gian"];

  return (
    <div className="min-h-screen bg-[#FDF5E6] py-8 pt-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {stepTitles.map((title, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index !== stepTitles.length - 1 ? "flex-1" : ""
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep > index + 1
                      ? "bg-[#8B4513] text-white"
                      : currentStep === index + 1
                      ? "bg-[#8B4513] text-white"
                      : "bg-[#DEB887] text-[#3E2723]"
                  }`}
                >
                  {index + 1}
                </div>
                <div
                  className={`ml-2 text-sm font-medium ${
                    currentStep === index + 1
                      ? "text-[#3E2723]"
                      : "text-[#5D4037]"
                  }`}
                >
                  {title}
                </div>
                {index !== stepTitles.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      currentStep > index + 1 ? "bg-[#8B4513]" : "bg-[#DEB887]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">{renderStep()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className={`flex items-center px-6 py-2 rounded-lg ${
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
            className={`flex items-center px-6 py-2 rounded-lg ${
              currentStep === 3
                ? "bg-[#8B4513] text-white"
                : "bg-[#8B4513] text-white hover:bg-[#915C38]"
            }`}
            disabled={
              (currentStep === 1 && !selectedSalon) ||
              (currentStep === 2 && !selectedService) ||
              (currentStep === 3 && (!selectedStylist || !selectedDateTime))
            }
          >
            {currentStep === 3 ? "Hoàn tất đặt lịch" : "Tiếp tục"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingService;
