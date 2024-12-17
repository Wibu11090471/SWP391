import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TrendingUp,
  Users,
  DollarSign,
  ChevronDown,
  ChevronUp,
  XIcon,
  InfoIcon,
} from "lucide-react";

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

// Modal chi tiết giao dịch
const TransactionDetailModal = ({ transaction, onClose }) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl w-[500px] max-h-[80vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <XIcon size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Chi Tiết Giao Dịch
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Dịch Vụ</p>
              <p className="font-semibold">{transaction.service.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng Giá</p>
              <p className="font-semibold text-green-600">
                {transaction.totalPrice.toLocaleString()} VNĐ
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Stylist</p>
              <p className="font-semibold">{transaction.stylist.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ngày Thực Hiện</p>
              <p className="font-semibold">
                {new Date(transaction.booking.startTime).toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600">Ghi Chú</p>
            <p className="font-semibold">
              {transaction.note || "Không có ghi chú"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Chi Tiết Dịch Vụ</p>
            <p className="font-semibold">{transaction.service.description}</p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
            <div className="flex items-center">
              <InfoIcon size={20} className="mr-2 text-blue-600" />
              <p className="text-sm text-blue-800">
                Trạng Thái: {transaction.booking.status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StylistCommissionCard = ({ stylist, rank, transactions }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const getColorScheme = (rank) => {
    const colorSchemes = [
      {
        gradient: "from-[#6A5ACD] to-[#483D8B]", // Slate Blue
        background: "bg-[#F0F4F8]",
        text: "text-[#1A365D]",
      },
      {
        gradient: "from-[#2E8B57] to-[#228B22]", // Sea Green
        background: "bg-[#F0FFF4]",
        text: "text-[#22543D]",
      },
      {
        gradient: "from-[#D2691E] to-[#CD853F]", // Copper
        background: "bg-[#FFFAF0]",
        text: "text-[#5F370E]",
      },
      {
        gradient: "from-[#4A90E2] to-[#1E90FF]", // Dodger Blue
        background: "bg-[#EBF8FF]",
        text: "text-[#2A4365]",
      },
    ];
    return colorSchemes[rank % colorSchemes.length];
  };

  const colorScheme = getColorScheme(rank);

  return (
    <>
      <div
        className={`relative bg-gradient-to-r ${colorScheme.gradient} 
          text-white rounded-xl p-5 shadow-lg transform transition-all 
          duration-300 hover:scale-[1.02] cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Users className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">{stylist.name}</h3>
              <p className="text-sm opacity-80">Stylist chuyên nghiệp</p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end space-x-2">
              <DollarSign size={20} />
              <span className="text-2xl font-extrabold">
                {stylist.totalCommissions.toLocaleString()} VNĐ
              </span>
            </div>
            <div className="flex items-center justify-end text-sm mt-1">
              <TrendingUp size={16} className="mr-1" />
              <span>{stylist.transactions} giao dịch</span>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div
            className={`mt-4 ${colorScheme.background} ${colorScheme.text} p-3 rounded-lg`}
          >
            <h4 className="text-sm font-semibold mb-2">Chi tiết thu nhập</h4>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>Tổng giao dịch: {stylist.transactions}</div>
              <div>
                Trung bình/giao dịch:{" "}
                {(
                  stylist.totalCommissions / stylist.transactions
                ).toLocaleString()}{" "}
                VNĐ
              </div>
            </div>

            <h4 className="text-sm font-semibold mb-2">
              Các dịch vụ đã thực hiện
            </h4>
            <div className="space-y-2">
              {transactions
                .filter((trans) => trans.stylist.id === stylist.id)
                .map((trans, index) => (
                  <div
                    key={trans.id || index}
                    className="bg-white/10 p-2 rounded-md hover:bg-white/20 transition cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTransaction(trans);
                    }}
                  >
                    <div className="flex justify-between">
                      <span>{trans.service.title}</span>
                      <span className="font-bold">
                        {trans.totalPrice.toLocaleString()} VNĐ
                      </span>
                    </div>
                    <div className="text-xs opacity-70">
                      Ngày:{" "}
                      {new Date(trans.booking.startTime).toLocaleDateString()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="absolute top-4 right-4">
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
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

const StylistCommission = () => {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("totalCommissions");

  useEffect(() => {
    const fetchCommissions = async () => {
      const api = createApiInstance();
      try {
        const response = await api.get("/api/PaymentTransaction/getAll");
        setCommissions(response.data.paymentTransactions);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải dữ liệu hoa hồng");
        setLoading(false);
        console.error("Error fetching commissions:", err);
      }
    };

    fetchCommissions();
  }, []);

  const calculateStylistCommissions = () => {
    const commissionMap = {};

    commissions.forEach((transaction) => {
      const stylistId = transaction.stylist.id;
      const stylistName = transaction.stylist.fullName;
      const commissionAmount = transaction.totalPrice;

      if (!commissionMap[stylistId]) {
        commissionMap[stylistId] = {
          name: stylistName,
          totalCommissions: 0,
          transactions: 0,
          id: stylistId,
        };
      }

      commissionMap[stylistId].totalCommissions += commissionAmount;
      commissionMap[stylistId].transactions += 1;
    });

    const sortedCommissions = Object.values(commissionMap).sort(
      (a, b) => b[sortBy] - a[sortBy]
    );

    return sortedCommissions;
  };

  const stylistCommissions = calculateStylistCommissions();

  return (
    <div className="flex min-h-screen bg-[#F7FAFC] pt-20">
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
              Thêm Dịch Vụ
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
              Thống Kê
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
      <div className="main-container flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#2D3748] text-center flex-grow">
            Hoa Hồng Stylist
          </h1>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#4A5568]">Sắp xếp theo:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-1 border rounded text-[#2D3748] bg-white"
            >
              <option value="totalCommissions">Tổng hoa hồng</option>
              <option value="transactions">Số giao dịch</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-[#4A5568]">Đang tải dữ liệu...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="space-y-4">
            {stylistCommissions.map((stylist, index) => (
              <StylistCommissionCard
                key={stylist.id}
                stylist={stylist}
                rank={index}
                transactions={commissions}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StylistCommission;
