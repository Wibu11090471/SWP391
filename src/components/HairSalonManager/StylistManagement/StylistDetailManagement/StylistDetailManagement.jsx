import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import { Card, CardContent, CardHeader } from "../../../../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../../../ui/avatar";
import {
  AtSign,
  CalendarCheck,
  UserCheck,
  MapPin,
  Gift,
  UserIcon,
  MoreVertical,
  UserCircle2,
} from "lucide-react";
import { useParams } from "react-router-dom";
import theme from "../../../../theme";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StylistDetailManagement = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [stylist, setStylist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const api = axios.create({
    baseURL: "https://localhost:7081",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    const fetchStylistDetails = async () => {
      try {
        const response = await api.get("/api/User/getAllUsers");
        const stylistMember = response.data.find(
          (user) => user.id === parseInt(id) && user.role === "stylist"
        );
        if (stylistMember) setStylist(stylistMember);
        else setError(new Error("Nhân viên không tồn tại"));
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching stylist details:", err);
        setError(err);
        setIsLoading(false);
      }
    };
    fetchStylistDetails();
  }, [id]);

  const handleSoftDelete = async () => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn dừng hoạt động tài khoản này?"
    );
    if (!isConfirmed) return;

    try {
      await api.put(`/api/User/sorfDelete/${id}`);
      toast.success("Đã ngưng tài khoản thành công!");
      setStylist((prev) => ({ ...prev, status: false }));
    } catch (error) {
      console.error("Error performing soft delete:", error);
      toast.error("ngưng tài khoản thất bại!");
    }
  };

  const handleActivateAccount = async () => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn kích hoạt tài khoản này?"
    );
    if (!isConfirmed) return;

    try {
      await api.put(`/api/User/activeAccount/${id}`);
      toast.success("Kích hoạt tài khoản thành công!");
      setStylist((prev) => ({ ...prev, status: true }));
    } catch (error) {
      console.error("Error activating account:", error);
      toast.error("Kích hoạt tài khoản thất bại!");
    }
  };

  if (isLoading)
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg font-semibold">Đang tải...</p>
        </div>
      </Layout>
    );

  if (error || !stylist)
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg font-semibold">
            Không tìm thấy thông tin nhân viên
          </p>
        </div>
      </Layout>
    );

  const renderProfileTab = () => (
    <div className="space-y-4 text-sm">
      {[
        {
          icon: AtSign,
          label: "Email",
          value: stylist.email || "Chưa cập nhật",
        },
        {
          icon: UserCircle2,
          label: "Username",
          value: stylist.userName || "Chưa cập nhật",
        },
        {
          icon: MapPin,
          label: "Địa chỉ",
          value: stylist.address || "Chưa cập nhật",
        },
        {
          icon: Gift,
          label: "Ngày sinh",
          value: stylist.dob
            ? new Date(stylist.dob).toLocaleDateString("vi-VN")
            : "Chưa cập nhật",
        },
        {
          icon: CalendarCheck,
          label: "Ngày bắt đầu",
          value: stylist.createdOn
            ? new Date(stylist.createdOn).toLocaleDateString("vi-VN")
            : "Chưa cập nhật",
        },
        {
          icon: UserCheck,
          label: "Trạng thái",
          value: stylist.status ? "Đang hoạt động" : "Ngưng hoạt động",
        },
      ].map(({ icon: Icon, label, value }, index) => (
        <div
          key={index}
          className="flex items-center p-4 rounded-lg bg-gray-100 hover:shadow-lg"
        >
          <Icon
            className="text-lg mr-4"
            style={{ color: theme.colors.primary.light }}
          />
          <div>
            <p className="font-medium">{label}</p>
            <p className="text-gray-700">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Layout>
      <div
        className="min-h-screen pt-24 px-4 sm:px-8"
        style={{
          backgroundColor: theme.colors.background.primary,
          color: theme.colors.text.primary,
        }}
      >
        <Card
          className="max-w-4xl mx-auto shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 "
          style={{
            backgroundColor: theme.colors.background.secondary,
            borderColor: theme.colors.primary.DEFAULT,
          }}
        >
          <CardHeader className="border-b flex items-center p-6 relative">
            <Avatar className="h-28 w-28 shadow-lg border-4 border-primary">
              <AvatarImage src="" />
              <AvatarFallback
                style={{ backgroundColor: theme.colors.primary.light }}
                className="text-lg"
              >
                {stylist.fullName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-6 space-y-2">
              <h2 className="text-3xl font-bold">{stylist.fullName}</h2>
              <p className="text-sm flex items-center">
                <UserIcon
                  className="mr-2"
                  size={16}
                  style={{ color: theme.colors.primary.light }}
                />
                {stylist.role || "Chưa xác định"}
              </p>
            </div>

            <div className="absolute right-6 top-6">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-600 hover:text-gray-800"
              >
                <MoreVertical size={24} />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 transition-opacity duration-200">
                  <button
                    onClick={handleSoftDelete}
                    className="block px-4 py-2 text-left text-red-600 hover:bg-red-100 w-full"
                  >
                    Tạm dừng
                  </button>
                  <button
                    onClick={handleActivateAccount}
                    className="block px-4 py-2 text-left text-green-600 hover:bg-green-100 w-full"
                  >
                    Kích hoạt
                  </button>
                </div>
              )}
            </div>
          </CardHeader>
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-center py-3 ${
                activeTab === "profile" ? "border-b-2" : "hover:bg-gray-100"
              }`}
              style={{
                borderBottomColor:
                  activeTab === "profile"
                    ? theme.colors.primary.DEFAULT
                    : "transparent",
              }}
            >
              Thông Tin Cá Nhân
            </button>
          </div>

          <CardContent className="p-6">{renderProfileTab()}</CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StylistDetailManagement;
