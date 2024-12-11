import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const MainService = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [apiServices, setApiServices] = useState([]);

  const systemServices = [
    { id: 1, name: "Cắt Tóc", image: "assets/image/1.jpg", path: "/haircutservice" },
    { id: 2, name: "Uốn Tóc", image: "assets/image/2.jpg", path: "/hairpermservice" },
    { id: 3, name: "Nhuộm Tóc", image: "assets/image/3.jpg", path: "/hairdyeingservice" },
    { id: 4, name: "Gội Massage", image: "assets/image/3.jpg", path: "/massageservice" },
    { id: 5, name: "Lấy Ráy Tai", image: "assets/image/3.jpg", path: "/earcleaningservice" },
    { id: 6, name: "Tất cả dịch vụ", image: "assets/image/3.jpg", path: "/all-service" },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      const api = createApiInstance();
      try {
        const response = await api.get("/api/Service/getAll");
        const filteredServices = Array.isArray(response.data)
          ? response.data.filter((service) => service.serviceEnity.status === true)
          : [];
        setApiServices(
          filteredServices.map((service) => ({
            ...service.serviceEnity,
            name: service.serviceEnity.title,
            image: service.image,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch services:", error.message);
        setApiServices([]);
      }
    };
    fetchServices();
  }, []);

  const allServices = [...systemServices, ...apiServices];

  const moveToIndex = (newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => {
      let index = newIndex;
      if (index < 0) index = allServices.length - 1;
      if (index >= allServices.length) index = 0;
      return index;
    });
    setTimeout(() => setIsAnimating(false), 700);
  };

  const handleLearnMore = (e, service) => {
    e.stopPropagation();
    if (service.path) {
      navigate(service.path);
    }
  };

  const getVisibleCards = () => {
    if (allServices.length === 0) return [];
    const cards = [];
    for (let i = -2; i <= 2; i++) {
      let index = activeIndex + i;
      if (index < 0) index = allServices.length + index;
      if (index >= allServices.length) index = index - allServices.length;
      cards.push({ index, service: allServices[index] });
    }
    return cards;
  };

  const getCardStyle = (position) => {
    const baseScale = position === 0 ? 1.2 : position === -1 || position === 1 ? 0.9 : 0.7;
    const baseOpacity = position === 0 ? 1 : position === -1 || position === 1 ? 0.8 : 0.4;
    const baseZIndex = position === 0 ? 3 : position === -1 || position === 1 ? 2 : 1;
    return { scale: baseScale, opacity: baseOpacity, zIndex: baseZIndex };
  };

  return (
    <div className="min-h-screen bg-[#FDF5E6] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-[#3E2723] mb-8">
        Dịch vụ của chúng tôi
      </h1>
      <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-4">
        <div className="relative w-full h-96 overflow-visible flex justify-center items-center">
          <div className="absolute w-full flex justify-center items-center gap-4">
            {getVisibleCards().map(({ index, service }, arrayIndex) => {
              const { scale, opacity, zIndex } = getCardStyle(arrayIndex - 2);
              const isCenter = arrayIndex === 2;
              return (
                <div
                  key={`${service.id}-${index}`}
                  onClick={() => moveToIndex(index)}
                  className="transform-gpu transition-all duration-700 ease-out hover:z-30"
                  style={{
                    position: "absolute",
                    left: `${50 + (arrayIndex - 2) * 20}%`,
                    transform: `translateX(-50%) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                >
                  <div
                    className={`w-64 h-80 bg-[#FAEBD7] rounded-xl shadow-lg overflow-hidden cursor-pointer
                      transition-all duration-700 ease-out group hover:shadow-xl flex flex-col
                      ${
                        isCenter
                          ? "border-2 border-[#CD853F] shadow-xl"
                          : ""
                      }`}
                  >
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                        draggable="false"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-center text-lg font-semibold text-[#3E2723] transition-colors duration-700 mb-2">
                        {service.name}
                      </h3>
                      <div className="mt-auto">
                        <button
                          onClick={(e) => handleLearnMore(e, service)}
                          className={`w-full py-2 px-4 ${
                            service.path
                              ? "bg-[#CD853F] hover:bg-[#8B4513]"
                              : "bg-gray-400 cursor-not-allowed"
                          } text-white rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#CD853F] focus:ring-opacity-50`}
                          disabled={!service.path}
                        >
                          Tìm hiểu thêm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainService;
