import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Search, Users, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../ui/dialog";
import theme from "../../../theme";
import Layout from "../Layout";

// Import the components
import StylistCard from "./components/StylistCard";

// Axios configuration
const api = axios.create({
  baseURL: "https://localhost:7081",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const StylistManagement = () => {
  const navigate = useNavigate();
  const [stylist, setStylist] = useState([]);
  const [filteredStylist, setFilteredStylist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // New state for role update confirmation
  const [selectedStylistForRoleUpdate, setSelectedStylistForRoleUpdate] =
    useState(null);
  const [isRoleUpdateDialogOpen, setIsRoleUpdateDialogOpen] = useState(false);

  // Fetch stylist data from API
  const fetchStylist = async () => {
    try {
      const response = await api.get("/api/User/getAllUsers");
      const stylistData = response.data.filter(
        (user) => user.role === "stylist"
      );
      setStylist(stylistData);
      setFilteredStylist(stylistData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching stylist:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStylist();
  }, []);

  // New function to handle stylist role update
  const handleUpdateStylistRole = async () => {
    if (!selectedStylistForRoleUpdate) return;

    try {
      // Update user role to staff (roleId: 1)
      await api.put("/api/User/updateUserRole", {
        userId: selectedStylistForRoleUpdate.id,
        roleId: 3, // Staff role
      });

      // Refresh stylist list
      await fetchStylist();

      // Close dialog and reset selection
      setIsRoleUpdateDialogOpen(false);
      setSelectedStylistForRoleUpdate(null);
    } catch (error) {
      console.error("Error updating stylist role:", error);
      // Optionally, add error handling toast or notification
      alert("Không thể thay đổi vai trò. Vui lòng thử lại.");
    }
  };

  // New function to handle stylist detail navigation
  const navigateToStylistDetail = (stylistId) => {
    navigate(`/stylist-detail/${stylistId}`);
  };

  // Search/Filter stylist
  const removeAccents = (str) =>
    str
      .normalize("NFD") // Chuyển đổi sang dạng Unicode tổ hợp
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
      .toLowerCase(); // Chuyển về chữ thường

  // Search/Filter staff
  useEffect(() => {
    const filtered = stylist.filter((member) =>
      removeAccents(member.fullName).includes(removeAccents(searchTerm))
    );
    setFilteredStylist(filtered);
  }, [searchTerm, stylist]);

  // Function to open role update confirmation dialog
  const openRoleUpdateConfirmation = (member) => {
    setSelectedStylistForRoleUpdate(member);
    setIsRoleUpdateDialogOpen(true);
  };

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
                    Quản Lý Stylist Salon
                  </CardTitle>
                </div>
                <p
                  className="text-sm ml-12"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Quản lý thông tin nhân sự của salon
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: theme.colors.primary.dark }}
                  />
                  <Input
                    placeholder="Tìm kiếm Stylist..."
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

          {/* Stylist List Section */}
          <CardContent
            className="p-6"
            style={{ backgroundColor: theme.colors.background.primary }}
          >
            {isLoading ? (
              <div className="text-center">Đang tải...</div>
            ) : filteredStylist.length === 0 ? (
              <div className="text-center">Không có nhân viên nào</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStylist.map((member) => (
                  <div
                    key={member.id || crypto.randomUUID()}
                    className="relative"
                  >
                    <StylistCard
                      member={{
                        id: member.id,
                        userName: member.email || "Chưa cập nhật",
                        fullName: member.fullName || "Không rõ",
                        role: member.role || "Stylist",
                        status: member.status || false,
                        avatar: "",
                      }}
                      navigateToStylistDetail={navigateToStylistDetail}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => openRoleUpdateConfirmation(member)}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" /> Chuyển Vai Trò
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Role Update Confirmation Dialog */}
        <Dialog
          open={isRoleUpdateDialogOpen}
          onOpenChange={setIsRoleUpdateDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Xác Nhận Chuyển Vai Trò</DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn chuyển vai trò của nhân viên{" "}
                <strong>{selectedStylistForRoleUpdate?.fullName}</strong> từ
                Stylist sang Staff không?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setIsRoleUpdateDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                onClick={handleUpdateStylistRole}
                style={{
                  backgroundColor: theme.colors.primary.DEFAULT,
                  color: theme.colors.background.primary,
                }}
              >
                Xác Nhận
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default StylistManagement;
