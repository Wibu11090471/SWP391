import React, { useState } from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { PlusCircle, X } from "lucide-react";
import axios from "axios";
import theme from "../../../theme";

const AddServiceModal = ({ categoryId, isOpen, onClose, onServiceCreated }) => {
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    timeService: "",
    categoryServiceId: parseInt(categoryId),
    status: true, // Thêm trường status mặc định là true
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const api = axios.create({
    baseURL: "https://localhost:7081",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const validateForm = () => {
    const newErrors = {};
    if (!serviceData.title.trim()) {
      newErrors.title = "Tên dịch vụ không được để trống";
    }
    if (!parseFloat(serviceData.price) || parseFloat(serviceData.price) < 0) {
      newErrors.price = "Giá phải là số dương";
    }
    if (
      !parseFloat(serviceData.timeService) ||
      parseFloat(serviceData.timeService) <= 0
    ) {
      newErrors.timeService = "Thời gian dịch vụ phải lớn hơn 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Bước 1: Tạo service mới
      const createResponse = await api.post("/api/Service/create", {
        ...serviceData,
        price: parseFloat(serviceData.price),
        discount: parseFloat(serviceData.discount || 0),
        timeService: parseFloat(serviceData.timeService),
        status: true,
      });

      // Bước 2: Fetch lại toàn bộ danh sách services
      const servicesResponse = await api.get(
        `/api/Service/getAllServicesByCategoryId?categoryId=${categoryId}`
      );

      // Bước 3: Fetch chi tiết cho từng service bao gồm cả images
      const servicesWithImages = await Promise.all(
        servicesResponse.data.map(async (service) => {
          const detailResponse = await api.get(
            `/api/Service/detail/${service.id}`
          );
          return {
            serviceEnity: {
              id: service.id,
              title: service.title,
              description: service.description,
              price: service.price,
              discount: service.discount,
              timeService: service.timeService,
              status: service.status,
              categoryService: service.categoryService,
            },
            images: detailResponse.data.images || [],
          };
        })
      );

      // Cập nhật state với danh sách services mới
      onServiceCreated(servicesWithImages);

      // Reset form
      setServiceData({
        title: "",
        description: "",
        price: "",
        discount: "",
        timeService: "",
        categoryServiceId: parseInt(categoryId),
        status: true,
      });

      // Đóng modal
      onClose();
    } catch (error) {
      console.error("Service creation error:", error);
      alert(
        "Lỗi khi tạo dịch vụ: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
        style={{
          backgroundColor: theme.colors.background.secondary,
          color: theme.colors.text.primary,
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Thêm Dịch Vụ Mới</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Input
                name="title"
                value={serviceData.title}
                onChange={handleChange}
                placeholder="Tên dịch vụ"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div>
              <Input
                name="description"
                value={serviceData.description}
                onChange={handleChange}
                placeholder="Mô tả dịch vụ"
              />
            </div>

            <div>
              <Input
                name="price"
                type="number"
                value={serviceData.price}
                onChange={handleChange}
                placeholder="Giá dịch vụ"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>

            <div>
              <Input
                name="timeService"
                type="number"
                value={serviceData.timeService}
                onChange={handleChange}
                placeholder="Thời gian (phút)"
              />
              {errors.timeService && (
                <p className="text-red-500 text-sm">{errors.timeService}</p>
              )}
            </div>

            <div>
              <Input
                name="discount"
                type="number"
                value={serviceData.discount}
                onChange={handleChange}
                placeholder="Giảm giá (%)"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              <PlusCircle className="mr-2 h-4 w-4" />
              {loading ? "Đang xử lý..." : "Tạo"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
