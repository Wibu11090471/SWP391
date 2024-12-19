import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Edit } from "lucide-react";
import theme from "../../../theme";

const api = axios.create({
  baseURL: "https://localhost:7081",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Custom Switch Component
const CustomSwitch = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={`
          w-11 h-6 rounded-full 
          peer-checked:after:translate-x-full 
          peer-checked:after:border-white 
          after:content-[''] 
          after:absolute 
          after:top-[2px] 
          after:left-[2px] 
          after:bg-white 
          after:border-gray-300 
          after:border 
          after:rounded-full 
          after:h-5 
          after:w-5 
          after:transition-all
          transition-colors
          ${checked ? "bg-blue-600" : "bg-gray-200"}
        `}
      ></div>
    </label>
  );
};

const EditCategoryModal = ({ isOpen, onClose, category, onUpdateSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setTitle(category.title || "");
      setDescription(category.description || "");
      setStatus(category.status || false);
    }
  }, [category]);

  // Thêm hàm fetchUpdatedCategory để lấy dữ liệu mới nhất
  const fetchUpdatedCategory = async (categoryId) => {
    try {
      const response = await api.get(`/api/CategoryService/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin danh mục:", error);
      throw error;
    }
  };

  const updateCategory = async () => {
    if (!title.trim()) {
      setError("Tiêu đề không được để trống");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Update category info
      await api.put(`/api/CategoryService/update/${category.id}`, {
        title: title.trim(),
        description: description.trim(),
      });

      // Update category status
      await api.put(`/api/CategoryService/updateStatus/${category.id}`, {
        status: status,
      });

      // Fetch updated category data
      const updatedCategory = await fetchUpdatedCategory(category.id);

      // Call the success callback with fresh data
      onUpdateSuccess && onUpdateSuccess(updatedCategory);

      // Show success message (optional)
      console.log("Cập nhật danh mục thành công!");

      // Close modal
      onClose();
    } catch (error) {
      console.error("Lỗi cập nhật danh mục:", error);
      setError(
        error.response?.data?.message ||
          "Không thể cập nhật danh mục. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setError("");
    if (category) {
      setTitle(category.title || "");
      setDescription(category.description || "");
      setStatus(category.status || false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        style={{
          backgroundColor: theme.colors.background.secondary,
          color: theme.colors.text.primary,
        }}
      >
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <Edit
              style={{ color: theme.colors.primary.DEFAULT }}
              className="h-6 w-6"
            />
            <DialogTitle style={{ color: theme.colors.text.primary }}>
              Chỉnh Sửa Danh Mục
            </DialogTitle>
          </div>
          <DialogDescription style={{ color: theme.colors.text.secondary }}>
            Cập nhật thông tin cho danh mục dịch vụ
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title" style={{ color: theme.colors.text.primary }}>
              Tiêu Đề
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề danh mục"
              style={{
                backgroundColor: theme.colors.background.primary,
                borderColor: theme.colors.primary.light,
                color: theme.colors.text.primary,
              }}
            />
          </div>

          <div>
            <Label
              htmlFor="description"
              style={{ color: theme.colors.text.primary }}
            >
              Mô Tả
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả danh mục"
              style={{
                backgroundColor: theme.colors.background.primary,
                borderColor: theme.colors.primary.light,
                color: theme.colors.text.primary,
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Label style={{ color: theme.colors.text.primary }}>
                Trạng Thái
              </Label>
              <span
                style={{ color: theme.colors.text.secondary }}
                className="text-sm"
              >
                ({status ? "Hoạt động" : "Ngừng hoạt động"})
              </span>
            </div>
            <CustomSwitch checked={status} onChange={setStatus} />
          </div>

          {error && (
            <div
              className="text-red-500 text-sm"
              style={{ color: theme.colors.error }}
            >
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            style={{
              color: theme.colors.text.secondary,
              borderColor: theme.colors.primary.light,
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={updateCategory}
            disabled={isLoading}
            style={{
              backgroundColor: theme.colors.primary.DEFAULT,
              color: "white",
            }}
          >
            {isLoading ? "Đang Cập Nhật..." : "Lưu Thay Đổi"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
