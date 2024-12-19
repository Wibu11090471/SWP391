import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Input } from "../../../ui/input";
import { Search, Folder, PlusCircle, Edit } from "lucide-react";
import theme from "../../../theme";
import Layout from "../Layout";
import { Button } from "../../../ui/button";
import EditCategoryModal from "./EditCategoryModal"; // New import

// Axios configuration
const api = axios.create({
  baseURL: "https://localhost:7081",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // New state for edit modal
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await api.get("/api/CategoryService/getAll");
      setCategories(response.data);
      setFilteredCategories(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories based on search
  const removeAccents = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  useEffect(() => {
    const filtered = categories.filter((category) =>
      removeAccents(category.title).includes(removeAccents(searchTerm))
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  // Open edit modal
  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  // Handle successful update
  const handleUpdateSuccess = (updatedCategory) => {
    setCategories(
      categories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
    setFilteredCategories(
      filteredCategories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
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
                  <Folder
                    style={{ color: theme.colors.primary.DEFAULT }}
                    className="h-8 w-8"
                  />
                  <CardTitle
                    className="text-2xl font-bold"
                    style={{ color: theme.colors.text.primary }}
                  >
                    Quản Lý Danh Mục
                  </CardTitle>
                </div>
                <p
                  className="text-sm ml-12"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Quản lý các danh mục dịch vụ của salon
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => navigate("/add-category")}
                  className="flex items-center"
                  style={{
                    backgroundColor: theme.colors.primary.DEFAULT,
                    color: "white",
                  }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Thêm Danh Mục
                </Button>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: theme.colors.primary.dark }}
                  />
                  <Input
                    placeholder="Tìm kiếm danh mục..."
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

          {/* Category List Section */}
          <CardContent
            className="p-6"
            style={{ backgroundColor: theme.colors.background.primary }}
          >
            {isLoading ? (
              <div className="text-center">Đang tải...</div>
            ) : filteredCategories.length === 0 ? (
              <div className="text-center">Không có danh mục nào</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCategories.map((category) => (
                  <div
                    key={category.id || crypto.randomUUID()}
                    className="relative p-4 border rounded shadow"
                    style={{
                      backgroundColor: theme.colors.background.secondary,
                      borderColor: theme.colors.primary.light,
                    }}
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(`/category-detail/${category.id}`)
                      }
                    >
                      <h3
                        className="text-lg font-bold"
                        style={{ color: theme.colors.text.primary }}
                      >
                        {category.title}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: theme.colors.text.secondary }}
                      >
                        {category.description}
                      </p>
                      <p
                        className="text-xs mt-2"
                        style={{ color: theme.colors.text.tertiary }}
                      >
                        {category.status ? "Hoạt động" : "Ngừng hoạt động"}
                      </p>
                    </div>

                    {/* Edit Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent navigating to detail
                        handleEditCategory(category);
                      }}
                    >
                      <Edit
                        className="h-4 w-4"
                        style={{ color: theme.colors.primary.DEFAULT }}
                      />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Category Modal */}
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          category={selectedCategory}
          onUpdateSuccess={handleUpdateSuccess}
        />
      </div>
    </Layout>
  );
};

export default CategoryManagement;
