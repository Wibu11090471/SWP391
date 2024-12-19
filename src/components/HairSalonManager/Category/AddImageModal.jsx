import React, { useState } from "react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { PlusCircle, X } from "lucide-react";
import axios from "axios";

const AddImageModal = ({ serviceId, isOpen, onClose }) => {
  const [imageUrl, setImageUrl] = useState("");
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

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidUrl(imageUrl)) {
      setErrors({ imageUrl: "URL không hợp lệ" });
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/Image/add", { url: imageUrl, serviceId });
      alert("Thêm ảnh thành công!");
      setImageUrl("");
      onClose();
    } catch (error) {
      alert("Lỗi khi thêm ảnh: " + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Thêm Ảnh</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              placeholder="URL hình ảnh"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm">{errors.imageUrl}</p>
            )}
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              <PlusCircle className="mr-2 h-4 w-4" />
              {loading ? "Đang xử lý..." : "Thêm Ảnh"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddImageModal;
