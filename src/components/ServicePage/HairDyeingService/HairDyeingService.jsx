import React from "react";
import { Card, CardContent } from "../../../ui/card";
import { Clock, ChevronRight, Paintbrush } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HairDyeingService = () => {
  const navigate = useNavigate();

  const services = [
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
  ];

  const handleServiceClick = (serviceId) => {
    navigate(`/dyeing-service/${serviceId}`);
  };
  const handleBookingClick = (e, serviceId) => {
    e.stopPropagation();
    navigate("/booking-service", {
      state: { serviceId, serviceType: "hairdye" },
    });
  };

  return (
    <div className="min-h-screen bg-[#FDF5E6] pt-20">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section with decorative elements */}
        <div className="text-center mb-12 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-6">
            <Paintbrush className="w-12 h-12 text-[#8B4513] opacity-20" />
          </div>
          <h1 className="text-4xl font-bold text-[#3E2723] mb-4 relative">
            Dịch Vụ Nhuộm Tóc
          </h1>
          <div className="w-24 h-1 bg-[#8B4513] mx-auto mb-4"></div>
          <p className="text-[#5D4037] text-lg max-w-2xl mx-auto">
            Thay đổi diện mạo với màu tóc ấn tượng, công nghệ nhuộm an toàn cho
            mái tóc của bạn
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group hover:shadow-xl transition-all duration-300 border-[#DEB887] bg-white cursor-pointer h-full"
              onClick={() => handleServiceClick(service.id)}
            >
              <CardContent className="p-0 flex flex-col h-full">
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3]">
                    <img
                      src={service.mainImage}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center bg-white/90 px-3 py-1.5 rounded-full">
                      <Clock className="w-4 h-4 text-[#8B4513] mr-2" />
                      <span className="text-sm font-medium text-[#3E2723]">
                        {service.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-[#3E2723] mb-3">
                    {service.name}
                  </h2>
                  <div className="space-y-2 mb-6 flex-grow">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start text-[#5D4037]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#DEB887] mr-2 mt-2"></div>
                        <span className="text-sm line-clamp-2">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button
                    className="w-full flex items-center justify-center bg-[#8B4513] hover:bg-[#915C38] text-white py-3 px-4 rounded-lg transition-colors duration-200 mt-auto"
                    onClick={(e) => handleBookingClick(e, service.id)}
                  >
                    <span className="font-medium">Đặt lịch ngay</span>
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HairDyeingService;
