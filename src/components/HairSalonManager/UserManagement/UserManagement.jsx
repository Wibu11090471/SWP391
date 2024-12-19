import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Input } from "../../../ui/input";
import { Search, Users } from "lucide-react";
import theme from "../../../theme";
import Layout from "../Layout";

// Import the components
import UserCard from "./components/UserCard";

// Axios configuration
const api = axios.create({
  baseURL: "https://localhost:7081",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const UserManagement = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // New state for role update confirmation

  // Fetch user data from API
  const fetchUser = async () => {
    try {
      const response = await api.get("/api/User/getAllUsers");
      const userData = response.data.filter((user) => user.role === "user");
      setUser(userData);
      setFilteredUser(userData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // New function to handle user detail navigation
  const navigateToUserDetail = (userId) => {
    navigate(`/user-detail/${userId}`);
  };

  // Search/Filter user
  const removeAccents = (str) =>
    str
      .normalize("NFD") // Chuyển đổi sang dạng Unicode tổ hợp
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
      .toLowerCase(); // Chuyển về chữ thường

  // Search/Filter staff
  useEffect(() => {
    const filtered = user.filter((member) =>
      removeAccents(member.fullName).includes(removeAccents(searchTerm))
    );
    setFilteredUser(filtered);
  }, [searchTerm, user]);

  // Function to open role update confirmation dialog

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
          className="shadow-xl"
          style={{
            backgroundColor: theme.colors.background.secondary,
            borderColor: theme.colors.primary.DEFAULT,
          }}
        >
          <CardHeader
            className="border-b"
            style={{
              backgroundColor: theme.colors.secondary.light,
              borderBottomColor: theme.colors.primary.dark,
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-4">
                  <Users
                    style={{ color: theme.colors.primary.DEFAULT }}
                    className="h-8 w-8"
                  />
                  <CardTitle
                    className="text-2xl font-bold"
                    style={{ color: theme.colors.text.primary }}
                  >
                    Quản Lý Users Salon
                  </CardTitle>
                </div>
                <p
                  className="text-sm ml-12"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Quản lý thông tin người dùng của salon
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: theme.colors.primary.dark }}
                  />
                  <Input
                    placeholder="Tìm kiếm User..."
                    className="pl-10 w-64 shadow-sm"
                    style={{
                      borderColor: theme.colors.primary.light,
                      backgroundColor: theme.colors.background.primary,
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          {/* User List Section */}
          <CardContent
            className="p-6"
            style={{ backgroundColor: theme.colors.background.primary }}
          >
            {isLoading ? (
              <div className="text-center">Đang tải...</div>
            ) : filteredUser.length === 0 ? (
              <div className="text-center">Không có người dùng nào</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUser.map((member) => (
                  <div
                    key={member.id || crypto.randomUUID()}
                    className="relative"
                  >
                    <UserCard
                      member={{
                        id: member.id,
                        userName: member.email || "Chưa cập nhật",
                        fullName: member.fullName || "Không rõ",
                        role: member.role || "User",
                        status: member.status || false,
                        avatar: "",
                      }}
                      navigateToUserDetail={navigateToUserDetail}
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Role Update Confirmation Dialog */}
      </div>
    </Layout>
  );
};

export default UserManagement;
