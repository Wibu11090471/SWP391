import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { X, Check, X as XClose } from "lucide-react";

const createApiInstance = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "https://localhost:7081",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token} ` }),
    },
  });
};

const TransactionDetailModal = ({
  transaction,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[80vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-8 border-b">
          <h2 className="text-2xl font-bold text-center">Chi tiết giao dịch</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <XClose size={24} />
          </button>
        </div>

        {/* Transaction Details */}
        <div className="p-6 ">
          <div className="grid grid-cols-2 gap-4 p-8 border-b pt-4">
            <div className="mr-8">
              {" "}
              {/* Thêm margin phải */}
              <h3 className="font-bold">Thông tin giao dịch</h3>
              <p>ID: {transaction.id}</p>
              <p>Ghi chú: {transaction.note}</p>
              <p>Trạng thái: {transaction.status ? "Hoạt động" : "Đã hủy"}</p>
            </div>

            <div className="ml-8">
              {" "}
              {/* Thêm margin trái */}
              <h3 className="font-bold">Stylist</h3>
              <p>Tên: {transaction.stylist?.fullName || "N/A"}</p>
              {/* <p>Tên đăng nhập: {transaction.stylist?.userName || "N/A"}</p> */}
            </div>

            <div className="mr-8">
              {" "}
              {/* Thêm margin phải */}
              <h3 className="font-bold">Lịch hẹn</h3>
              <p>Thời gian: {transaction.booking?.startTime || "N/A"}</p>
              <p>Trạng thái: {transaction.booking?.status || "N/A"}</p>
            </div>

            <div className="ml-8">
              {" "}
              {/* Thêm margin trái */}
              <h3 className="font-bold">Người tạo</h3>
              <p>Tên: {transaction.createdBy?.fullName || "N/A"}</p>
              <p>Tên đăng nhập: {transaction.createdBy?.userName || "N/A"}</p>
            </div>
          </div>

          {/* Approve/Reject Buttons */}
          <div className="mt-6 flex justify-center space-x-12">
            <button
              onClick={() => onApprove(transaction.id)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-green-600 transition"
            >
              <Check className="mr-2" /> Phê duyệt
            </button>

            <button
              onClick={() => onReject(transaction.id)}
              className="bg-red-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-red-600 transition"
            >
              <X className="mr-2" /> Từ chối
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardSalonStaff = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const api = createApiInstance();
      try {
        const response = await api.get("/api/PaymentTransaction/GetAll");
        setTransactions(response.data.paymentTransactions || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        if (error.response?.status === 401) {
          console.error("Unauthorized: Please check your token.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleApprove = async (transactionId) => {
    const api = createApiInstance();
    try {
      // Replace with your actual API endpoint for approving a transaction
      await api.post(`/api/PaymentTransaction/Approve/${transactionId}`);

      // Update local state to reflect the change
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === transactionId
            ? {
                ...t,
                status: true,
                booking: { ...t.booking, status: "Approved" },
              }
            : t
        )
      );

      setSelectedTransaction(null);
    } catch (error) {
      console.error("Error approving transaction:", error);
    }
  };

  const handleReject = async (transactionId) => {
    const api = createApiInstance();
    try {
      // Replace with your actual API endpoint for rejecting a transaction
      await api.post(`/api/PaymentTransaction/Reject/${transactionId}`);

      // Update local state to reflect the change
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === transactionId
            ? {
                ...t,
                status: false,
                booking: { ...t.booking, status: "Rejected" },
              }
            : t
        )
      );

      setSelectedTransaction(null);
    } catch (error) {
      console.error("Error rejecting transaction:", error);
    }
  };

  return (
    <div className="dashboard-container flex" style={{ paddingTop: "80px" }}>
      {/* Sidebar (unchanged from previous version) */}
      <div className="sidebar w-1/4 bg-gray-800 text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-center text-yellow-400">
          Dashboard
        </h2>
        <ul>
          <li>
            <Link
              to="/hairsalon-staff"
              className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
            >
              Lịch hẹn
            </Link>
          </li>
          <li>
            <Link
              to="/notifications"
              className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
            >
              Thông báo
            </Link>
          </li>
          <li>
            <Link
              to="/statistics"
              className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
            >
              Thống kê
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className="main-content flex-1 ml-12 p-6"
        style={{ minHeight: "calc(100vh - 100px)" }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Danh sách giao dịch
        </h2>

        {loading ? (
          <p className="text-center text-lg">Đang tải dữ liệu...</p>
        ) : transactions.length === 0 ? (
          <p className="text-center text-lg">Không có giao dịch nào.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                onClick={() => setSelectedTransaction(transaction)}
                className="transaction-card bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition"
              >
                <h4 className="text-xl font-semibold">
                  Giao dịch ID: {transaction.id}
                </h4>
                <p className="text-gray-600">Ghi chú: {transaction.note}</p>
                <div className="mt-2">
                  <h5 className="font-bold">Trạng thái:</h5>
                  <p>{transaction.status ? "Hoạt động" : "Đã hủy"}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <TransactionDetailModal
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardSalonStaff;
