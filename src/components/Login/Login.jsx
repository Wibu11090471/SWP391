import React, { useState } from "react";
import Register from "../Register/Register";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Cấu hình axios
const api = axios.create({
  baseURL: "https://localhost:7081",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tách LoginForm thành component riêng
const LoginForm = ({ onSwitchView, handleSubmit, error, isLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(username, password);
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

      {error && (
        <div className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <button className="flex-1 text-[#8B4513] hover:text-[#915C38] font-semibold">
          Đăng nhập
        </button>
        <button
          onClick={onSwitchView}
          className="flex-1 text-[#5D4037] hover:text-[#3E2723]"
        >
          Đăng ký
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <input
              type="text"
              className="w-full p-3 bg-[#FAEBD7] rounded-md pl-10 border border-[#DEB887] focus:outline-none focus:border-[#8B4513]"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
        </div>

        <div>
          <div className="relative">
            <input
              type="password"
              className="w-full p-3 bg-[#FAEBD7] rounded-md pl-10 border border-[#DEB887] focus:outline-none focus:border-[#8B4513]"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 accent-[#8B4513]" />
            <span className="text-sm text-[#5D4037]">Ghi nhớ tôi</span>
          </label>
          <a href="#" className="text-sm text-[#8B4513] hover:text-[#915C38]">
            Quên mật khẩu
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#8B4513] text-white py-3 rounded-md hover:bg-[#915C38] transition duration-200 disabled:bg-[#DEB887] disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Đang xử lý...
            </span>
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#5D4037]">Đăng nhập hoặc đăng ký bằng...</p>
      </div>
    </div>
  );
};

// Component Login chính
const Login = () => {
  const [error, setError] = useState("");
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (username, password) => {
    if (!username || !password) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/api/User/login", {
        username,
        password,
      });

      // Lưu token vào localStorage
      localStorage.setItem("token", response.data.token);

      // Lấy thông tin profile
      const profileResponse = await api.get("/api/User/profile", {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });

      // Lưu thông tin user vào localStorage nếu cần
      localStorage.setItem("user", JSON.stringify(profileResponse.data));

      // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
      window.location.href = "/";
    } catch (err) {
      if (err.response) {
        // Lỗi từ server
        setError(err.response.data.message || "Đăng nhập thất bại!");
      } else if (err.request) {
        // Lỗi không kết nối được với server
        setError("Không thể kết nối đến server. Vui lòng thử lại sau!");
      } else {
        // Lỗi khác
        setError("Có lỗi xảy ra. Vui lòng thử lại!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FDF5E6] pt-24 pb-10">
      {/* Left side - Barber SVG */}
      <div className="flex-1 hidden lg:flex items-center justify-end">
        <img
          src="/assets/image/Barber.svg"
          alt="Barber Logo"
          className="h-80 w-auto"
        />
      </div>

      {/* Center - Login/Register form */}
      <div className="flex-1 flex items-center justify-center px-8">
        {isLoginView ? (
          <LoginForm
            onSwitchView={() => setIsLoginView(false)}
            handleSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
          />
        ) : (
          <Register onSwitchToLogin={() => setIsLoginView(true)} />
        )}
      </div>

      {/* Right side - Girl SVG */}
      <div className="flex-1 hidden lg:flex items-center justify-start">
        <img
          src="/assets/image/Girl.svg"
          alt="Girl Logo"
          className="h-80 w-auto"
        />
      </div>
    </div>
  );
};

export default Login;
