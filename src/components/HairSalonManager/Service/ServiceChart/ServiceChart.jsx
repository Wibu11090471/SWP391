import React, { useMemo, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../ui/card";
import { TrendingUp, Users, Sparkles } from "lucide-react";
import axios from "axios";

const ServiceChart = ({ selectedPeriod = "monthly" }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7081/api/Service/getAll?page=1&pageSize=10"
        );
        setServices(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Generate data based on services
  const generateServiceData = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Group services by month of creation or last update
    const servicesByMonth = services.reduce((acc, service) => {
      const serviceMonth = service.serviceEnity.createdAt
        ? new Date(service.serviceEnity.createdAt).getMonth()
        : currentMonth;

      if (!acc[serviceMonth]) {
        acc[serviceMonth] = {
          totalServices: 0,
          totalPrice: 0,
          activeServices: 0,
        };
      }

      acc[serviceMonth].totalServices++;
      acc[serviceMonth].totalPrice += service.serviceEnity.price;
      if (service.serviceEnity.status) {
        acc[serviceMonth].activeServices++;
      }

      return acc;
    }, {});

    // Convert to chart-friendly format
    return Array.from({ length: currentMonth + 1 }, (_, index) => ({
      name: new Date(currentYear, index).toLocaleString("default", {
        month: "short",
      }),
      totalServices: servicesByMonth[index]?.totalServices || 0,
      totalPrice: servicesByMonth[index]?.totalPrice || 0,
      activeServices: servicesByMonth[index]?.activeServices || 0,
    }));
  };

  // Calculate data dynamically
  const currentData = useMemo(() => generateServiceData(), [services]);

  // Calculate totals
  const totalServices = currentData.reduce(
    (sum, item) => sum + item.totalServices,
    0
  );
  const totalActiveServices = currentData.reduce(
    (sum, item) => sum + item.activeServices,
    0
  );

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-[#FFF5E1] to-[#FFE4B5] border-2 border-[#DEB887] shadow-2xl">
        <CardHeader>
          <CardTitle>Loading Services Chart...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-gradient-to-br from-[#FFF5E1] to-[#FFE4B5] border-2 border-[#DEB887] shadow-2xl">
        <CardHeader>
          <CardTitle>Error Loading Services Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Unable to fetch service data. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-[#FFF5E1] to-[#FFE4B5] border-2 border-[#DEB887] shadow-2xl">
      <CardHeader className="border-b-2 border-[#DEB887] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="h-6 w-6 text-[#D2691E] mr-3" />
            <CardTitle className="text-xl font-bold text-[#8B4513]">
              Báo Cáo Dịch Vụ
            </CardTitle>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-[#5D4037]">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span className="font-semibold">
                {totalServices} Tổng Dịch Vụ
              </span>
            </div>
            <div className="flex items-center text-[#5D4037]">
              <Users className="h-5 w-5 mr-2" />
              <span className="font-semibold">
                {totalActiveServices} Dịch Vụ Hoạt Động
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={currentData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#F5DEB3"
              strokeOpacity={0.5}
            />
            <XAxis dataKey="name" stroke="#5D4037" tick={{ fill: "#3E2723" }} />
            <YAxis
              yAxisId="left"
              stroke="#5D4037"
              tick={{ fill: "#3E2723" }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#5D4037"
              tick={{ fill: "#3E2723" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FDF5E6",
                borderColor: "#A0522D",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
              formatter={(value, name) => [
                name === "totalServices"
                  ? `${value} Dịch Vụ`
                  : name === "totalPrice"
                  ? `${value.toLocaleString()} VNĐ`
                  : name === "activeServices"
                  ? `${value} Dịch Vụ Hoạt Động`
                  : value,
                name === "totalServices"
                  ? "Tổng Dịch Vụ"
                  : name === "totalPrice"
                  ? "Tổng Giá"
                  : name === "activeServices"
                  ? "Dịch Vụ Hoạt Động"
                  : name,
              ]}
            />
            <Legend wrapperStyle={{ color: "#5D4037" }} iconType="circle" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="totalServices"
              stroke="#8B4513"
              strokeWidth={3}
              activeDot={{
                r: 8,
                fill: "#654321",
                stroke: "#FFF5E1",
                strokeWidth: 2,
                style: { boxShadow: "0 2px 4px rgba(0,0,0,0.2)" },
              }}
              name="Tổng Dịch Vụ"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="activeServices"
              stroke="#DAA520"
              strokeWidth={3}
              name="Dịch Vụ Hoạt Động"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ServiceChart;
