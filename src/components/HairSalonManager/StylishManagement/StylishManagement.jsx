import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Search, UserPlus, Users } from "lucide-react";
import theme from "../../../theme";
import Layout from "../Layout";

// Import the components
import StylistCard from "./components/StylishCard";
import StylistDialog from "./components/StylishDialog";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  // New function to handle stylist detail navigation
  const navigateToStylistDetail = (stylistId) => {
    navigate(`/stylist-detail/${stylistId}`);
  };

  // Search/Filter stylist
  useEffect(() => {
    const filtered = stylist.filter(
      (member) =>
        member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStylist(filtered);
  }, [searchTerm, stylist]);

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
                  Quản lý thông tin và nhân sự của salon
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
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  style={{
                    backgroundColor: theme.colors.primary.DEFAULT,
                    color: theme.colors.background.primary,
                  }}
                >
                  <UserPlus className="mr-2" /> Thêm Stylist
                </Button>
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
                  <StylistCard
                    key={member.id || crypto.randomUUID()}
                    member={{
                      id: member.id,
                      userName: member.userName || "Chưa cập nhật",
                      fullName: member.fullName || "Không rõ",
                      role: member.role || "Stylist",
                      status: member.status || false,
                      avatar: "",
                    }}
                    navigateToStylistDetail={navigateToStylistDetail}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stylist Dialog */}
        <StylistDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          onAddSuccess={fetchStylist}
        />
      </div>
    </Layout>
  );
};

export default StylistManagement;
