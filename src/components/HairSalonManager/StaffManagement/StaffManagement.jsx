import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../../../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../ui/alert-dialog";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import {
  Pencil,
  Trash2,
  UserPlus,
  Search,
  Users,
  Calendar,
  Phone,
  Mail,
  X,
} from "lucide-react";
import { Badge } from "../../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import theme from "../../../theme";
import Layout from "../Layout";

const StaffManagement = () => {
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
    setSelectedStaff(null); // Reset selected staff
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
                    Quản Lý Nhân Viên Salon
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
                    placeholder="Tìm kiếm nhân viên..."
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
                  <UserPlus className="mr-2" /> Thêm Nhân Viên
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
                <Card
                  key={member.id}
                  className="hover:shadow-lg transition-shadow"
                  style={{
                    backgroundColor: theme.colors.background.secondary,
                    borderColor: theme.colors.primary.light,
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback
                          style={{
                            backgroundColor: theme.colors.primary.light,
                            color: theme.colors.background.primary,
                          }}
                        >
                          {member.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center">
                          <h3
                            className="text-lg font-semibold"
                            style={{ color: theme.colors.text.primary }}
                          >
                            {member.name}
                          </h3>
                          <Badge
                            style={{
                              backgroundColor:
                                member.status === "active"
                                  ? theme.colors.accent.DEFAULT
                                  : theme.colors.secondary.dark,
                              color: theme.colors.background.primary,
                            }}
                          >
                            {member.status === "active"
                              ? "Đang Làm"
                              : "Nghỉ Việc"}
                          </Badge>
                        </div>
                        <div
                          className="text-sm space-y-1"
                          style={{ color: theme.colors.text.secondary }}
                        >
                          <div className="flex items-center">
                            <Phone
                              className="h-4 w-4 mr-2"
                              style={{ color: theme.colors.primary.light }}
                            />
                            {member.phone}
                          </div>
                          <div className="flex items-center">
                            <Mail
                              className="h-4 w-4 mr-2"
                              style={{ color: theme.colors.primary.light }}
                            />
                            {member.email}
                          </div>
                          <div className="flex items-center">
                            <Calendar
                              className="h-4 w-4 mr-2"
                              style={{ color: theme.colors.primary.light }}
                            />
                            {member.hireDate}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditDialog(member)}
                        style={{
                          borderColor: theme.colors.primary.light,
                          color: theme.colors.primary.DEFAULT,
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => openDeleteDialog(member)}
                        style={{
                          backgroundColor: theme.colors.secondary.dark,
                          color: theme.colors.background.primary,
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dialog cho việc thêm/chỉnh sửa nhân viên */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            className="sm:max-w-[600px]"
            style={{
              backgroundColor: theme.colors.background.primary,
              borderColor: theme.colors.primary.light,
            }}
          >
            <DialogHeader>
              <DialogTitle
                style={{
                  color: theme.colors.text.primary,
                }}
              >
                {isAddMode
                  ? "Thêm Nhân Viên Mới"
                  : "Chỉnh Sửa Thông Tin Nhân Viên"}
              </DialogTitle>
              <DialogDescription
                style={{
                  color: theme.colors.text.secondary,
                }}
              >
                {isAddMode
                  ? "Nhập thông tin cho nhân viên mới"
                  : "Cập nhật thông tin cho nhân viên đã chọn"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Name Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="name"
                  className="text-right"
                  style={{ color: theme.colors.text.primary }}
                >
                  Tên Nhân Viên
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Nhập tên nhân viên"
                  style={{
                    borderColor: theme.colors.primary.light,
                    backgroundColor: theme.colors.background.primary,
                  }}
                />
              </div>

              {/* Position Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="position"
                  className="text-right"
                  style={{ color: theme.colors.text.primary }}
                >
                  Chức Vụ
                </Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Nhập chức vụ"
                  style={{
                    borderColor: theme.colors.primary.light,
                    backgroundColor: theme.colors.background.primary,
                  }}
                />
              </div>

              {/* Phone Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="phone"
                  className="text-right"
                  style={{ color: theme.colors.text.primary }}
                >
                  Số Điện Thoại
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Nhập số điện thoại"
                  style={{
                    borderColor: theme.colors.primary.light,
                    backgroundColor: theme.colors.background.primary,
                  }}
                />
              </div>

              {/* Email Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="hireDate"
                  className="text-right"
                  style={{ color: theme.colors.text.primary }}
                >
                  Ngày Bắt Đầu
                </Label>
                <Input
                  id="hireDate"
                  name="hireDate"
                  type="date"
                  value={formData.hireDate}
                  onChange={handleInputChange}
                  className="col-span-3"
                  style={{
                    borderColor: theme.colors.primary.light,
                    backgroundColor: theme.colors.background.primary,
                  }}
                />
              </div>

              {/* Status Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="status"
                  className="text-right"
                  style={{ color: theme.colors.text.primary }}
                >
                  Trạng Thái
                </Label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="col-span-3 p-2 border rounded"
                  style={{
                    borderColor: theme.colors.primary.light,
                    backgroundColor: theme.colors.background.primary,
                    color: theme.colors.text.primary,
                  }}
                >
                  <option value="active">Đang Làm</option>
                  <option value="inactive">Nghỉ Việc</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                style={{
                  borderColor: theme.colors.primary.dark,
                  color: theme.colors.text.primary,
                }}
              >
                <X className="mr-2 h-4 w-4" /> Hủy
              </Button>
              <Button
                onClick={isAddMode ? handleAddStaff : handleUpdateStaff}
                style={{
                  backgroundColor: theme.colors.primary.DEFAULT,
                  color: theme.colors.background.primary,
                }}
              >
                {isAddMode ? "Thêm Nhân Viên" : "Cập Nhật"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* AlertDialog cho việc xóa nhân viên */}
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
                Xác Nhận Xóa Nhân Viên
              </AlertDialogTitle>
              <AlertDialogDescription
                style={{
                  color: theme.colors.text.secondary,
                }}
              >
                Bạn có chắc chắn muốn xóa nhân viên{" "}
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
