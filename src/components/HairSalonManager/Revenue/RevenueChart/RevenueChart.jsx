import React, { useMemo } from "react";
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

const RevenueChart = ({ selectedPeriod }) => {
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

  // Calculate data dynamically
  const currentData = useMemo(
    () =>
      selectedPeriod === "monthly"
        ? generateMonthlyData()
        : generateDailyData(),
    [selectedPeriod]
  );

  return (
    <Card className="w-full bg-[#FAEBD7] border-[#A0522D] shadow-lg">
      <CardHeader className="border-b border-[#A0522D]">CardTitle</CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F5DEB3" />
            <XAxis dataKey="name" stroke="#5D4037" />
            <YAxis yAxisId="left" stroke="#5D4037" />
            <YAxis yAxisId="right" orientation="right" stroke="#5D4037" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FDF5E6",
                borderColor: "#A0522D",
              }}
              formatter={(value, name) => [
                name === "revenue"
                  ? `${value.toLocaleString()} VNĐ` // Nếu là doanh thu, format số tiền
                  : name === "customers"
                  ? `${value} Khách` // Nếu là khách hàng, thêm chữ "Khách"
                  : value,
                name === "revenue"
                  ? "Doanh Thu"
                  : name === "customers"
                  ? "Số Khách Hàng"
                  : name,
              ]}
            />
            <Legend wrapperStyle={{ color: "#5D4037" }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#8B4513"
              activeDot={{ r: 8, fill: "#654321" }}
              name="Doanh Thu (VNĐ)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="customers"
              stroke="#DAA520"
              name="Số Khách Hàng"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
