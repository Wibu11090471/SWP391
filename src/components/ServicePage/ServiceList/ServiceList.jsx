import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Clock, ShoppingCart, Info } from "lucide-react";

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

const ServiceCard = ({ service, onBookService, onViewDetails }) => {
  const imageUrl =
    service.images && service.images.length > 0
      ? service.images[0].url
      : `https://placehold.co/400x300?text=${encodeURIComponent(
          service.serviceEnity.title
        )}`;

  return (
    <div className="group bg-[#FDF5E6] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={service.serviceEnity.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#3E2723]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-end p-4 space-y-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(service.serviceEnity.id);
            }}
            className="w-full bg-[#CD853F]/20 backdrop-blur-sm text-white py-2 rounded-lg hover:bg-[#CD853F]/30 transition duration-300 mb-2"
          >
            <Info className="inline-block mr-2" size={20} />
            Chi tiết dịch vụ
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookService(service.serviceEnity.id);
            }}
            className="w-full bg-[#8B4513] text-white py-2 rounded-lg 
            hover:bg-[#A0522D] transition duration-300"
          >
            <ShoppingCart className="inline-block mr-2" size={20} />
            Đặt dịch vụ ngay
          </button>
        </div>
      </div>
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-2xl font-bold text-[#3E2723] mb-3 truncate">
          {service.serviceEnity.title}
        </h3>
        <p className="text-[#5D4037] mb-4 flex-grow line-clamp-3">
          {service.serviceEnity.description}
        </p>
      </div>
    </div>
  );
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
        const servicesResponse = await api.get("/api/Service/getAll", {
          params: {
            categoryServiceId: parseInt(categoryId),
          },
        });

        const services = servicesResponse.data.items;

        const category =
          services.length > 0
            ? services[0].serviceEnity.categoryService.title
            : "Dịch vụ";

        setServices(services);
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

  const handleViewServiceDetails = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDF5E6] to-[#FAEBD7] flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#8B4513]"></div>
          <span className="text-2xl text-[#3E2723] font-semibold">
            Đang tải dịch vụ...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF5E6] to-[#FAEBD7] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-[#3E2723] mb-12 text-center shadow-lg p-6 rounded-xl bg-[#FAEBD7]">
          {categoryName}
        </h1>

        {services.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-xl shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mx-auto mb-6 text-[#8B4513] opacity-50"
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
            <p className="text-2xl text-[#3E2723] font-semibold">
              Không có dịch vụ nào trong danh mục này
            </p>
            <p className="text-[#5D4037] mt-2">
              Vui lòng chọn một danh mục dịch vụ khác
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.serviceEnity.id}
                service={service}
                onBookService={handleBookService}
                onViewDetails={handleViewServiceDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceList;
