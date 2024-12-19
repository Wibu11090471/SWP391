import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  UserCheck,
  Users,
  Scissors,
  Star,
  ChevronRight,
  Layers,
  Grid,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import Layout from "../Layout";
import CustomerChart from "../OverView/CustomerChart/CustomerChart";

const api = axios.create({
  baseURL: "https://localhost:7081",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const OverviewDashboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [userData, setUserData] = useState({
    staff: [],
    stylist: [],
    user: [],
    service: null,
  });

  const [serviceData, setServiceData] = useState({
    services: [],
    totalServices: 0,
  });

  const [categoryData, setCategoryData] = useState([]);

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      const response = await api.get("/api/User/getAllUsers");
      const filteredUsers = response.data.filter(
        (user) => user.role === "user"
      );
      setUserData({
        staff: response.data.filter((user) => user.role === "staff"),
        stylist: response.data.filter((user) => user.role === "stylist"),
        user: filteredUsers,
        service: null,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchServiceData = async () => {
    try {
      const response = await api.get("/api/Service/getAll");
      setServiceData({
        services: response.data.items,
        totalServices: response.data.totalCount,
      });
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const response = await api.get("/api/CategoryService/getAll");
      setCategoryData(response.data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchServiceData();
    fetchCategoryData();
  }, []);

  // Reusable Section Preview Card Component
  const SectionPreviewCard = ({
    icon: Icon,
    title,
    data,
    description,
    buttonText,
    onViewDetail,
  }) => (
    <Card
      className="bg-[#FAEBD7] rounded-lg shadow-lg p-6 hover:shadow-xl 
      transition-all duration-300 cursor-pointer group"
      onClick={onViewDetail}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Icon className="text-[#8B4513] mr-3" size={32} />
          <h3 className="text-xl font-semibold text-[#3E2723]">{title}</h3>
        </div>
        <ChevronRight
          className="text-[#8B4513] opacity-0 group-hover:opacity-100 
          transition-opacity duration-300"
          size={24}
        />
      </div>
      <div className="space-y-2">
        {data.map((item, index) => (
          <p key={index} className="text-[#3E2723]">
            {item}
          </p>
        ))}
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
    </Card>
  );

  // Navigation handlers
  const handleViewStylists = () => navigate("/stylist-management");
  const handleViewStaff = () => navigate("/staff-management");
  const handleViewCustomers = () => navigate("/user-management");
  const handleViewServices = () => navigate("/service-management");
  const handleViewCategories = () => navigate("/category-management");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 bg-[#FDF5E6] pt-24">
        <h1 className="text-4xl font-bold text-center mb-12 text-[#3E2723]">
          Tổng Quan Salon
        </h1>

        {/* Preview Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Customers */}
          <SectionPreviewCard
            icon={Users}
            title="Quản Lý Khách Hàng"
            data={[
              `Tổng số khách: ${userData.user.length}`,
              `Đang hoạt động: ${
                userData.user.filter((user) => user.status).length
              } / Ngưng hoạt động: ${
                userData.user.filter((user) => !user.status).length
              }`,
            ]}
            description="Nhấn để quản lý khách hàng"
            buttonText="Quản Lý"
            onViewDetail={handleViewCustomers}
          />

          {/* Staff */}
          <SectionPreviewCard
            icon={UserCheck}
            title="Quản Lý Nhân Viên"
            data={[
              `Tổng số nhân viên: ${userData.staff.length}`,
              `Đang hoạt động: ${
                userData.staff.filter((staff) => staff.status).length
              } / Ngưng hoạt động: ${
                userData.staff.filter((staff) => !staff.status).length
              }`,
            ]}
            description="Nhấn để quản lý đội ngũ nhân viên"
            buttonText="Quản Lý"
            onViewDetail={handleViewStaff}
          />

          {/* Stylist */}
          <SectionPreviewCard
            icon={Scissors}
            title="Quản Lý Stylist"
            data={[
              `Tổng số stylist: ${userData.stylist.length}`,
              `Đang hoạt động: ${
                userData.stylist.filter((stylist) => stylist.status).length
              } / Ngưng hoạt động: ${
                userData.stylist.filter((stylist) => !stylist.status).length
              }`,
            ]}
            description="Nhấn để quản lý danh sách stylist"
            buttonText="Quản Lý"
            onViewDetail={handleViewStylists}
          />

          {/* Categories */}
          <SectionPreviewCard
            icon={Grid}
            title="Quản Lý Danh Mục"
            data={[
              `Tổng số danh mục: ${categoryData.length}`,
              `Đang hoạt động: ${
                categoryData.filter((category) => category.status).length
              } / Ngưng hoạt động: ${
                categoryData.filter((category) => !category.status).length
              }`,
            ]}
            description="Nhấn để quản lý danh mục dịch vụ"
            buttonText="Quản Lý"
            onViewDetail={handleViewCategories}
          />
        </div>

        {/* Charts Section */}
        <div className="mt-10 bg-[#FAEBD7] rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-[#3E2723] mb-4">
            Thống Kê Khách Hàng
          </h2>
          <div className="w-full overflow-hidden">
            <CustomerChart />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OverviewDashboard;
