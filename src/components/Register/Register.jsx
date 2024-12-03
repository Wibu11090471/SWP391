import React, { useState } from "react";
import axios from "axios";

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    fullName: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.username || !formData.password || !formData.phoneNumber) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/accounts/register",
        {
          username: formData.username,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          fullName: formData.fullName,
        }
      );

      setSuccess("Đăng ký thành công!");
      onSwitchToLogin(); 
    } catch (err) {
      setError(
        err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại."
      );
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
      <div className="flex flex-col items-center mb-8">
        <img
          src="/assets/image/LogoHarmony1.png"
          alt="HairHarmony Logo"
          className="h-32 mb-4"
        />
        <p className="text-sm text-[#5D4037] text-center">
          Là nơi để mọi người có thể đến và sử dụng các dịch vụ tốt nhất từ
          những Salon | Barber hàng đầu Việt Nam
        </p>
      </div>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

      <div className="flex gap-4 mb-6">
        <button
          onClick={onSwitchToLogin}
          className="flex-1 text-[#5D4037] hover:text-[#3E2723]"
        >
          Đăng nhập
        </button>
        <button className="flex-1 text-[#8B4513] hover:text-[#915C38]">
          Đăng ký
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            name="username"
            className="w-full p-3 bg-[#FAEBD7] rounded-md pl-10 border border-[#DEB887] focus:outline-none focus:border-[#8B4513]"
            placeholder="Tên đăng nhập"
            value={formData.username}
            onChange={handleChange}
          />
          <svg
            className="w-5 h-5 absolute left-3 top-3.5 text-[#8B4513]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        <div className="relative">
          <input
            type="text"
            name="fullName"
            className="w-full p-3 bg-[#FAEBD7] rounded-md pl-10 border border-[#DEB887] focus:outline-none focus:border-[#8B4513]"
            placeholder="Họ và Tên"
            value={formData.fullName}
            onChange={handleChange}
          />
          <svg
            className="w-5 h-5 absolute left-3 top-3.5 text-[#8B4513]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        <div className="relative">
          <input
            type="tel"
            name="phoneNumber"
            className="w-full p-3 bg-[#FAEBD7] rounded-md pl-10 border border-[#DEB887] focus:outline-none focus:border-[#8B4513]"
            placeholder="Số điện thoại"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <svg
            className="w-5 h-5 absolute left-3 top-3.5 text-[#8B4513]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>

        <div className="relative">
          <input
            type="password"
            name="password"
            className="w-full p-3 bg-[#FAEBD7] rounded-md pl-10 border border-[#DEB887] focus:outline-none focus:border-[#8B4513]"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
          />
          <svg
            className="w-5 h-5 absolute left-3 top-3.5 text-[#8B4513]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <div className="relative">
          <input
            type="password"
            name="confirmPassword"
            className="w-full p-3 bg-[#FAEBD7] rounded-md pl-10 border border-[#DEB887] focus:outline-none focus:border-[#8B4513]"
            placeholder="Xác nhận mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <svg
            className="w-5 h-5 absolute left-3 top-3.5 text-[#8B4513]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <button
          type="submit"
          className="w-full bg-[#8B4513] text-white py-3 rounded-md hover:bg-[#915C38] transition duration-200"
        >
          Đăng ký
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#5D4037]">Đăng nhập hoặc đăng ký bằng...</p>
      </div>
    </div>
  );
};

export default Register;
