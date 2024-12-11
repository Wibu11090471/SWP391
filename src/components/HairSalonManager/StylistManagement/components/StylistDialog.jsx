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

const StylistDialog = ({ isDialogOpen, setIsDialogOpen, onAddSuccess }) => {
  // Initialize form data for new stylist
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: "",
    email: "",
    gender: true,
    dob: "",
    address: "",
  });

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

  // Handle stylist creation
  const handleAddStylist = async () => {
    try {
      // Validate required fields
      if (
        !formData.fullName ||
        !formData.userName ||
        !formData.password ||
        !formData.email
      ) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      // Prepare data for API
      const data = {
        ...formData,
        dob: formData.dob ? new Date(formData.dob).toISOString() : null,
      };

      // Call API to create new stylist
      await api.post("/api/User/register-stylist", data);
      alert("Thêm mới nhân viên thành công!");

      // Close dialog and refresh list
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
          <DialogTitle
            style={{
              color: theme.colors.text.primary,
            }}
          >
            Thêm Nhân Viên Mới
          </DialogTitle>
          <DialogDescription
            style={{
              color: theme.colors.text.secondary,
            }}
          >
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
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Nhập tên đầy đủ"
              style={{
                borderColor: theme.colors.primary.light,
                backgroundColor: theme.colors.background.primary,
              }}
            />
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
            <Input
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Nhập tên đăng nhập"
              style={{
                borderColor: theme.colors.primary.light,
                backgroundColor: theme.colors.background.primary,
              }}
            />
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
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Nhập mật khẩu"
              style={{
                borderColor: theme.colors.primary.light,
                backgroundColor: theme.colors.background.primary,
              }}
            />
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
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Nhập email"
              style={{
                borderColor: theme.colors.primary.light,
                backgroundColor: theme.colors.background.primary,
              }}
            />
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
            <Input
              id="dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleInputChange}
              className="col-span-3"
              style={{
                borderColor: theme.colors.primary.light,
                backgroundColor: theme.colors.background.primary,
              }}
            />
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
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Nhập địa chỉ"
              style={{
                borderColor: theme.colors.primary.light,
                backgroundColor: theme.colors.background.primary,
              }}
            />
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
            onClick={handleAddStylist}
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

export default StylistDialog;
