import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "../../../ui/card";
import { Clock, ChevronRight, Waves } from "lucide-react";

const HairPermService = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7081/api/Service/getAll"
        );
        // Filter for hair perm related services
        const hairPermServices = response.data.items
          .filter((item) =>
            item.serviceEnity.title.toLowerCase().includes("uốn")
          )
          .map((item) => ({
            id: item.serviceEnity.id,
            name: item.serviceEnity.title,
            description: item.serviceEnity.description,
            price: item.serviceEnity.price,
            duration: `${item.serviceEnity.timeService * 60} Phút`,
            mainImage: item.images[0]?.url || "/assets/image/default.jpg",
            subImages: item.images.map((img) => img.url),
            features: item.serviceEnity.description
              .split(",")
              .map((feature) => feature.trim()),
          }));

        setServices(hairPermServices);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải dịch vụ. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (serviceId) => {
    navigate(`/perm-service/${serviceId}`);
  };

  const handleBookingClick = (e, serviceId) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      navigate("/booking-service", {
        state: { serviceId, serviceType: "hair-perm" },
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF5E6] flex items-center justify-center">
        <div className="text-xl">Đang tải dịch vụ...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDF5E6] flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF5E6] pt-20">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section with decorative elements */}
        <div className="text-center mb-12 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-6">
            <Waves className="w-12 h-12 text-[#8B4513] opacity-20" />
          </div>
          <h1 className="text-4xl font-bold text-[#3E2723] mb-4 relative">
            Dịch Vụ Uốn Tóc
          </h1>
          <div className="w-24 h-1 bg-[#8B4513] mx-auto mb-4"></div>
          <p className="text-[#5D4037] text-lg max-w-2xl mx-auto">
            Tạo kiểu tóc ấn tượng với công nghệ uốn hiện đại, an toàn cho mái
            tóc
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

                {/* Content Section with flex-grow to push button to bottom */}
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

export default HairPermService;
