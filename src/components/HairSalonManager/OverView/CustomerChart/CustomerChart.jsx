import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../ui/card";
import { Users, UserCheck, Scissors, Sparkles } from "lucide-react";
import axios from "axios";

const CustomerChart = () => {
  const [userData, setUserData] = useState({
    staff: [],
    stylist: [],
    user: [],
  });

  // Axios configuration
  const api = axios.create({
    baseURL: "https://localhost:7081",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

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
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Customer data based on fetched user data
  const customerData = [
    {
      name: "Khách Hàng",
      value: userData.user.length,
      color: "#D8BD0D",
      icon: Users,
    },
    {
      name: "Nhân Viên",
      value: userData.staff.length,
      color: "#8B4513",
      icon: UserCheck,
    },
    {
      name: "Stylist",
      value: userData.stylist.length,
      color: "#DAA520",
      icon: Scissors,
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-[#FFF5E1] to-[#FFE4B5] border-2 border-[#DEB887] shadow-2xl">
      <CardHeader className="border-b-2 border-[#DEB887] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="h-6 w-6 text-[#D2691E] mr-3" />
            <CardTitle className="text-xl font-bold text-[#8B4513]">
              Phân Bổ Nhân Sự
              {` Năm ${new Date().getFullYear()}`}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-[#5D4037]">
              <Users className="h-5 w-5 mr-2" />
              <span className="font-semibold">
                Tổng:{" "}
                {userData.user.length +
                  userData.staff.length +
                  userData.stylist.length}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={customerData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent, value }) =>
                `${name} ${value} (${(percent * 100).toFixed(0)}%)`
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
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
              formatter={(value, name) => [
                `${value.toLocaleString()} người`,
                name,
              ]}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              formatter={(value, entry) => (
                <span className="text-[#5D4037]">{value}</span>
              )}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CustomerChart;
