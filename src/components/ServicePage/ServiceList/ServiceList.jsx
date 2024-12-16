import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

const ServiceList = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const api = createApiInstance();
      try {
        const servicesResponse = await api.get("/api/Service/getAll");
        const filteredServices = servicesResponse.data.items.filter(
          (service) =>
            service.serviceEnity.categoryService.id === parseInt(categoryId)
        );

        const category =
          filteredServices.length > 0
            ? filteredServices[0].serviceEnity.categoryService.title
            : "Dịch vụ";

        setServices(filteredServices);
        setCategoryName(category);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setServices([]);
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [categoryId]);

  const handleBookService = (serviceId) => {
    navigate(`/booking/${serviceId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDF5E6] to-[#F5DEB3] flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#8B4513]"></div>
          <span className="text-xl text-[#3E2723]">Đang tải dịch vụ...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF5E6] to-[#F5DEB3] py-12 px-4 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-[#3E2723] mb-10 text-center shadow-sm p-4 rounded-lg bg-white/30">
          {categoryName}
        </h1>

        {services.length === 0 ? (
          <div className="text-center text-gray-600 bg-white/50 p-8 rounded-xl shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto mb-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Không có dịch vụ nào trong danh mục này
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const serviceData = service.serviceEnity;
              const imageUrl =
                service.images && service.images.length > 0
                  ? service.images[0].url
                  : `https://placehold.co/400x300?text=${encodeURIComponent(
                      serviceData.title
                    )}`;

              return (
                <div
                  key={serviceData.id}
                  onClick={() => navigate(`/service/${serviceData.id}`)} // Thêm dòng này
                  className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer" // Thêm cursor-pointer
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={serviceData.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-2xl font-bold text-[#3E2723] mb-3 truncate">
                      {serviceData.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                      {serviceData.description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[#CD853F] font-bold text-xl">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(serviceData.price)}
                      </span>
                      <span className="text-gray-500 text-sm bg-[#FDF5E6] px-2 py-1 rounded-full">
                        {serviceData.timeService} giờ
                      </span>
                    </div>
                    <button
                      onClick={() => handleBookService(serviceData.id)}
                      className="w-full py-3 bg-gradient-to-r from-[#CD853F] to-[#8B4513] text-white rounded-lg 
                      hover:from-[#8B4513] hover:to-[#CD853F] transition duration-300 
                      transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#CD853F] focus:ring-opacity-50"
                    >
                      Đặt dịch vụ
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceList;
