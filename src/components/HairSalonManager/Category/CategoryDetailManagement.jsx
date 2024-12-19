import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { ArrowLeft, Box, PlusCircle, Edit } from "lucide-react";
import theme from "../../../theme";
import Layout from "../Layout";
import AddServiceModal from "./AddServiceModal";
import AddImageModal from "./AddImageModal";
import EditServiceModal from "./EditServiceModal";
import ServiceDetailModal from "./ServiceDetailModal";

const api = axios.create({
  baseURL: "https://localhost:7081",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const CategoryDetailManagement = () => {
  const [services, setServices] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditService, setCurrentEditService] = useState(null);
  const [currentEditImages, setCurrentEditImages] = useState([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);

  const { categoryId } = useParams();
  const navigate = useNavigate();

  // Fetch services for specific category
  const fetchCategoryServices = async () => {
    try {
      const response = await api.get(
        `/api/Service/getAllServicesByCategoryId?categoryId=${categoryId}`
      );

      // Với mỗi service, fetch thêm chi tiết để lấy images
      const servicesWithImages = await Promise.all(
        response.data.map(async (service) => {
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
            images: detailResponse.data.images || [], // Lấy images từ API detail
          };
        })
      );

      setServices(servicesWithImages);

      if (response.data.length > 0) {
        setCategoryTitle(response.data[0].categoryService.title);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching category services:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryServices();
  }, [categoryId]);

  const handleServiceAdded = (services) => {
    // If services is an array, it means we received updated service list
    if (Array.isArray(services)) {
      setServices(services);
    } else {
      // Handle single service addition (backwards compatibility)
      setServices((prevServices) => [
        ...prevServices,
        {
          serviceEnity: {
            id: services.id || services.serviceId,
            title: services.title,
            description: services.description,
            price: services.price,
            discount: services.discount,
            timeService: services.timeService,
            status: services.status ?? true,
            categoryService: services.categoryService || {
              id: categoryId,
              title: categoryTitle,
            },
          },
          images: [],
        },
      ]);
    }
    setIsAddServiceModalOpen(false);
  };

  const fetchServiceDetail = async (serviceId) => {
    try {
      const response = await api.get(`/api/Service/detail/${serviceId}`);
      setSelectedServiceDetail(response.data);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error("Error fetching service detail:", error);
    }
  };

  // Open edit modal for a service
  const openEditModal = (service) => {
    setCurrentEditService(service.serviceEnity);
    setCurrentEditImages(service.images || []);
    setIsEditModalOpen(true);
  };

  const handleImageAdded = () => {
    fetchCategoryServices(); // Refresh the services list
    setIsAddImageModalOpen(false);
    setCurrentServiceId(null);
  };

  const handleGoBack = () => {
    navigate("/category-management");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (isLoading) {
    return (
      <Layout>
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: theme.colors.background.primary }}
        >
          <p>Đang tải...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: theme.colors.background.primary }}
        >
          <p>Đã có lỗi xảy ra: {error.message}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="min-h-screen pt-24 pl-5 pr-5"
        style={{
          backgroundColor: theme.colors.background.primary,
          color: theme.colors.text.primary,
        }}
      >
        <Card
          className="shadow-xl"
          style={{
            backgroundColor: theme.colors.background.secondary,
            borderColor: theme.colors.primary.DEFAULT,
          }}
        >
          <CardHeader
            className="border-b flex items-center justify-between"
            style={{
              backgroundColor: theme.colors.secondary.light,
              borderBottomColor: theme.colors.primary.dark,
            }}
          >
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleGoBack} className="mr-4">
                <ArrowLeft
                  style={{ color: theme.colors.primary.DEFAULT }}
                  className="h-6 w-6"
                />
              </Button>
              <Box
                style={{ color: theme.colors.primary.DEFAULT }}
                className="h-8 w-8"
              />
              <CardTitle
                className="text-2xl font-bold"
                style={{ color: theme.colors.text.primary }}
              >
                Dịch Vụ Danh Mục: {categoryTitle}
              </CardTitle>
              <Button
                onClick={() => setIsAddServiceModalOpen(true)}
                className="flex items-center"
                style={{
                  backgroundColor: theme.colors.primary.DEFAULT,
                  color: "white",
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Thêm Dịch Vụ
              </Button>
            </div>
          </CardHeader>

          <CardContent
            className="p-6"
            style={{ backgroundColor: theme.colors.background.primary }}
          >
            {services.length === 0 ? (
              <div className="text-center">
                Không có dịch vụ nào trong danh mục này
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service, index) => (
                  <div
                    key={service.serviceEnity.id || `service-${index}`}
                    className="relative p-4 border rounded shadow cursor-pointer hover:shadow-lg transition-shadow"
                    style={{
                      backgroundColor: theme.colors.background.secondary,
                      borderColor: theme.colors.primary.light,
                    }}
                    onClick={() => fetchServiceDetail(service.serviceEnity.id)}
                  >
                    {service.images && service.images.length > 0 && (
                      <img
                        src={
                          [...service.images].sort((a, b) => b.id - a.id)[0].url
                        }
                        alt={service.serviceEnity.title}
                        className="w-full h-48 object-cover rounded mb-4"
                      />
                    )}
                    <h3 className="text-lg font-bold">
                      {service.serviceEnity.title}
                    </h3>
                    <p className="text-sm mb-2">
                      {service.serviceEnity.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold">
                        {formatPrice(service.serviceEnity.price)}
                      </p>
                      <p className="text-xs">
                        Thời gian: {service.serviceEnity.timeService * 60} phút
                      </p>
                    </div>
                    <p className="text-xs mt-2">
                      {service.serviceEnity.status
                        ? "Hoạt động"
                        : "Ngừng hoạt động"}
                    </p>
                    <button
                      onClick={(event) => {
                        event.stopPropagation(); // Ngăn sự kiện 'onClick' của thẻ cha
                        openEditModal(service);
                      }}
                      className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded"
                    >
                      <Edit className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AddServiceModal
        categoryId={categoryId}
        isOpen={isAddServiceModalOpen}
        onClose={() => setIsAddServiceModalOpen(false)}
        onServiceCreated={handleServiceAdded}
      />

      <AddImageModal
        serviceId={currentServiceId}
        isOpen={isAddImageModalOpen}
        onClose={() => {
          setIsAddImageModalOpen(false);
          setCurrentServiceId(null);
        }}
        onImageAdded={handleImageAdded}
      />
      {isEditModalOpen && currentEditService && (
        <EditServiceModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          currentService={currentEditService}
          currentImages={currentEditImages}
          onUpdateSuccess={fetchCategoryServices}
          // Pass this to refresh the list after updates
        />
      )}
      <ServiceDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        serviceDetail={selectedServiceDetail}
      />
    </Layout>
  );
};

export default CategoryDetailManagement;
