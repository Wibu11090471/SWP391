import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data (with increased revenue range)
const stylistsData = [
  { name: "Minh Tuấn", revenue: 500 },
  { name: "Lan Phương", revenue: 3500 },
  { name: "Việt Anh", revenue: 2500 },
  { name: "Hương Giang", revenue: 7000 },
  { name: "Quang Minh", revenue: 200 },
  { name: "Mai Ly", revenue: 4500 },
  { name: "Đức Trọng", revenue: 6000 },
  { name: "Thảo Linh", revenue: 350 },
  { name: "Minh Khang", revenue: 8000 },
  { name: "Phương Anh", revenue: 1500 },
];

// Find highest and lowest earning stylists
const highestStylist = stylistsData.reduce((prev, current) =>
  current.revenue > prev.revenue ? current : prev
);
const lowestStylist = stylistsData.reduce((prev, current) =>
  current.revenue < prev.revenue ? current : prev
);

const totalRevenue = stylistsData.reduce(
  (sum, stylist) => sum + stylist.revenue,
  0
);

const Statistics = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-9 mt-6 w-full min-h-screen">
      <div
        className="stylish-detail container mx-auto p-6"
        // style={{ paddingTop: "50px" }}
      >
        <Link to="/hairsalon-staff">
          <button className="bg-[#8B4513] text-white px-8 py-2 rounded-md mt-4">
            Quay về Dashboard
          </button>
        </Link>
      </div>

      <div className="container mx-auto mt-10" style={{paddingBottom:"10px"}}>
        <h1 className="text-3xl font-bold mb-6 text-center">Thống Kê Stylist</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Highest Revenue */}
          <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold mb-2">Stylist Doanh Thu Cao Nhất</h2>
            <p className="text-lg">
              <strong>{highestStylist.name}</strong>:{" "}
              <span className="text-green-600">
                ${highestStylist.revenue.toLocaleString()}
              </span>
            </p>
          </div>

          {/* Lowest Revenue */}
          <div className="bg-red-100 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold mb-2">Stylist Doanh Thu Thấp Nhất</h2>
            <p className="text-lg">
              <strong>{lowestStylist.name}</strong>:{" "}
              <span className="text-red-600">
                ${lowestStylist.revenue.toLocaleString()}
              </span>
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md mt-6 text-center">
          <h2 className="text-xl font-bold mb-2">Tổng Doanh Thu Tháng Này</h2>
          <p className="text-2xl text-blue-600 font-semibold">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>

        {/* Revenue Bar Chart */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4 text-center">Biểu Đồ Doanh Thu</h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={stylistsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#8B4513" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
