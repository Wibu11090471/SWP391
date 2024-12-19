import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  TrendingUp,
  Users,
  DollarSign,
  XIcon,
  InfoIcon,
  Filter,
  CheckCircle,
  CreditCard,
} from "lucide-react";
import { Badge } from "../../ui/badge";

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

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return {
        className:
          "bg-[#F5DEB3] text-[#8B4513] border-2 border-[#DEB887] font-medium",
        icon: <CheckCircle className="w-4 h-4 mr-1" />,
        text: "Đã xác nhận",
      };
    case "paid":
      return {
        className:
          "bg-[#FAEBD7] text-[#8B4513] border-2 border-[#CD853F] font-medium",
        icon: <CreditCard className="w-4 h-4 mr-1" />,
        text: "Đã thanh toán",
      };
    default:
      return {
        className:
          "bg-[#FDF5E6] text-[#3E2723] border-2 border-[#DEB887] font-medium",
        icon: null,
        text: status,
      };
  }
};

const StatusBadge = ({ status }) => {
  const { className, icon, text } = getStatusStyle(status);
  return (
    <Badge className={`flex items-center px-3 py-1 rounded-lg ${className}`}>
      {icon}
      {text}
    </Badge>
  );
};

const TransactionDetailModal = ({ transaction, onClose }) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#FDF5E6] rounded-xl shadow-2xl w-96 max-h-[80vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#5D4037] hover:text-[#3E2723]"
        >
          <XIcon size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-[#3E2723]">
          Chi Tiết Giao Dịch
        </h2>

        <div className="space-y-4">
          <div className="mb-4">
            <StatusBadge status={transaction.booking?.status} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-[#5D4037]">Dịch Vụ</p>
              <p className="font-semibold text-[#3E2723]">
                {transaction.service?.title}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#5D4037]">Tổng Tiền</p>
              <p className="font-semibold text-[#8B4513]">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(transaction.totalPrice)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-[#5D4037]">Stylist</p>
            <p className="font-semibold text-[#3E2723]">
              {transaction.stylist?.fullName}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#5D4037]">Danh Mục</p>
            <p className="font-semibold text-[#3E2723]">
              {transaction.service?.categoryService?.title}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#5D4037]">Ngày Thực Hiện</p>
            <p className="font-semibold text-[#3E2723]">
              {format(
                new Date(transaction.booking?.startTime),
                "dd/MM/yyyy HH:mm",
                {
                  locale: vi,
                }
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StylistCard = ({ stylist, transactions }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const totalAmount = transactions.reduce(
    (sum, trans) => sum + trans.totalPrice,
    0
  );

  return (
    <>
      <div className="bg-[#FDF5E6] rounded-xl shadow-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-[#FAEBD7] p-3 rounded-full">
              <Users className="text-[#8B4513]" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#3E2723]">
                {stylist.stylist.fullName}
              </h3>
              <p className="text-sm text-[#5D4037]">Stylist chuyên nghiệp</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end space-x-2">
              <DollarSign size={20} className="text-[#CD853F]" />
              <span className="text-2xl font-bold text-[#8B4513]">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalAmount)}
              </span>
            </div>
            <div className="flex items-center justify-end text-sm text-[#5D4037] mt-1">
              <TrendingUp size={16} className="mr-1" />
              <span>{transactions.length} giao dịch</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2 text-[#3E2723]">
            Các giao dịch gần đây
          </h4>
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-[#FAEBD7] p-3 rounded-lg hover:bg-[#F5DEB3] transition cursor-pointer border border-[#DEB887]"
                onClick={() => setSelectedTransaction(transaction)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-[#3E2723]">
                      {transaction.service?.title}
                    </span>
                    <div className="text-xs text-[#5D4037] mt-1">
                      {format(
                        new Date(transaction.booking?.startTime),
                        "dd/MM/yyyy HH:mm",
                        { locale: vi }
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className="font-medium text-[#8B4513]">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(transaction.totalPrice)}
                    </span>
                    <StatusBadge status={transaction.booking?.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </>
  );
};

const StylistSalary = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchTransactions = async () => {
      const api = createApiInstance();
      try {
        const response = await api.get(
          "/api/PaymentTransaction/filterByStylistAndService"
        );
        setTransactions(response.data.paymentTransactions);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải dữ liệu giao dịch");
        setLoading(false);
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, []);

  const groupTransactionsByStylist = () => {
    const filteredTransactions =
      statusFilter === "all"
        ? transactions
        : transactions.filter(
            (t) =>
              t.booking?.status?.toLowerCase() === statusFilter.toLowerCase()
          );

    const grouped = filteredTransactions.reduce((acc, transaction) => {
      const stylistId = transaction.stylist?.id;
      if (!stylistId) return acc;

      if (!acc[stylistId]) {
        acc[stylistId] = {
          stylist: transaction.stylist,
          transactions: [],
        };
      }
      acc[stylistId].transactions.push(transaction);
      return acc;
    }, {});

    const sortedStylists = Object.values(grouped).sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(b.transactions[0].booking?.startTime) -
          new Date(a.transactions[0].booking?.startTime)
        );
      }
      if (sortBy === "amount") {
        const totalA = a.transactions.reduce(
          (sum, trans) => sum + trans.totalPrice,
          0
        );
        const totalB = b.transactions.reduce(
          (sum, trans) => sum + trans.totalPrice,
          0
        );
        return totalB - totalA;
      }
      return 0;
    });

    return sortedStylists;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#FDF5E6] to-[#FAEBD7] pt-20">
      <div className="main-container flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#3E2723] flex-grow">
            Thu Nhập Stylist
          </h1>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-[#5D4037]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg text-[#3E2723] bg-[#FDF5E6] shadow-sm hover:border-[#CD853F] focus:border-[#8B4513] focus:ring-1 focus:ring-[#8B4513] transition-colors"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="paid">Đã thanh toán</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-lg text-[#3E2723] bg-[#FDF5E6] shadow-sm hover:border-[#CD853F] focus:border-[#8B4513] focus:ring-1 focus:ring-[#8B4513] transition-colors"
              >
                <option value="date">Theo ngày</option>
                <option value="amount">Theo doanh thu</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-[#5D4037]">Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {groupTransactionsByStylist().map((stylistData) => (
              <StylistCard
                key={stylistData.stylist.id}
                stylist={stylistData}
                transactions={stylistData.transactions}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StylistSalary;
