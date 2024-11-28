import React, { useState, useMemo } from "react";
import { Users, DollarSign, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import Layout from "../Layout";
import RevenueChart from "./RevenueChart/RevenueChart";

const Revenue = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  // Generate dynamic data based on current date
  const generateMonthlyData = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return Array.from({ length: currentMonth + 1 }, (_, index) => ({
      name: new Date(currentYear, index).toLocaleString("default", {
        month: "short",
      }),
      revenue: Math.floor(Math.random() * 20000 + 40000),
      customers: Math.floor(Math.random() * 50 + 100),
    }));
  };

  const generateDailyData = () => {
    const currentDate = new Date();

    return Array.from({ length: currentDate.getDate() }, (_, index) => ({
      name: `${index + 1}`,
      revenue: Math.floor(Math.random() * 2000 + 4000),
      customers: Math.floor(Math.random() * 10 + 20),
    }));
  };

  // Calculate data and metrics dynamically
  const currentData = useMemo(
    () =>
      selectedPeriod === "monthly"
        ? generateMonthlyData()
        : generateDailyData(),
    [selectedPeriod]
  );

  const totalRevenue = useMemo(
    () => currentData.reduce((sum, item) => sum + item.revenue, 0),
    [currentData]
  );

  const totalCustomers = useMemo(
    () => currentData.reduce((sum, item) => sum + item.customers, 0),
    [currentData]
  );

  const averageRevenuePerCustomer = useMemo(
    () => totalRevenue / totalCustomers || 0,
    [totalRevenue, totalCustomers]
  );

  return (
    <Layout>
      <div className="bg-[#FDF5E6] text-[#3E2723] p-4 min-h-screen pt-24">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#8B4513]">
          Bảng Thống Kê Doanh Thu Salon
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Revenue Card */}
          <Card className="bg-[#FAEBD7] border-[#A0522D] shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-[#A0522D]">
              <CardTitle className="text-sm font-medium text-[#5D4037]">
                Tổng Doanh Thu
              </CardTitle>
              <DollarSign className="h-4 w-4 text-[#CD853F]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#654321]">
                {totalRevenue.toLocaleString()} VNĐ
              </div>
              <p className="text-xs text-[#5D4037]">
                Trong {selectedPeriod === "monthly" ? "năm" : "tháng"} này
              </p>
            </CardContent>
          </Card>

          {/* Total Customers Card */}
          <Card className="bg-[#FAEBD7] border-[#A0522D] shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-[#A0522D]">
              <CardTitle className="text-sm font-medium text-[#5D4037]">
                Tổng Khách Hàng
              </CardTitle>
              <Users className="h-4 w-4 text-[#CD853F]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#654321]">
                {totalCustomers}
              </div>
              <p className="text-xs text-[#5D4037]">
                Trong {selectedPeriod === "monthly" ? "năm" : "tháng"} này
              </p>
            </CardContent>
          </Card>

          {/* Average Revenue per Customer Card */}
          <Card className="bg-[#FAEBD7] border-[#A0522D] shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-[#A0522D]">
              <CardTitle className="text-sm font-medium text-[#5D4037]">
                Doanh Thu Trung Bình/KH
              </CardTitle>
              <Calendar className="h-4 w-4 text-[#CD853F]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#654321]">
                {averageRevenuePerCustomer.toLocaleString()} VNĐ
              </div>
              <p className="text-xs text-[#5D4037]">Trung bình mỗi khách</p>
            </CardContent>
          </Card>
        </div>

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

        {/* Revenue and Customer Chart */}
        <RevenueChart selectedPeriod={selectedPeriod} />
      </div>
    </Layout>
  );
};

export default Revenue;
