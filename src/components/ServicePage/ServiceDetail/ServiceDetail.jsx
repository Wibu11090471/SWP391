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

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [serviceDetail, setServiceDetail] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      const api = createApiInstance();
      try {
        const response = await api.get(`/api/Service/detail/${serviceId}`);
        setServiceDetail(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch service details:", error);
        setIsLoading(false);
      }
    };

    fetchServiceDetail();
  }, [serviceId]);

  const handleBookService = () => {
    navigate(`/booking/${serviceId}`);
  };

  const handleNextImage = () => {
    if (serviceDetail && serviceDetail.images) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % serviceDetail.images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (serviceDetail && serviceDetail.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? serviceDetail.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDF5E6] to-[#F5DEB3] flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#8B4513]"></div>
          <span className="text-xl text-[#3E2723]">
            Đang tải chi tiết dịch vụ...
          </span>
        </div>
      </div>
    );
  }

  if (!serviceDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDF5E6] to-[#F5DEB3] flex items-center justify-center">
        <div className="text-center text-gray-600">
          Không tìm thấy thông tin dịch vụ
        </div>
      </div>
    );
  }

  const { service, images } = serviceDetail;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF5E6] to-[#F5DEB3] py-12 px-4 pt-24">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Image Gallery Section */}
        <div className="relative">
          {images && images.length > 0 && (
            <div className="relative h-[500px] overflow-hidden">
              <img
                src={images[currentImageIndex].url}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                  >
                    &#10094;
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                  >
                    &#10095;
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Service Details Section */}
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-[#3E2723] mb-4">
            {service.title}
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-[#8B4513] mb-3">
                Mô tả dịch vụ
              </h2>
              <p className="text-gray-700 mb-4">{service.description}</p>

              <div className="bg-[#FDF5E6] p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Thời gian dịch vụ:</span>
                  <span className="font-semibold">
                    {service.timeService} giờ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Giá dịch vụ:</span>
                  <span className="text-[#CD853F] font-bold text-xl">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(service.price)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#8B4513] mb-3">
                Chi tiết
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#CD853F] mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Danh mục: {service.categoryService.title}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#CD853F] mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Giá: {service.price.toLocaleString()} VNĐ</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleBookService}
            className="mt-8 w-full py-4 bg-gradient-to-r from-[#CD853F] to-[#8B4513] text-white rounded-lg 
            hover:from-[#8B4513] hover:to-[#CD853F] transition duration-300 
            transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#CD853F] focus:ring-opacity-50"
          >
            Đặt dịch vụ ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
