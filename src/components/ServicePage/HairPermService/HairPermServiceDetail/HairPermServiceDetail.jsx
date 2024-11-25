import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "./../../../../ui/card";
import { Clock, ChevronRight, CheckCircle2, ArrowLeft } from "lucide-react";

const HairPermServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  // Data mẫu - trong thực tế nên được lấy từ API hoặc store
  const serviceDetails = {
    hairperm_1: {
      name: "Uốn Cơ Bản",
      duration: "120 Phút",
      description:
        "Dịch vụ uốn tóc cơ bản với kỹ thuật uốn hiện đại, phù hợp với mọi độ tuổi và kiểu tóc.",
      price: "650.000đ",
      features: ["Uốn basic form đơn giản", "Phù hợp mọi độ tuổi"],
      mainImage: "/assets/image/1.jpg",
      subImages: [
        "/assets/image/1.jpg",
        "/assets/image/1.jpg",
        "/assets/image/1.jpg",
      ],
      process: [
        {
          step: 1,
          title: "Tư vấn kiểu uốn",
          description:
            "Stylist tư vấn kiểu uốn phù hợp với khuôn mặt và phong cách",
          duration: "10 phút",
        },
        {
          step: 2,
          title: "Gội đầu và dưỡng sinh",
          description: "Gội đầu với sản phẩm chuyên dụng, massage thư giãn",
          duration: "20 phút",
        },
        {
          step: 3,
          title: "Quấn lô và thực hiện uốn",
          description: "Tiến hành quấn lô và thực hiện kỹ thuật uốn",
          duration: "60 phút",
        },
        {
          step: 4,
          title: "Xả thuốc và dưỡng",
          description: "Xả thuốc và tiến hành dưỡng tóc chuyên sâu",
          duration: "20 phút",
        },
        {
          step: 5,
          title: "Tạo kiểu hoàn thiện",
          description: "Sấy tạo kiểu và hoàn thiện kiểu tóc",
          duration: "10 phút",
        },
      ],
      additionalServices: [
        "Tư vấn chăm sóc tóc uốn tại nhà",
        "Bảo hành uốn trong 30 ngày",
        "Tặng gói hấp dưỡng phục hồi",
      ],
    },
    // Thêm chi tiết cho các service khác tương tự
  };

  const service = serviceDetails[id];

  const handleBookingClick = (e, serviceId) => {
    e.stopPropagation();
    navigate("/booking-service", {
      state: { serviceId, serviceType: "hairperm" },
    });
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Không tìm thấy dịch vụ</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF5E6] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#8B4513] hover:text-[#915C38] mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Quay lại</span>
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={service.subImages[activeImage]}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {service.subImages.map((img, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
                    activeImage === index
                      ? "border-[#8B4513]"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={img}
                    alt={`${service.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#3E2723] mb-2">
                {service.name}
              </h1>
              <div className="flex items-center text-[#5D4037] mb-4">
                <Clock className="w-5 h-5 mr-2" />
                <span>{service.duration}</span>
                <span className="mx-4">|</span>
                <span className="font-semibold">{service.price}</span>
              </div>
              <p className="text-[#5D4037]">{service.description}</p>
            </div>

            {/* Features */}
            <Card className="border-[#DEB887]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#3E2723] mb-4">
                  Dịch vụ bao gồm
                </h2>
                <div className="space-y-3">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-[#5D4037]"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#8B4513] mr-3" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Process Steps */}
            <Card className="border-[#DEB887]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#3E2723] mb-4">
                  Quy trình thực hiện
                </h2>
                <div className="space-y-6">
                  {service.process.map((step) => (
                    <div key={step.step} className="relative pl-8">
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#8B4513] text-white flex items-center justify-center text-sm">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#3E2723] mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-[#5D4037] mb-1">
                          {step.description}
                        </p>
                        <span className="text-sm text-[#8B4513]">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Services */}
            <Card className="border-[#DEB887]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#3E2723] mb-4">
                  Ưu đãi thêm
                </h2>
                <div className="space-y-3">
                  {service.additionalServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center text-[#5D4037]"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#DEB887] mr-3"></div>
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Booking Button */}
            <button
              className="w-full flex items-center justify-center bg-[#8B4513] hover:bg-[#915C38] text-white py-3 px-4 rounded-lg transition-colors duration-200 mt-auto"
              onClick={(e) => handleBookingClick(e, service.id)}
            >
              <span className="font-medium">Đặt lịch ngay</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HairPermServiceDetail;
