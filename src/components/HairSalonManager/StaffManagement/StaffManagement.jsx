import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "../../../ui/alert-dialog";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Search, UserPlus, Users } from "lucide-react";
import theme from "../../../theme";
import Layout from "../Layout";

// Import the new components
import StaffCard from "./components/StaffCard";
import StaffDialog from "./components/StaffDialog";

const StaffManagement = () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      position: "Quản Lý",
      phone: "0987654321",
      email: "nguyenvana@example.com",
      hireDate: "2023-01-15",
      status: "active",
      avatar: "",
    },
    {
      id: 2,
      name: "Trần Thị B",
      position: "Quản Lý",
      phone: "0123456789",
      email: "tranthib@example.com",
      hireDate: "2022-06-20",
      status: "active",
      avatar: "",
    },
  ]);

  const [filteredStaff, setFilteredStaff] = useState(staff);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    phone: "",
    email: "",
    hireDate: "",
    status: "active",
    avatar: "",
  });

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      phone: "",
      email: "",
      hireDate: "",
      status: "active",
      avatar: "",
    });
  };

  // Handle input changes in form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // New function to handle staff detail navigation
  const navigateToStaffDetail = (staffId) => {
    navigate(`/staff-detail/${staffId}`);
  };

  // Add new staff member
  const handleAddStaff = () => {
    const newStaff = {
      ...formData,
      id: staff.length > 0 ? Math.max(...staff.map((s) => s.id)) + 1 : 1,
    };
    setStaff((prevStaff) => [...prevStaff, newStaff]);
    setFilteredStaff((prevFiltered) => [...prevFiltered, newStaff]);
    setIsDialogOpen(false);
    resetForm();
  };

  // Update existing staff member
  const handleUpdateStaff = () => {
    if (!selectedStaff) return;

    setStaff((prevStaff) =>
      prevStaff.map((member) =>
        member.id === selectedStaff.id
          ? { ...formData, id: selectedStaff.id }
          : member
      )
    );
    setFilteredStaff((prevFiltered) =>
      prevFiltered.map((member) =>
        member.id === selectedStaff.id
          ? { ...formData, id: selectedStaff.id }
          : member
      )
    );
    setIsDialogOpen(false);
    resetForm();
  };

  // Delete staff member
  const handleDeleteStaff = () => {
    setStaff((prevStaff) =>
      prevStaff.filter((member) => member.id !== selectedStaff.id)
    );
    setFilteredStaff((prevFiltered) =>
      prevFiltered.filter((member) => member.id !== selectedStaff.id)
    );
    setIsDeleteDialogOpen(false);
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (staffMember) => {
    setSelectedStaff(staffMember);
    setIsDeleteDialogOpen(true);
  };

  // Open add dialog
  const openAddDialog = () => {
    resetForm();
    setSelectedStaff(null);
    setIsAddMode(true);
    setIsDialogOpen(true);
  };

  // Open edit dialog
  const openEditDialog = (staffMember) => {
    setSelectedStaff(staffMember);
    setFormData(staffMember);
    setIsAddMode(false);
    setIsDialogOpen(true);
  };

  // Search/Filter staff
  useEffect(() => {
    const filtered = staff.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStaff(filtered);
  }, [searchTerm, staff]);

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
                    Quản Lý Staff Salon
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
                    placeholder="Tìm kiếm Staff..."
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
                  onClick={openAddDialog}
                  style={{
                    backgroundColor: theme.colors.primary.DEFAULT,
                    color: theme.colors.background.primary,
                  }}
                >
                  <UserPlus className="mr-2" /> Thêm Staff
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Staff List Section */}
          <CardContent
            className="p-6"
            style={{ backgroundColor: theme.colors.background.primary }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStaff.map((member) => (
                <StaffCard
                  key={member.id}
                  member={member}
                  navigateToStaffDetail={navigateToStaffDetail}
                  openEditDialog={openEditDialog}
                  openDeleteDialog={openDeleteDialog}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Staff Dialog Component */}
        <StaffDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          isAddMode={isAddMode}
          formData={formData}
          handleInputChange={handleInputChange}
          handleAddStaff={handleAddStaff}
          handleUpdateStaff={handleUpdateStaff}
        />

        {/* AlertDialog cho việc xóa Staff */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent
            style={{
              backgroundColor: theme.colors.background.primary,
              borderColor: theme.colors.primary.light,
            }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle
                style={{
                  color: theme.colors.text.primary,
                }}
              >
                Xác Nhận Xóa Staff
              </AlertDialogTitle>
              <AlertDialogDescription
                style={{
                  color: theme.colors.text.secondary,
                }}
              >
                Bạn có chắc chắn muốn xóa Staff{" "}
                <span style={{ fontWeight: "bold" }}>
                  {selectedStaff?.name}
                </span>
                ? Thao tác này không thể hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                style={{
                  borderColor: theme.colors.primary.light,
                  color: theme.colors.text.primary,
                }}
              >
                Hủy
              </AlertDialogCancel>
              <AlertDialogAction
                style={{
                  backgroundColor: theme.colors.secondary.dark,
                  color: theme.colors.background.primary,
                }}
                onClick={handleDeleteStaff}
              >
                Xóa
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default StaffManagement;