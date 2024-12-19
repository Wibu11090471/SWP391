import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { XIcon } from "lucide-react";

const CreateService = ({ 
  categories,
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

  useEffect(() => {
    if (categories.length > 0) {
      setServiceData((prev) => ({ ...prev, categoryServiceId: categories[0].id }));
    }
  }, [categories]);
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    price: 0,
    discount: 0,
    timeService: 0,
    categoryServiceId: "",
  });

  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevState) => ({
      ...prevState,
      [name]:
        name === "price" || name === "discount" || name === "timeService" || name === "categoryServiceId"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api = createApiInstance();

    setSubmitStatus({ success: false, error: null });

    try {
     const response = await api.post("/api/Service/create", serviceData);
      if (response.status === 201) {
        setSubmitStatus({
          success: true,
          error: null,
        });
        // Reset form nếu không được điều hướng
       
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
          Tạo Dịch Vụ Mới
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tên Dịch Vụ
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={serviceData.title}
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
              Mô Tả Dịch Vụ
            </label>
            <textarea
              id="description"
              name="description"
              value={serviceData.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả dịch vụ"
              required
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD853F]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Giá Dịch Vụ (VNĐ)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={serviceData.price}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                max="10000000"
                step="10000"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD853F]"
              />
            </div>

            <div>
            <label
              htmlFor="timeService"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Thời Gian Dịch Vụ (Giờ)
            </label>
            <input
              type="number"
              id="timeService"
              name="timeService"
              value={serviceData.timeService}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              step="0.5"
              max="5"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD853F]"
            />
          </div>
            
          </div>
          <div>
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Giảm Giá (%)
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={serviceData.discount}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                max="100"
                step="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CD853F]"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Thể Loại
              </label>
              <select 
               id="categoryServiceId"
               name="categoryServiceId"
               value={serviceData.category}
               onChange={handleInputChange}
              >
                {categories.map((category,index) => (
                  <option key={index} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          
          {submitStatus.error && (
            <p className="text-red-600 text-center mt-4">{submitStatus.error}</p>
          )}
          {submitStatus.success && (
            <p className="text-green-600 text-center mt-4">
              Dịch vụ đã được tạo thành công!
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#CD853F] text-white py-3 rounded-md hover:bg-[#8B4513] transition duration-300"
          >
            Tạo Dịch Vụ
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateService;
