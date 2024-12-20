import React, { useState } from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { PlusCircle, Plus } from "lucide-react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../ui/dialog";
import { Label } from "../../../ui/label";
import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";
import theme from "../../../theme";

const AddServiceModal = ({ categoryId, isOpen, onClose, onServiceCreated }) => {
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    timeService: "",
    categoryServiceId: parseInt(categoryId),
    status: true,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    message: "",
    type: "",
  });

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
      setAlertInfo({
        show: true,
        message: "Tên dịch vụ không được để trống",
        type: "error",
      });
      return false;
    }
    if (!parseFloat(serviceData.price) || parseFloat(serviceData.price) < 0) {
      setAlertInfo({
        show: true,
        message: "Giá phải là số dương",
        type: "error",
      });
      return false;
    }
    if (
      !parseFloat(serviceData.timeService) ||
      parseFloat(serviceData.timeService) <= 0
    ) {
      setAlertInfo({
        show: true,
        message: "Thời gian dịch vụ phải lớn hơn 0",
        type: "error",
      });
      return false;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({ ...prev, [name]: value }));
    // Reset alert when user starts typing
    if (alertInfo.show) {
      setAlertInfo({ show: false, message: "", type: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const createResponse = await api.post("/api/Service/create", {
        ...serviceData,
        price: parseFloat(serviceData.price),
        discount: parseFloat(serviceData.discount || 0),
        timeService: parseFloat(serviceData.timeService),
        status: true,
      });

      const servicesResponse = await api.get(
        `/api/Service/getAllServicesByCategoryId?categoryId=${categoryId}`
      );

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

      setAlertInfo({
        show: true,
        message: `Đã thêm dịch vụ "${serviceData.title}" thành công!`,
        type: "success",
      });

      // Delay closing and resetting
      setTimeout(() => {
        onServiceCreated(servicesWithImages);
        setServiceData({
          title: "",
          description: "",
          price: "",
          discount: "",
          timeService: "",
          categoryServiceId: parseInt(categoryId),
          status: true,
        });
        onClose();
      }, 1500);
    } catch (error) {
      setAlertInfo({
        show: true,
        message:
          error.response?.data?.message || "Có lỗi xảy ra khi tạo dịch vụ",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        style={{
          backgroundColor: theme.colors.background.secondary,
          color: theme.colors.text.primary,
          maxWidth: "600px",
        }}
      >
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <Plus
              style={{ color: theme.colors.primary.DEFAULT }}
              className="h-6 w-6"
            />
            <DialogTitle style={{ color: theme.colors.text.primary }}>
              Thêm Dịch Vụ Mới
            </DialogTitle>
          </div>
          <DialogDescription style={{ color: theme.colors.text.secondary }}>
            Điền thông tin để tạo dịch vụ mới
          </DialogDescription>
        </DialogHeader>

        {alertInfo.show && (
          <Alert
            className={`mb-6 ${
              alertInfo.type === "success"
                ? "bg-green-50 border-green-500"
                : "bg-red-50 border-red-500"
            }`}
            style={{
              borderWidth: "1px",
            }}
          >
            <AlertTitle
              className={
                alertInfo.type === "success" ? "text-green-800" : "text-red-800"
              }
            >
              {alertInfo.type === "success" ? "Thành công!" : "Lỗi!"}
            </AlertTitle>
            <AlertDescription
              className={
                alertInfo.type === "success" ? "text-green-700" : "text-red-700"
              }
            >
              {alertInfo.message}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên dịch vụ */}
          <div>
            <Label style={{ color: theme.colors.text.primary }}>
              Tên dịch vụ
            </Label>
            <Input
              name="title"
              value={serviceData.title}
              onChange={handleChange}
              placeholder="Nhập tên dịch vụ"
              style={{
                backgroundColor: theme.colors.background.primary,
                borderColor: theme.colors.primary.light,
                color: theme.colors.text.primary,
              }}
            />
            {errors.title && (
              <p style={{ color: theme.colors.error }} className="text-sm mt-1">
                {errors.title}
              </p>
            )}
          </div>

          {/* Mô tả */}
          <div>
            <Label style={{ color: theme.colors.text.primary }}>
              Mô tả dịch vụ
            </Label>
            <Input
              name="description"
              value={serviceData.description}
              onChange={handleChange}
              placeholder="Nhập mô tả dịch vụ"
              style={{
                backgroundColor: theme.colors.background.primary,
                borderColor: theme.colors.primary.light,
                color: theme.colors.text.primary,
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Giá */}
            <div>
              <Label style={{ color: theme.colors.text.primary }}>
                Giá dịch vụ
              </Label>
              <Input
                name="price"
                type="number"
                value={serviceData.price}
                onChange={handleChange}
                placeholder="Nhập giá dịch vụ"
                style={{
                  backgroundColor: theme.colors.background.primary,
                  borderColor: theme.colors.primary.light,
                  color: theme.colors.text.primary,
                }}
              />
              {errors.price && (
                <p
                  style={{ color: theme.colors.error }}
                  className="text-sm mt-1"
                >
                  {errors.price}
                </p>
              )}
            </div>

            {/* Thời gian */}
            <div>
              <Label style={{ color: theme.colors.text.primary }}>
                Thời gian (giờ)
              </Label>
              <Input
                name="timeService"
                type="number"
                value={serviceData.timeService}
                onChange={handleChange}
                placeholder="Nhập thời gian dịch vụ"
                style={{
                  backgroundColor: theme.colors.background.primary,
                  borderColor: theme.colors.primary.light,
                  color: theme.colors.text.primary,
                }}
              />
              {errors.timeService && (
                <p
                  style={{ color: theme.colors.error }}
                  className="text-sm mt-1"
                >
                  {errors.timeService}
                </p>
              )}
            </div>
          </div>

          {/* Giảm giá */}
          <div>
            <Label style={{ color: theme.colors.text.primary }}>
              Giảm giá (%)
            </Label>
            <Input
              name="discount"
              type="number"
              value={serviceData.discount}
              onChange={handleChange}
              placeholder="Nhập phần trăm giảm giá"
              style={{
                backgroundColor: theme.colors.background.primary,
                borderColor: theme.colors.primary.light,
                color: theme.colors.text.primary,
              }}
            />
          </div>

          {/* Trạng thái */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Label style={{ color: theme.colors.text.primary }}>
                Trạng thái
              </Label>
              <span
                style={{ color: theme.colors.text.secondary }}
                className="text-sm"
              >
                (Mặc định: Hoạt động)
              </span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={serviceData.status}
                onChange={(e) =>
                  setServiceData((prev) => ({
                    ...prev,
                    status: e.target.checked,
                  }))
                }
                className="w-4 h-4"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              style={{
                color: theme.colors.text.secondary,
                borderColor: theme.colors.primary.light,
              }}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: theme.colors.primary.DEFAULT,
                color: "white",
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              {loading ? "Đang xử lý..." : "Tạo mới"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceModal;
