import React, { useState } from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { PlusCircle } from "lucide-react";
import axios from "axios";

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

  if (!isOpen) return null;

  const handleServiceUpdate = async (serviceId, updatedServiceData) => {
    setIsLoading(true);
    try {
      // Cập nhật dịch vụ
      await api.put(`/api/Service/update-all/${serviceId}`, {
        ...updatedServiceData,
        price: parseFloat(updatedServiceData.price),
        discount: parseFloat(updatedServiceData.discount || 0),
        timeService: parseFloat(updatedServiceData.timeService),
        categoryServiceId: parseInt(updatedServiceData.categoryServiceId),
        status: updatedServiceData.status,
      });

      // Fetch lại chi tiết dịch vụ sau khi cập nhật
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
      onUpdateSuccess(); // Gọi callback để cập nhật danh sách dịch vụ
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
      // Thêm ảnh mới
      await api.post("/api/Image/add", {
        url: newImageUrl,
        serviceId: currentService.id,
      });

      // Fetch lại chi tiết dịch vụ để cập nhật danh sách ảnh
      const detailResponse = await api.get(
        `/api/Service/detail/${currentService.id}`
      );
      setCurrentImages(detailResponse.data.images || []);

      setNewImageUrl("");
      setImageError("");
      alert("Thêm ảnh thành công!");
      onUpdateSuccess(); // Cập nhật lại danh sách dịch vụ
    } catch (error) {
      alert("Lỗi khi thêm ảnh: " + (error.response?.data || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentService((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Chỉnh Sửa Dịch Vụ</h2>

        {/* Service Details Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleServiceUpdate(currentService.id, currentService);
          }}
          className="mb-6"
        >
          <div className="space-y-4">
            {/* Tên dịch vụ */}
            <div>
              <p className="text-sm text-gray-600">Nhập tên dịch vụ</p>
              <Input
                placeholder="Tên dịch vụ"
                value={currentService.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Mô tả dịch vụ */}
            <div>
              <p className="text-sm text-gray-600">Nhập mô tả về dịch vụ</p>
              <Input
                placeholder="Mô tả"
                value={currentService.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Giá */}
              <div>
                <p className="text-sm text-gray-600">
                  Nhập giá dịch vụ (vd: 100000đ)
                </p>
                <Input
                  placeholder="Giá"
                  type="number"
                  value={currentService.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Thời gian dịch vụ */}
              <div>
                <p className="text-sm text-gray-600">
                  Nhập thời gian (vd: 1.5 giờ)
                </p>
                <Input
                  placeholder="Thời gian (phút)"
                  type="number"
                  value={currentService.timeService}
                  onChange={(e) =>
                    handleInputChange("timeService", e.target.value)
                  }
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Trạng thái */}
            <div>
              <p className="text-sm text-gray-600">Chọn trạng thái dịch vụ</p>
              <div className="flex items-center">
                <label htmlFor="status" className="mr-2">
                  Hoạt động
                </label>
                <input
                  id="status"
                  type="checkbox"
                  checked={currentService.status}
                  onChange={(e) =>
                    handleInputChange("status", e.target.checked)
                  }
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </form>

        {/* Images Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Hình Ảnh</h3>

          {/* Add New Image Section */}
          <div className="mb-4">
            <div className="flex gap-2">
              <Input
                placeholder="Nhập URL hình ảnh mới"
                value={newImageUrl}
                onChange={(e) => {
                  setNewImageUrl(e.target.value);
                  setImageError("");
                }}
                disabled={isLoading}
              />
              <Button
                type="button"
                onClick={handleAddImage}
                disabled={isLoading}
                className="whitespace-nowrap"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                {isLoading ? "Đang thêm..." : "Thêm Ảnh"}
              </Button>
            </div>
            {imageError && (
              <p className="text-red-500 text-sm mt-1">{imageError}</p>
            )}
          </div>

          {/* Display Current Images */}
          <div className="grid grid-cols-2 gap-4">
            {currentImages.length > 0 ? (
              currentImages.map((image, index) => (
                <div key={image.id} className="mb-4">
                  <img
                    src={image.url}
                    alt={`Hình ảnh ${index + 1}`}
                    className="w-full h-40 object-cover rounded"
                  />
                </div>
              ))
            ) : (
              <p>Không có hình ảnh nào để hiển thị.</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Hủy
          </Button>
          <Button
            type="button"
            onClick={() =>
              handleServiceUpdate(currentService.id, currentService)
            }
            disabled={isLoading}
          >
            {isLoading ? "Đang lưu..." : "Lưu Thay Đổi"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditServiceModal;
