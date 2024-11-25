import React, { useState } from "react";

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    setError("");
    console.log("Đăng ký thành công với:", formData);
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
            name="fullName"
            className="w-full p-3 bg-[#FAEBD7] rounded-md pl-10 border border-[#DEB887] focus:outline-none focus:border-[#8B4513]"
            placeholder="Họ và tên"
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
            type="email"
            name="email"
            className="w-full p-3 bg-[#FAEBD7] rounded-md pl-10 border border-[#DEB887] focus:outline-none focus:border-[#8B4513]"
            placeholder="Email"
            value={formData.email}
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
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
