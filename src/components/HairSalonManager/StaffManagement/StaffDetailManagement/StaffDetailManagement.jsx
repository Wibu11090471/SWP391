import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import { Card, CardContent, CardHeader } from "../../../../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../../../ui/avatar";
import {
  UserCircle2,
  Smartphone,
  AtSign,
  CalendarCheck,
  UserCheck,
  MapPin,
  Gift,
  UserIcon,
} from "lucide-react";
import { useParams } from "react-router-dom";
import theme from "../../../../theme";
import { Button } from "../../../../ui/button";
import axios from "axios";

const StaffDetailManagement = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [staff, setStaff] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Axios configuration
  const api = axios.create({
    baseURL: "https://localhost:7081",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // Fetch staff details
  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await api.get("/api/User/getAllUsers");
        const staffMember = response.data.find(
          (user) => user.id === parseInt(id) && user.role === "staff"
        );

        if (staffMember) {
          setStaff(staffMember);
        } else {
          setError(new Error("Nhân viên không tồn tại"));
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching staff details:", err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchStaffDetails();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          Đang tải...
        </div>
      </Layout>
    );
  }

  if (error || !staff) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          Không tìm thấy thông tin nhân viên
        </div>
      </Layout>
    );
  }

  const renderProfileTab = () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <AtSign
          className="mr-4"
          style={{ color: theme.colors.primary.light }}
        />
        <span>Email: {staff.email || "Chưa cập nhật"}</span>
      </div>
      <div className="flex items-center">
        <MapPin
          className="mr-4"
          style={{ color: theme.colors.primary.light }}
        />
        <span>Địa chỉ: {staff.address || "Chưa cập nhật"}</span>
      </div>
      <div className="flex items-center">
        <Gift className="mr-4" style={{ color: theme.colors.primary.light }} />
        <span>
          Ngày sinh:{" "}
          {staff.dob
            ? new Date(staff.dob).toLocaleDateString("vi-VN")
            : "Chưa cập nhật"}
        </span>
      </div>
      <div className="flex items-center">
        <CalendarCheck
          className="mr-4"
          style={{ color: theme.colors.primary.light }}
        />
        <span>
          Ngày bắt đầu:{" "}
          {staff.createdOn
            ? new Date(staff.createdOn).toLocaleDateString("vi-VN")
            : "Chưa cập nhật"}
        </span>
      </div>
      <div className="flex items-center">
        <UserCheck
          className="mr-4"
          style={{ color: theme.colors.primary.light }}
        />
        <span>Trạng thái: {staff.status ? "Đang làm việc" : "Nghỉ việc"}</span>
      </div>
      <div className="flex items-center">
        <UserIcon
          className="mr-4"
          style={{ color: theme.colors.primary.light }}
        />
        <span>Tên đăng nhập: {staff.userName || "Chưa cập nhật"}</span>
      </div>
    </div>
  );

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
          className="max-w-3xl mx-auto shadow-xl"
          style={{
            backgroundColor: theme.colors.background.secondary,
            borderColor: theme.colors.primary.DEFAULT,
          }}
        >
          <CardHeader
            className="border-b flex items-center space-x-4 p-6"
            style={{
              backgroundColor: theme.colors.secondary.light,
              borderBottomColor: theme.colors.primary.dark,
            }}
          >
            <Avatar className="h-24 w-24">
              <AvatarImage src="" />
              <AvatarFallback
                style={{
                  backgroundColor: theme.colors.primary.light,
                  color: theme.colors.background.primary,
                }}
              >
                {staff.fullName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2
                className="text-2xl font-bold"
                style={{ color: theme.colors.text.primary }}
              >
                {staff.fullName}
              </h2>
              <p
                className="text-sm flex items-center"
                style={{ color: theme.colors.text.secondary }}
              >
                <UserIcon
                  className="mr-2"
                  size={16}
                  style={{ color: theme.colors.primary.light }}
                />
                {staff.role || "Chưa xác định"}
              </p>
            </div>
          </CardHeader>

          <div className="flex border-b">
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              onClick={() => setActiveTab("profile")}
              className="w-full"
            >
              Thông Tin Cá Nhân
            </Button>
          </div>

          <CardContent className="p-6">{renderProfileTab()}</CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StaffDetailManagement;
