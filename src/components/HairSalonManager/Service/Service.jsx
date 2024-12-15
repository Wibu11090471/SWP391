import React, { useState, useEffect } from "react";
import {
  Eye,
  Clock,
  DollarSign,
  Sparkles,
  Star,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import Layout from "../Layout";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7081/api/Service/getAll?page=1&pageSize=10"
        );
        setServices(response.data.items);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setCurrentImageIndex(0);
  };

  const closeServiceDetail = () => {
    setSelectedService(null);
  };

  const nextImage = () => {
    if (selectedService) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % selectedService.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedService) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedService.images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-[#FFF5E1] to-[#FFE4B5] text-[#3E2723] p-4 min-h-screen pt-24">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="h-8 w-8 text-[#D2691E] mr-4" />
            <h1 className="text-4xl font-extrabold text-[#8B4513] tracking-tight">
              Dịch Vụ Chăm Sóc Nam Giới
            </h1>
            <Sparkles className="h-8 w-8 text-[#D2691E] ml-4" />
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((item) => {
              const service = item.serviceEnity;
              return (
                <div
                  key={service.id}
                  className="group relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <Card
                    className="bg-white border-2 border-[#DEB887] shadow-lg cursor-pointer overflow-hidden"
                    onClick={() => handleServiceClick(item)}
                  >
                    <div className="relative">
                      <img
                        src={item.images[0]?.url || "/api/placeholder/300/200"}
                        alt={service.title}
                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold text-[#8B4513]">
                          {service.title}
                        </h2>
                        <Star className="h-5 w-5 text-[#FFD700] fill-[#FFD700]" />
                      </div>
                      <div className="flex justify-between items-center text-[#5D4037]">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{service.timeService * 60} phút</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          <span>{service.price.toLocaleString()} VNĐ</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="absolute bottom-0 right-0 mb-4 mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-[#8B4513] text-white p-2 rounded-full shadow-lg hover:bg-[#A0522D] transition-colors">
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Service Detail Modal */}
          {selectedService && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-[#DEB887]">
                {/* Image Carousel */}
                <div className="relative">
                  <img
                    src={selectedService.images[currentImageIndex]?.url}
                    alt={selectedService.serviceEnity.title}
                    className="w-full h-[400px] object-cover rounded-t-2xl"
                  />
                  {selectedService.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white/90 transition-all"
                      >
                        ←
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white/90 transition-all"
                      >
                        →
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {selectedService.images.map((_, index) => (
                          <div
                            key={index}
                            className={`h-2 w-2 rounded-full ${
                              index === currentImageIndex
                                ? "bg-[#8B4513]"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  <button
                    onClick={closeServiceDetail}
                    className="absolute top-4 right-4 bg-white/70 p-2 rounded-full hover:bg-white/90 transition-all"
                  >
                    ✕
                  </button>
                </div>

                {/* Service Details */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center border-b pb-4 border-[#DEB887]">
                    <h2 className="text-2xl font-bold text-[#8B4513]">
                      {selectedService.serviceEnity.title}
                    </h2>
                    <div className="flex items-center text-[#D2691E]">
                      <Star className="h-6 w-6 mr-2 fill-[#FFD700]" />
                      <span className="text-lg font-semibold">
                        {selectedService.serviceEnity.price.toLocaleString()}{" "}
                        VNĐ
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#8B4513] mb-3">
                        Chi Tiết Dịch Vụ
                      </h3>
                      <p className="text-[#5D4037] leading-relaxed text-sm">
                        {selectedService.serviceEnity.description}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-[#FFF5E1] p-3 rounded-lg flex items-center">
                        <Clock className="h-5 w-5 mr-3 text-[#8B4513]" />
                        <div>
                          <h4 className="font-semibold text-[#5D4037] text-sm">
                            Thời Gian
                          </h4>
                          <p className="text-[#3E2723] text-sm">
                            {selectedService.serviceEnity.timeService} giờ
                          </p>
                        </div>
                      </div>
                      <div className="bg-[#FFF5E1] p-3 rounded-lg flex items-center">
                        <Sparkles className="h-5 w-5 mr-3 text-[#8B4513]" />
                        <div>
                          <h4 className="font-semibold text-[#5D4037] text-sm">
                            Trạng Thái
                          </h4>
                          <p className="text-[#3E2723] text-sm">
                            {selectedService.serviceEnity.status
                              ? "Đang Hoạt Động"
                              : "Ngừng Hoạt Động"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Services;
