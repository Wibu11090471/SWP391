import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../ui/card";

const CustomerChart = () => {
  // Customer data matching the overview data
  const customerData = [
    { name: "Silver", value: 678, color: "#C0C0C0" },
    { name: "Gold", value: 423, color: "#FFD700" },
    { name: "Platinum", value: 144, color: "#6A6A6A" },
  ];

  return (
    <Card className="w-full bg-[#FAEBD7] border-[#A0522D] shadow-lg pt-4">
      <CardHeader className="border-b border-[#A0522D]">
        <CardTitle className="text-[#5D4037]">
          Biểu Đồ Phân Bổ Khách Hàng
          {` Năm ${new Date().getFullYear()}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={customerData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {customerData.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#FDF5E6",
                borderColor: "#A0522D",
              }}
              formatter={(value, name) => [
                `${value.toLocaleString()} khách hàng`,
                name,
              ]}
            />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CustomerChart;
