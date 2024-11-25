import React from "react";
import { motion } from "framer-motion";
import { Scissors, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#FDF5E6" }}
    >
      <div className="max-w-2xl w-full relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-[600px] h-[600px] border-8 rounded-full"
            style={{ borderColor: "#8B4513" }}
          />
        </div>

        <div className="relative z-10 text-center">
          {/* Scissors Animation */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [-10, 10] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Scissors size={80} style={{ color: "#8B4513" }} />
              </motion.div>
            </div>
          </motion.div>

          {/* 404 Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <h1
              className="text-8xl font-bold mb-4"
              style={{ color: "#8B4513" }}
            >
              404
            </h1>

            {/* Decorative Lines */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ duration: 0.8 }}
                className="h-1 rounded-full"
                style={{ backgroundColor: "#DEB887" }}
              />
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#8B4513" }}
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ duration: 0.8 }}
                className="h-1 rounded-full"
                style={{ backgroundColor: "#DEB887" }}
              />
            </div>
          </motion.div>

          {/* Error Messages */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-semibold mb-4"
            style={{ color: "#3E2723" }}
          >
            Không tìm thấy trang
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg mb-8"
            style={{ color: "#5D4037" }}
          >
            Có vẻ như dịch vụ bạn đang tìm kiếm đã được thay đổi hoặc không còn
            tồn tại.
          </motion.p>

          {/* Return Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-base font-medium transition-all duration-300"
              style={{
                backgroundColor: "#8B4513",
                color: "#FDF5E6",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#915C38";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#8B4513";
              }}
            >
              <Home size={20} />
              Quay về trang chủ
            </a>
          </motion.div>
        </div>

        {/* Decorative Corner Elements */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 rounded-tl-lg"
          style={{ borderColor: "#DEB887" }}
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 rounded-tr-lg"
          style={{ borderColor: "#DEB887" }}
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 rounded-bl-lg"
          style={{ borderColor: "#DEB887" }}
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 rounded-br-lg"
          style={{ borderColor: "#DEB887" }}
        />
      </div>
    </div>
  );
};

export default NotFound;
