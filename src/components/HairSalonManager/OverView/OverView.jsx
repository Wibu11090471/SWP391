import React, { useState } from "react";
import {
  DollarSign,
  Users,
  Scissors,
  UserCheck,
  Star,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import Layout from "../Layout";
import RevenueChart from "../Revenue/RevenueChart/RevenueChart";
import CustomerChart from "../OverView/CustomerChart/CustomerChart";

const OverviewDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  // Comprehensive business overview data
  const overviewData = {
    revenue: {
      totalThisMonth: 45000000,
      comparison: "+12%",
    },
    stylists: {
      total: 10,
      active: 8,
    },
    appointments: {
      total: 436,
      completed: 389,
      pending: 32,
    },
    staff: {
      total: 15,
      newThisMonth: 2,
    },
    customers: {
      total: 1245,
      membership: {
        silver: 678,
        gold: 423,
        platinum: 144,
      },
    },
  };

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

  // Navigation handlers (placeholder for future implementation)
  const handleViewRevenue = () => {
    console.log("Chuyển sang trang Doanh Thu");
  };

  const handleViewStylists = () => {
    console.log("Chuyển sang trang Quản Lý Stylist");
  };

  const handleViewStaff = () => {
    console.log("Chuyển sang trang Quản Lý Nhân Viên");
  };

  const handleViewCustomers = () => {
    console.log("Chuyển sang trang Quản Lý Khách Hàng");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 bg-[#FDF5E6] pt-24">
        <h1 className="text-4xl font-bold text-center mb-12 text-[#3E2723]">
          Tổng Quan Kinh Doanh
        </h1>

        {/* Preview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue Preview Card */}
          <SectionPreviewCard
            icon={DollarSign}
            title="Doanh Thu"
            data={[
              `Tháng này: ${overviewData.revenue.totalThisMonth.toLocaleString()} VND`,
              `So với tháng trước: ${overviewData.revenue.comparison}`,
            ]}
            description="Nhấn để xem chi tiết báo cáo doanh thu"
            buttonText="Xem Chi Tiết"
            onViewDetail={handleViewRevenue}
          />

          {/* Stylists Preview Card */}
          <SectionPreviewCard
            icon={Scissors}
            title="Quản Lý Stylist"
            data={[
              `Tổng số: ${overviewData.stylists.total} Stylist`,
              `Đang hoạt động: ${overviewData.stylists.active} Stylist`,
            ]}
            description="Nhấn để quản lý danh sách stylist"
            buttonText="Quản Lý"
            onViewDetail={handleViewStylists}
          />

          {/* Staff Preview Card */}
          <SectionPreviewCard
            icon={UserCheck}
            title="Quản Lý Nhân Viên"
            data={[
              `Tổng số nhân viên: ${overviewData.staff.total}`,
              `Nhân viên mới: ${overviewData.staff.newThisMonth}`,
            ]}
            description="Nhấn để quản lý đội ngũ nhân viên"
            buttonText="Quản Lý"
            onViewDetail={handleViewStaff}
          />

          {/* Customers Preview Card */}
          <SectionPreviewCard
            icon={Users}
            title="Quản Lý Khách Hàng"
            data={[
              `Tổng số khách: ${overviewData.customers.total}`,
              `Silver: ${overviewData.customers.membership.silver}`,
              `Gold: ${overviewData.customers.membership.gold}`,
              `Platinum: ${overviewData.customers.membership.platinum}`,
            ]}
            description="Nhấn để quản lý khách hàng và membership"
            buttonText="Quản Lý"
            onViewDetail={handleViewCustomers}
          />
        </div>

        {/* Charts Section */}
        <div className="flex space-x-6 mt-6">
          {/* Revenue Chart Section */}
          <div className="w-1/2">
            {/* Period Toggle */}
            <div className="flex justify-center mb-4">
              <div className="bg-[#FAEBD7] rounded-lg p-1 flex shadow-md">
                <button
                  onClick={() => setSelectedPeriod("monthly")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedPeriod === "monthly"
                      ? "bg-[#8B4513] text-[#FDF5E6]"
                      : "text-[#5D4037] hover:bg-[#915C38]/10"
                  }`}
                >
                  Theo Tháng
                </button>
                <button
                  onClick={() => setSelectedPeriod("daily")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedPeriod === "daily"
                      ? "bg-[#8B4513] text-[#FDF5E6]"
                      : "text-[#5D4037] hover:bg-[#915C38]/10"
                  }`}
                >
                  Theo Ngày
                </button>
              </div>
            </div>

            <RevenueChart selectedPeriod={selectedPeriod} />
          </div>

          {/* Customer Chart Section */}
          <div className="w-1/2">
            <CustomerChart />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OverviewDashboard;
