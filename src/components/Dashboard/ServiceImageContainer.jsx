import React, { useEffect, useState } from "react";
import CreateService from "./AppointmentManagement/ServiceImageContainer/CreateService";
import CreateImage from "./AppointmentManagement/ServiceImageContainer/CreateImage";
import axios from "axios";
import UpdateService from "./AppointmentManagement/ServiceImageContainer/UpdateService";

const createApiInstance = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "https://localhost:7081",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

const ServiceImageContainer = () => {
  const [service, setService] = useState([]);
  const [categories, setCategory] = useState([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [addImageServiceId, setAddImageServiceId] = useState("");
  const [updateService, setUpdateService] = useState({});

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const apiInstance = createApiInstance();
      try {
        const bookingResponse = await apiInstance.get(
          `/api/Service/getAllService?page=${currentPage}&pageSize=${pageSize}`
        );
        setService(bookingResponse.data.items);
        const totalItems = bookingResponse.data.totalCount || 0;
        setTotalPages(Math.ceil(totalItems / pageSize));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  useEffect(() => {
    const fetchData = async () => {
      const apiInstance = createApiInstance();
      try {
        const bookingResponse = await apiInstance.get(
          "/api/CategoryService/getActive"
        );
        setCategory(bookingResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const HandleAddImage = (service) => {
    setIsImageModalOpen(true);
    setAddImageServiceId(service.id);
  };

  const HandleUpdateService = (service) => {
    setIsUpdateModalOpen(true);
    setUpdateService(service);
  };

  const HandleChangeStatus = (service) => {
    service.status = !service.status;
    const apiInstance = createApiInstance();
    apiInstance
      .put(`/api/Service/update-all/${service.id}`, service)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="min-h-screen flex bg-[#FDF5E6] pt-20">
        {/* Sidebar */}
        <div className="sidebar w-1/4 bg-gray-800 text-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-8 pl-3 text-yellow-400">
            Dashboard
          </h2>
          <ul>
            <li>
              <a
                href="/selectedField"
                className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
              >
                Lịch hẹn
              </a>
            </li>
            <li>
              <a
                href="/addserviceimage"
                className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
              >
                Thêm dịch vụ
              </a>
            </li>
            <li>
              <a
                href="/addCategoryService"
                className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
              >
                Thêm loại dịch vụ
              </a>
            </li>
            <li>
              <a
                href="/history"
                className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
              >
                Lịch sử giao dịch
              </a>
            </li>
            <li>
              <a
                href="/statistics"
                className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
              >
                Thống kê
              </a>
            </li>
            <li>
              <a
                href="/stylistcommission"
                className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
              >
                Quản Lý Thu Nhập Stylist
              </a>
            </li>
          </ul>
        </div>

        {/* Main Container */}
        <div className="main-container flex-1">
          <div className="main-container flex-1 p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Services</h1>

            {/* Controls row */}
            <div className="flex justify-between mb-4">
              <div className="flex items-center">
                <span className="mr-2">Hiển thị:</span>
                <select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className="px-2 py-1 border rounded"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="ml-2">dịch vụ mỗi trang</span>
              </div>
              <button
                onClick={() => setIsServiceModalOpen(true)}
                className="px-6 py-2 rounded-lg transition-all duration-300 bg-[#8B4513] text-white"
              >
                Tạo Dịch Vụ
              </button>
            </div>

            {/* Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#FAEBD7]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                      Thể Loại
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                      Dịch vụ
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                      Giá
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                      Thời Gian
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                      Mô tả
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {service.map((s, index) => (
                    <tr key={index}>
                      <td className="border p-3">{s.categoryService.title}</td>
                      <td className="border p-3">{s.title}</td>
                      <td className="border p-3">{s.price}</td>
                      <td className="border p-3">{s.timeService}</td>
                      <td className="border p-3">
                        {s.discount ? s.discount : "0"}
                      </td>
                      <td className="border p-3 w-[250px]">{s.description}</td>
                      <td className="border p-3 text-green-500 font-semibold">
                        {s.status ? (
                          <button
                            onClick={() => HandleChangeStatus(s)}
                            className="px-3 py-2 rounded-lg transition-all duration-300 bg-[#FFF0E1] text-green-500 hover:bg-[#e89248]"
                          >
                            Active
                          </button>
                        ) : (
                          <button
                            onClick={() => HandleChangeStatus(s)}
                            className="px-3 py-2 rounded-lg transition-all duration-300 bg-[#FFF0E1] text-[#5D4037] hover:bg-[#e89248]"
                          >
                            InActive
                          </button>
                        )}
                      </td>
                      <td className="border p-2 w-[250px] font-semibold">
                        <button
                          onClick={() => HandleAddImage(s)}
                          className="px-3 py-2 mr-2 rounded-lg transition-all duration-300 bg-[#FFF0E1] text-[#5D4037] hover:bg-[#e89248]"
                        >
                          Thêm Ảnh
                        </button>
                        <button
                          onClick={() => HandleUpdateService(s)}
                          className="px-3 py-2 rounded-lg transition-all duration-300 bg-[#FFF0E1] text-[#5D4037] hover:bg-[#e89248]"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            <div className="mt-4 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-[#8B4513] text-white disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded ${
                      currentPage === page
                        ? "bg-[#8B4513] text-white"
                        : "bg-[#FFF0E1] text-[#5D4037]"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-[#8B4513] text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <CreateService
            categories={categories}
            onclose={() => setIsServiceModalOpen(false)}
          />
        </div>
      )}

      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <CreateImage
            initialServiceId={addImageServiceId}
            onclose={() => setIsImageModalOpen(false)}
          />
        </div>
      )}

      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <UpdateService
            service={updateService}
            onclose={() => setIsUpdateModalOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default ServiceImageContainer;
