import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import { format } from "date-fns";
import theme from "../../../theme";

const ServiceDetailModal = ({ isOpen, onClose, serviceDetail }) => {
  if (!serviceDetail) return null;

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Lấy hình ảnh mới nhất theo ID
  const getLatestImage = (images) => {
    if (!images || images.length === 0) return null;
    return [...images].sort((a, b) => b.id - a.id)[0];
  };

  const latestImage = getLatestImage(serviceDetail.images);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-3xl shadow-xl rounded-lg"
        style={{
          backgroundColor: theme.colors.background.primary,
          color: theme.colors.text.primary,
        }}
      >
        <DialogHeader
          className="border-b pb-4"
          style={{
            backgroundColor: theme.colors.background.secondary,
            borderBottomColor: theme.colors.primary.dark,
          }}
        >
          <DialogTitle
            className="text-2xl font-bold"
            style={{ color: theme.colors.text.primary }}
          >
            Chi tiết dịch vụ
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            aria-label="Close"
          >
            ✕
          </button>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div>
            {latestImage && (
              <img
                src={latestImage.url}
                alt={serviceDetail.service.title}
                className="w-full h-64 object-cover rounded"
                style={{
                  border: `1px solid ${theme.colors.primary.light}`,
                }}
              />
            )}
          </div>
          <div className="space-y-4">
            <h2
              className="text-xl font-bold"
              style={{ color: theme.colors.text.primary }}
            >
              {serviceDetail.service.title}
            </h2>
            <p
              className="text-sm"
              style={{ color: theme.colors.text.secondary }}
            >
              {serviceDetail.service.description}
            </p>
            <div className="space-y-2">
              <p>
                <span
                  className="font-semibold"
                  style={{ color: theme.colors.text.primary }}
                >
                  Giá:
                </span>{" "}
                {formatPrice(serviceDetail.service.price)}
              </p>
              <p>
                <span
                  className="font-semibold"
                  style={{ color: theme.colors.text.primary }}
                >
                  Giảm giá
                </span>{" "}
                {serviceDetail.service.discount} %
              </p>
              <p>
                <span
                  className="font-semibold"
                  style={{ color: theme.colors.text.primary }}
                >
                  Thời gian:
                </span>{" "}
                {serviceDetail.service.timeService * 60} phút
              </p>
              <p>
                <span
                  className="font-semibold"
                  style={{ color: theme.colors.text.primary }}
                >
                  Trạng thái:
                </span>{" "}
                {serviceDetail.service.status ? "Hoạt động" : "Ngừng hoạt động"}
              </p>
              <p>
                <span
                  className="font-semibold"
                  style={{ color: theme.colors.text.primary }}
                >
                  Danh mục:
                </span>{" "}
                {serviceDetail.service.categoryService.title}
              </p>
              <p>
                <span
                  className="font-semibold"
                  style={{ color: theme.colors.text.primary }}
                >
                  Ngày tạo:
                </span>{" "}
                {formatDate(serviceDetail.service.createdOn)}
              </p>
              <p>
                <span
                  className="font-semibold"
                  style={{ color: theme.colors.text.primary }}
                >
                  Cập nhật lần cuối:
                </span>{" "}
                {formatDate(serviceDetail.service.updatedOn)}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
