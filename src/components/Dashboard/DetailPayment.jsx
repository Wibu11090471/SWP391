import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";  // Sử dụng useNavigate thay vì useHistory
import axios from "axios";

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

const DetailPayment = () => {
  const [transaction, setTransaction] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      const api = createApiInstance();
      try {
        const response = await api.get(`/api/PaymentTransaction/${id}`);
        setTransaction(response.data.paymentTransaction);
      } catch (error) {
        console.error("Error fetching transaction details:", error);
      }
    };

    fetchTransactionDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate("/hairsalon-staff");  
  };

  const handleApprove = () => {
    console.log("Approve transaction:", id);
  };

  const handleReject = () => {
    console.log("Reject transaction:", id);
  };

  if (!transaction) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ paddingTop: "80px" }}>
      <div className="flex justify-between items-center">
        <button
          onClick={handleBackClick}
          className="bg-yellow-400 text-white py-2 px-4 rounded-lg"
        >
          Quay lại Dashboard
        </button>
      </div>

      <div className="transaction-details mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4">Chi tiết giao dịch ID: {transaction.id}</h2>

        <div className="mb-4">
          <h5 className="font-bold">Ghi chú:</h5>
          <p>{transaction.note}</p>
        </div>

        <div className="mb-4">
          <h5 className="font-bold">Stylist:</h5>
          <p>
            Tên: {transaction.stylist?.fullName || "N/A"} ({transaction.stylist?.userName || "N/A"})
          </p>
        </div>

        <div className="mb-4">
          <h5 className="font-bold">Lịch hẹn:</h5>
          <p>Thời gian: {transaction.booking?.startTime || "N/A"}</p>
          <p>Trạng thái: {transaction.booking?.status || "N/A"}</p>
        </div>

        <div className="mb-4">
          <h5 className="font-bold">Người tạo:</h5>
          <p>
            Tên: {transaction.createdBy?.fullName || "N/A"} ({transaction.createdBy?.userName || "N/A"})
          </p>
        </div>

        <div className="mb-4">
          <h5 className="font-bold">Trạng thái:</h5>
          <p>{transaction.status ? "Hoạt động" : "Đã hủy"}</p>
        </div>

        {/* Button approve and reject */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleApprove}
            className="bg-green-500 text-white py-2 px-4 rounded-lg"
          >
            Duyệt
          </button>
          <button
            onClick={handleReject}
            className="bg-red-500 text-white py-2 px-4 rounded-lg"
          >
            Từ chối
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPayment;
