import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const StylistDetail = () => {
  const [selectedDateTime, setSelectedDateTime] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const stylist = {
    1: {
      name: "Minh Tuấn",
      specialty: "Chuyên gia tạo kiểu Hàn Quốc",
      experience: "8 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
      bookings: ["09:00", "10:30"],
    },
    2: {
      name: "Lan Phương",
      specialty: "Chuyên gia nhuộm và uốn",
      experience: "6 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
      bookings: ["10:00"],
    },
    3: {
      name: "Việt Anh",
      specialty: "Chuyên gia cắt tóc nam",
      experience: "10 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
      bookings: ["09:30", "11:00"],
    },
    4: {
      name: "Hương Giang",
      specialty: "Chuyên gia tạo mẫu tóc cô dâu",
      experience: "7 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
      bookings: ["12:00", "12:30"],
    },
    5: {
      name: "Quang Minh",
      specialty: "Chuyên gia tóc nam đương đại",
      experience: "5 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
      bookings: ["09:00", "11:30"],
    },
    6: {
      name: "Mai Ly",
      specialty: "Chuyên gia uốn và duỗi",
      experience: "9 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
      bookings: ["10:30", "12:00"],
    },
    7: {
      name: "Đức Trọng",
      specialty: "Chuyên gia tạo kiểu nghệ thuật",
      experience: "12 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
      bookings: ["09:30", "10:00"],
    },
    8: {
      name: "Thảo Linh",
      specialty: "Chuyên gia nhuộm màu hiện đại",
      experience: "6 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
      bookings: ["11:00", "12:30"],
    },
    9: {
      name: "Minh Khang",
      specialty: "Chuyên gia tóc nam phong cách",
      experience: "7 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
      bookings: ["09:00", "11:30"],
    },
    10: {
      name: "Phương Anh",
      specialty: "Chuyên gia tạo kiểu Âu Mỹ",
      experience: "8 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
      bookings: ["10:00", "12:30"],
    },
  }[id];

  if (!stylist) {
    return <div> Không tìm thấy stylist </div>;
  }

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
  ];

  const handleTimeSelect = (time) => {
    if (!stylist.bookings.includes(time)) {
      setSelectedDateTime({ stylistId: stylist.id, time });
    }
  };

  // Hàm quay lại trang trước
  const handleBackClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="stylist-detail container mx-auto p-6" style={{ paddingTop: "80px" }}>
      <button
        onClick={handleBackClick}
        className="bg-[#8B4513] text-white px-4 py-2 rounded-md mt-4"
      >
        Quay lại trang Dashboard
      </button>
  
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 flex items-start">
        {/* Left side - Stylist Image */}
        <div className="flex-shrink-0 mr-16">
          <img
            src={stylist.imageUrl}
            alt={stylist.name}
            className="stylist-image"
            style={{
              width: "300px",
              height: "350px",
              borderRadius: "30%",
              border: "5px solid #8B4513",
              objectFit: "cover",
            }}
          />
          <div className="text-center">
            <h2 className="font-bold text-3xl text-gray-800 mt-4">{stylist.name}</h2>
            <p className="font-bold text-lg text-gray-600 mt-2">{stylist.specialty}</p>
            <p className="font-bold text-lg text-gray-500 mt-2">Kinh nghiệm: {stylist.experience}</p>
          </div>
        </div>
  
        {/* Right side - Time slots and selected time */}
        <div className="flex-grow">
          {/* Time Slots */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {timeSlots.map((time, index) => (
              <button
                key={index}
                style={{
                  padding: "15px",
                  borderRadius: "5px",
                  textAlign: "center",
                  backgroundColor: stylist.bookings.includes(time)
                    ? "#d3d3d3"
                    : "#ffffff",
                  color: stylist.bookings.includes(time) ? "#555" : "#000",
                  cursor: stylist.bookings.includes(time)
                    ? "not-allowed"
                    : "pointer",
                  border: "1px solid #ccc",
                  transition: "background-color 0.2s",
                }}
                disabled={stylist.bookings.includes(time)}
                onClick={() => handleTimeSelect(time)}
                onMouseEnter={(e) =>
                  !stylist.bookings.includes(time) &&
                  (e.target.style.backgroundColor = "#f0f8ff")
                }
                onMouseLeave={(e) =>
                  !stylist.bookings.includes(time) &&
                  (e.target.style.backgroundColor = "#ffffff")
                }
              >
                {time}
              </button>
            ))}
          </div>
  
          {/* Selected DateTime */}
          {selectedDateTime.time && (
            <div className="mt-4 text-green-500 text-center">
              <p>
                Đã chọn: {selectedDateTime.time} - Bạn đang đặt lịch cho stylist{" "}
                {stylist.name}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default StylistDetail;
