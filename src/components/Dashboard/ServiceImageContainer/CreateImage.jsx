import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateImage = ({ initialServiceId = "", onBackToService }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [serviceId, setServiceId] = useState(initialServiceId);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: null,
  });
  const [countdown, setCountdown] = useState(3); 
  const navigate = useNavigate();

  useEffect(() => {
    setServiceId(initialServiceId);
  }, [initialServiceId]);
  useEffect(() => {
    let interval;
    if (submitStatus.success && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      navigate("/selectedField"); 
    }
    return () => clearInterval(interval); 
  }, [submitStatus.success, countdown, navigate]);
  
  const createAxiosInstance = () => {
    const token = localStorage.getItem("token");
    return axios.create({
      baseURL: "https://localhost:7081",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      withCredentials: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl || !serviceId) {
      setSubmitStatus({
        success: false,
        error: "Vui lòng nhập URL ảnh và ID dịch vụ",
      });
      return;
    }

    const axiosInstance = createAxiosInstance();
    const requestData = {
      url: imageUrl,
      serviceId: parseInt(serviceId, 10),
    };

    try {
      const response = await axiosInstance.post("/api/Image/add", requestData);

      if (response.status === 200 || response.status === 201) {
        const updateData = { status: true };
        await axiosInstance.put(`/api/Service/update/${serviceId}`, updateData);

        setSubmitStatus({
          success: true,
          error: null,
        });

        setTimeout(() => navigate("/selectedField"), 3000);
      } else {
        throw new Error("Failed to add image");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Lỗi không xác định";
      setSubmitStatus({
        success: false,
        error: errorMessage,
      });
    }
  };

  const isValidImageUrl = (url) => {
    return /\.(jpg|jpeg|png|gif|bmp)$/i.test(url);
  };

  return (
    <div className="bg-[#FDF5E6] flex items-center justify-center pb-20">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#3E2723]">
          Thêm URL Ảnh Cho Dịch Vụ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="serviceId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nhập ID Dịch Vụ
            </label>
            <input
              type="text"
              id="serviceId"
              name="serviceId"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD853F]"
              placeholder="Nhập ID dịch vụ"
            />
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nhập URL Ảnh
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD853F]"
              placeholder="Nhập URL ảnh"
            />
          </div>

          {imageUrl && isValidImageUrl(imageUrl) && (
            <div className="mt-4 text-center">
              <img
                src={imageUrl}
                alt="Preview"
                className="rounded-md"
                style={{
                  maxWidth: "80%", 
                  height: "auto", 
                  margin: "0 auto",
                  display: "block", 
                }}
              />
            </div>
          )}

          {submitStatus.error && (
            <p className="text-red-600 text-center mt-4">
              {submitStatus.error}
            </p>
          )}
          {submitStatus.success && (
            <p className="text-green-600 text-center mt-4">
              Thêm ảnh thành công! Chuyển hướng bạn sau {countdown} giây...
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#CD853F] text-white py-3 rounded-md hover:bg-[#8B4513] transition duration-300"
            disabled={!imageUrl || !serviceId}
          >
            Thêm URL Ảnh
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateImage;
