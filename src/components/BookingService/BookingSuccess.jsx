import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Firework animation styles
  const fireworkStyles = `
    .firework {
      position: absolute;
      width: 4px;
      height: 4px;
      background: white;
      border-radius: 50%;
      animation: firework 1s ease-in-out infinite;
    }

    @keyframes firework {
      0% { transform: translate(0, 0) scale(0); opacity: 1; }
      100% { transform: translate(var(--x), var(--y)) scale(2); opacity: 0; }
    }
  `;

  const createFireworks = () => {
    const fireworks = [];
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const delay = Math.random() * 2;
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

      fireworks.push(
        <div
          key={i}
          className="firework"
          style={{
            left: x,
            top: y,
            backgroundColor: color,
            animationDelay: `${delay}s`,
            "--x": `${(Math.random() - 0.5) * 200}px`,
            "--y": `${(Math.random() - 0.5) * 200}px`,
          }}
        />
      );
    }
    return fireworks;
  };

  return (
    <div className="fixed inset-0 bg-[#8B4513] flex flex-col items-center justify-center text-white overflow-hidden">
      <style>{fireworkStyles}</style>
      {createFireworks()}

      <div className="text-center z-10">
        <div className="text-6xl font-bold mb-4">
          🎉 Đặt Lịch Thành Công! 🎉
        </div>
        <div className="text-2xl">Cảm ơn bạn đã sử dụng dịch vụ</div>
        <div className="mt-4 text-lg">
          Bạn sẽ được chuyển về trang chủ sau 3 giây...
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
