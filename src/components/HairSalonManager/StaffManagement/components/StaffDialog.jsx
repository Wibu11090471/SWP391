import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../../ui/dialog";
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Label } from "../../../../ui/label";
import { X } from "lucide-react";
import theme from "../../../../theme";
import axios from "axios";

const StaffDialog = ({ isDialogOpen, setIsDialogOpen, onAddSuccess }) => {
  // Initialize form data for new staff
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: "",
    email: "",
    gender: true,
    dob: "",
    address: "",
  });

  // State to track errors
  const [errors, setErrors] = useState({});

  // Axios configuration
  const api = axios.create({
    baseURL: "https://localhost:7081",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gender" ? value === "true" : value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = "Tên đầy đủ là bắt buộc.";
    } else if (!/^[\p{L}\s]+$/u.test(formData.fullName)) {
      newErrors.fullName = "Tên không hợp lệ.";
    }
    if (!formData.userName) {
      newErrors.userName = "Tên đăng nhập là bắt buộc.";
    } else if (formData.userName.includes(" ")) {
      newErrors.userName = "Tên đăng nhập không được chứa khoảng trắng.";
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }
    if (!formData.email) {
      newErrors.email = "Email là bắt buộc.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (!formData.dob) newErrors.dob = "Ngày sinh là bắt buộc.";
    if (!formData.address) newErrors.address = "Địa chỉ là bắt buộc.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle staff creation
  const handleAddStaff = async () => {
    if (!validateForm()) return; // Stop if validation fails

    try {
      const data = {
        ...formData,
        dob: formData.dob ? new Date(formData.dob).toISOString() : null,
      };
      await api.post("/api/User/register-staff", data);
      alert("Thêm mới nhân viên thành công!");
      setIsDialogOpen(false);
      onAddSuccess();
    } catch (error) {
      console.error("Error:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent
        className="sm:max-w-[600px]"
        style={{
          backgroundColor: theme.colors.background.primary,
          borderColor: theme.colors.primary.light,
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: theme.colors.text.primary }}>
            Thêm Nhân Viên Mới
          </DialogTitle>
          <DialogDescription style={{ color: theme.colors.text.secondary }}>
            Nhập thông tin cho nhân viên mới
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Full Name Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="fullName"
              className="text-right"
              style={{ color: theme.colors.text.primary }}
            >
              Tên Đầy Đủ
            </Label>
            <div className="col-span-3">
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Nhập tên đầy đủ"
                style={{
                  borderColor: theme.colors.primary.light,
                  backgroundColor: theme.colors.background.primary,
                }}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
          </div>

          {/* Username Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="userName"
              className="text-right"
              style={{ color: theme.colors.text.primary }}
            >
              Tên Đăng Nhập
            </Label>
            <div className="col-span-3">
              <Input
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="Nhập tên đăng nhập"
                style={{
                  borderColor: theme.colors.primary.light,
                  backgroundColor: theme.colors.background.primary,
                }}
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
              )}
            </div>
          </div>

          {/* Password Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="password"
              className="text-right"
              style={{ color: theme.colors.text.primary }}
            >
              Mật Khẩu
            </Label>
            <div className="col-span-3">
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu"
                style={{
                  borderColor: theme.colors.primary.light,
                  backgroundColor: theme.colors.background.primary,
                }}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Email Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="email"
              className="text-right"
              style={{ color: theme.colors.text.primary }}
            >
              Email
            </Label>
            <div className="col-span-3">
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Nhập email"
                style={{
                  borderColor: theme.colors.primary.light,
                  backgroundColor: theme.colors.background.primary,
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Gender Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="gender"
              className="text-right"
              style={{ color: theme.colors.text.primary }}
            >
              Giới Tính
            </Label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="col-span-3 p-2 border rounded"
              style={{
                borderColor: theme.colors.primary.light,
                backgroundColor: theme.colors.background.primary,
                color: theme.colors.text.primary,
              }}
            >
              <option value={true}>Nam</option>
              <option value={false}>Nữ</option>
            </select>
          </div>

          {/* Date of Birth Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="dob"
              className="text-right"
              style={{ color: theme.colors.text.primary }}
            >
              Ngày Sinh
            </Label>
            <div className="col-span-3">
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
                style={{
                  borderColor: theme.colors.primary.light,
                  backgroundColor: theme.colors.background.primary,
                }}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>
          </div>

          {/* Address Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="address"
              className="text-right"
              style={{ color: theme.colors.text.primary }}
            >
              Địa Chỉ
            </Label>
            <div className="col-span-3">
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Nhập địa chỉ"
                style={{
                  borderColor: theme.colors.primary.light,
                  backgroundColor: theme.colors.background.primary,
                }}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
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
            onClick={handleAddStaff}
            style={{
              backgroundColor: theme.colors.primary.DEFAULT,
              color: theme.colors.background.primary,
            }}
          >
            Thêm Nhân Viên
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StaffDialog;
