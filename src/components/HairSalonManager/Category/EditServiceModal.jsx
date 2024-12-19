import React, { useState } from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { PlusCircle, Edit } from "lucide-react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../ui/dialog";
import { Label } from "../../../ui/label";
import theme from "../../../theme";

const api = axios.create({
  baseURL: "https://localhost:7081",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const EditServiceModal = ({
  isOpen,
  onClose,
  currentService: initialService,
  currentImages: initialImages,
  onUpdateSuccess,
}) => {
  const [currentService, setCurrentService] = useState(initialService);
  const [currentImages, setCurrentImages] = useState(initialImages);
  const [isLoading, setIsLoading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [imageError, setImageError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [timeService, setTimeService] = useState("");

  if (!isOpen) return null;

  const handleServiceUpdate = async (serviceId, updatedServiceData) => {
    if (parseFloat(updatedServiceData.price) <= 0) {
      alert("Giá không được nhỏ hơn hoặc bằng 0");
      return;
    } else if (parseFloat(updatedServiceData.timeService) <= 0) {
      alert("Thời gian không được nhỏ hơn hoặc bằng 0");
      return;
    }
    setIsLoading(true);
    try {
      await api.put(`/api/Service/update-all/${serviceId}`, {
        ...updatedServiceData,
        price: parseFloat(updatedServiceData.price),
        discount: parseFloat(updatedServiceData.discount || 0),
        timeService: parseFloat(updatedServiceData.timeService),
        categoryServiceId: parseInt(updatedServiceData.categoryServiceId),
        status: updatedServiceData.status,
      });

      const detailResponse = await api.get(`/api/Service/detail/${serviceId}`);
      const updatedService = {
        serviceEnity: {
          id: detailResponse.data.id,
          title: detailResponse.data.title,
          description: detailResponse.data.description,
          price: detailResponse.data.price,
          discount: detailResponse.data.discount,
          timeService: detailResponse.data.timeService,
          status: detailResponse.data.status,
          categoryService: detailResponse.data.categoryService,
        },
        images: detailResponse.data.images || [],
      };

      alert("Dịch vụ đã được cập nhật thành công!");
      onUpdateSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating service:", error);
      alert(
        `Lỗi khi cập nhật dịch vụ: ${error.response?.data || error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddImage = async () => {
    if (!isValidUrl(newImageUrl)) {
      setImageError("URL không hợp lệ");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/api/Image/add", {
        url: newImageUrl,
        serviceId: currentService.id,
      });

      const detailResponse = await api.get(
        `/api/Service/detail/${currentService.id}`
      );
      setCurrentImages(detailResponse.data.images || []);

      setNewImageUrl("");
      setImageError("");
      alert("Thêm ảnh thành công!");
      onUpdateSuccess();
    } catch (error) {
      alert("Lỗi khi thêm ảnh: " + (error.response?.data || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "price") {
      if (parseFloat(value) < 0) {
        setPriceError("Giá không được nhỏ hơn hoặc bằng 0");
        return;
      }
      setPriceError("");
    } else if (field === "timeService") {
      if (parseFloat(value) < 0) {
        setTimeService("Thời gian không được nhỏ hơn hoặc bằng 0");
        return;
      }
    }

    setCurrentService((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        style={{
          backgroundColor: theme.colors.background.secondary,
          color: theme.colors.text.primary,
          maxWidth: "400px",
        }}
      >
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <Edit
              style={{ color: theme.colors.primary.DEFAULT }}
              className="h-6 w-6"
            />
            <DialogTitle style={{ color: theme.colors.text.primary }}>
              Chỉnh Sửa Dịch Vụ
            </DialogTitle>
          </div>
          <DialogDescription style={{ color: theme.colors.text.secondary }}>
            Cập nhật thông tin cho dịch vụ
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tên dịch vụ */}
          <div>
            <Label style={{ color: theme.colors.text.primary }}>
              Tên dịch vụ
            </Label>
            <Input
              placeholder="Tên dịch vụ"
              value={currentService.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              disabled={isLoading}
              style={{
                backgroundColor: theme.colors.background.primary,
                borderColor: theme.colors.primary.light,
                color: theme.colors.text.primary,
              }}
            />
          </div>

          {/* Mô tả dịch vụ */}
          <div>
            <Label style={{ color: theme.colors.text.primary }}>
              Mô tả dịch vụ
            </Label>
            <Input
              placeholder="Mô tả"
              value={currentService.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              disabled={isLoading}
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
                placeholder="Giá"
                type="number"
                value={currentService.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                disabled={isLoading}
                style={{
                  backgroundColor: theme.colors.background.primary,
                  borderColor: theme.colors.primary.light,
                  color: theme.colors.text.primary,
                }}
              />
              {priceError && (
                <p
                  style={{ color: theme.colors.error }}
                  className="text-sm mt-1"
                >
                  {priceError}
                </p>
              )}
            </div>

            {/* Thời gian dịch vụ */}
            <div>
              <Label style={{ color: theme.colors.text.primary }}>
                Thời gian (giờ)
              </Label>
              <Input
                placeholder="Thời gian (giờ)"
                type="number"
                value={currentService.timeService}
                onChange={(e) =>
                  handleInputChange("timeService", e.target.value)
                }
                disabled={isLoading}
                style={{
                  backgroundColor: theme.colors.background.primary,
                  borderColor: theme.colors.primary.light,
                  color: theme.colors.text.primary,
                }}
              />
              {timeService && (
                <p
                  style={{ color: theme.colors.error }}
                  className="text-sm mt-1"
                >
                  {timeService}
                </p>
              )}
            </div>
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
                ({currentService.status ? "Hoạt động" : "Ngừng hoạt động"})
              </span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={currentService.status}
                onChange={(e) => handleInputChange("status", e.target.checked)}
                disabled={isLoading}
                className="w-4 h-4"
              />
            </div>
          </div>

          {/* Images Section */}
          <div>
            <Label style={{ color: theme.colors.text.primary }}>Hình Ảnh</Label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Nhập URL hình ảnh mới"
                value={newImageUrl}
                onChange={(e) => {
                  setNewImageUrl(e.target.value);
                  setImageError("");
                }}
                disabled={isLoading}
                style={{
                  backgroundColor: theme.colors.background.primary,
                  borderColor: theme.colors.primary.light,
                  color: theme.colors.text.primary,
                }}
              />
              <Button
                type="button"
                onClick={handleAddImage}
                disabled={isLoading}
                className="whitespace-nowrap"
                style={{
                  backgroundColor: theme.colors.primary.DEFAULT,
                  color: "white",
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                {isLoading ? "Đang thêm..." : "Thêm Ảnh"}
              </Button>
            </div>
            {imageError && (
              <p style={{ color: theme.colors.error }} className="text-sm mt-1">
                {imageError}
              </p>
            )}

            {/* Display Current Images */}
            <div className="w-full">
              {currentImages.length > 0 ? (
                <div className="mb-4">
                  <img
                    src={[...currentImages].sort((a, b) => b.id - a.id)[0].url}
                    alt="Hình ảnh dịch vụ"
                    className="w-40 h-40 object-cover rounded"
                  />
                </div>
              ) : (
                <p style={{ color: theme.colors.text.secondary }}>
                  Không có hình ảnh nào để hiển thị.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            style={{
              color: theme.colors.text.secondary,
              borderColor: theme.colors.primary.light,
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={() =>
              handleServiceUpdate(currentService.id, currentService)
            }
            disabled={isLoading}
            style={{
              backgroundColor: theme.colors.primary.DEFAULT,
              color: "white",
            }}
          >
            {isLoading ? "Đang lưu..." : "Lưu Thay Đổi"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditServiceModal;
