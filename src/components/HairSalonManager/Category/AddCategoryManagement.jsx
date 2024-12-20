import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";
import { PlusCircle, Folder } from "lucide-react";
import theme from "../../../theme";
import Layout from "../Layout";

// Axios configuration
const api = axios.create({
  baseURL: "https://localhost:7081",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const AddCategoryManagement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title.trim()) {
      setAlertInfo({
        show: true,
        message: "Tên danh mục không được để trống",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    setAlertInfo({ show: false, message: "", type: "" });

    try {
      // Prepare payload
      const payload = {
        title: title.trim(),
        description: description.trim() || "",
      };

      // Send POST request to add category
      await api.post("/api/CategoryService/add", payload);

      // Show success alert
      setAlertInfo({
        show: true,
        message: "Thêm danh mục thành công!",
        type: "success",
      });

      // Reset form
      setTitle("");
      setDescription("");

      // Navigate after delay
      setTimeout(() => {
        navigate("/category-management");
      }, 1500);
    } catch (error) {
      console.error("Error adding category:", error);

      // Check if there's a specific error message from the server
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Đã có lỗi xảy ra khi thêm danh mục";

      setAlertInfo({
        show: true,
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel and return to category management
  const handleCancel = () => {
    navigate("/category-management");
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
          className="shadow-xl max-w-2xl mx-auto"
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
            <div className="flex items-center space-x-4">
              <Folder
                style={{ color: theme.colors.primary.DEFAULT }}
                className="h-8 w-8"
              />
              <CardTitle
                className="text-2xl font-bold"
                style={{ color: theme.colors.text.primary }}
              >
                Thêm Danh Mục Mới
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {alertInfo.show && (
              <Alert
                className={`mb-6 ${
                  alertInfo.type === "success"
                    ? "bg-green-50 border-green-500"
                    : "bg-red-50 border-red-500"
                }`}
                style={{
                  borderWidth: "1px",
                }}
              >
                <AlertTitle
                  className={
                    alertInfo.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }
                >
                  {alertInfo.type === "success" ? "Thành công!" : "Lỗi!"}
                </AlertTitle>
                <AlertDescription
                  className={
                    alertInfo.type === "success"
                      ? "text-green-700"
                      : "text-red-700"
                  }
                >
                  {alertInfo.message}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.text.primary }}
                >
                  Tên Danh Mục <span className="text-red-500">*</span>
                </label>
                <Input
                  id="title"
                  placeholder="Nhập tên danh mục"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                  style={{
                    borderColor: theme.colors.primary.light,
                    backgroundColor: theme.colors.background.primary,
                  }}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.text.primary }}
                >
                  Mô Tả
                </label>
                <Input
                  id="description"
                  placeholder="Nhập mô tả danh mục (tùy chọn)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full"
                  style={{
                    borderColor: theme.colors.primary.light,
                    backgroundColor: theme.colors.background.primary,
                  }}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  style={{
                    borderColor: theme.colors.primary.light,
                  }}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center"
                  style={{
                    backgroundColor: theme.colors.primary.DEFAULT,
                    color: "white",
                  }}
                >
                  {isSubmitting ? (
                    <>Đang lưu...</>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Thêm Danh Mục
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddCategoryManagement;
