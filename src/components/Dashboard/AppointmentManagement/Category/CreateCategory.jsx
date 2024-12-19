import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { XIcon } from "lucide-react";

const CreateCategory = ({ 
  onclose
}) => {
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

  const [categoryData, setCategoryData] = useState({
    title: "",
    description: "",
  });

  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: null,
  });

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api = createApiInstance();

    setSubmitStatus({ success: false, error: null });

    try {
     const response = await api.post("/api/CategoryService/add", categoryData);
      if (response.status === 201) {
        setSubmitStatus({
          success: true,
          error: null,
        });
      } else {
        throw new Error("Failed to create service");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      setSubmitStatus({
        success: false,
        error: errorMessage,
      });
    }
  };

  return (
    <div className="bg-[#FDF5E6]  flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 relative">
        <button
            onClick={onclose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <XIcon size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-[#3E2723]">
          Tạo Thể Loại Mới
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tên Thể Loại
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={categoryData.title}
              onChange={handleInputChange}
              placeholder="Nhập tên dịch vụ"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD853F]"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mô Tả Thể Loại
            </label>
            <textarea
              id="description"
              name="description"
              value={categoryData.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả dịch vụ"
              required
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD853F]"
            />
          </div>
          {submitStatus.error && (
            <p className="text-red-600 text-center mt-4">{submitStatus.error}</p>
          )}
          {submitStatus.success && (
            <p className="text-green-600 text-center mt-4">
              Thể loại dịch vụ đã được tạo thành công!
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#CD853F] text-white py-3 rounded-md hover:bg-[#8B4513] transition duration-300"
          >
            Tạo thể loại
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
