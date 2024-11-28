import React from 'react';
import { Link } from "react-router-dom";

const Statistics = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-9 mt-6 w-full min-h-screen">
      <div
        className="stylish-detail container mx-auto p-6"
        style={{ paddingTop: "50px" }}
      >
        <Link to="/dashboard">
          <button className="bg-[#8B4513] text-white px-8 py-2 rounded-md mt-4">
            Quay về Dashboard
          </button>
        </Link>
      </div>

      <div className="w-full bg-white shadow-lg rounded-lg p-9">
        <h1 className="text-2xl font-bold mb-6 flex justify-center items-center">
          Thống Kê
        </h1>
        <div className="space-y-4 ">
          {" "}
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-center items-center">
            <p className="text-lg">Hiện tại không có thống kê mới.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-center items-center">
            <p className="text-lg">Hiện tại không có thống kê mới.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-center items-center">
            <p className="text-lg">Hiện tại không có thống kê mới.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-center items-center">
            <p className="text-lg">Hiện tại không có thống kê mới.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-center items-center">
            <p className="text-lg">Hiện tại không có thống kê mới.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-center items-center">
            <p className="text-lg">Hiện tại không có thống kê mới.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-center items-center">
            <p className="text-lg">Hiện tại không có thống kê mới.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-center items-center">
            <p className="text-lg">Hiện tại không có thống kê mới.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-center items-center">
            <p className="text-lg">Hiện tại không có thống kê mới.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-center items-center">
            <p className="text-lg">Hiện tại không có thống kê mới.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
