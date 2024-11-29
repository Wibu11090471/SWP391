import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const StylistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hoveredTime, setHoveredTime] = useState(null);
  const [popup, setPopup] = useState({ visible: false, time: null });
  const [successMessage, setSuccessMessage] = useState("");
  const [approvedTimes, setApprovedTimes] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

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
    if (!approvedTimes.includes(time)) {
      setPopup({ visible: true, time });
    }
  };

  const handleApprove = () => {
    setPopup({ ...popup, visible: false });
    setApprovedTimes([...approvedTimes, popup.time]);
    setSuccessMessage(
      `Đặt lịch thành công vào ${popup.time} với stylist ${stylist.name}`
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  };

  const handleDecline = () => {
    setPopup({ ...popup, visible: false });
  };

  const handleBackClick = () => {
    navigate("/hairsalon-staff");
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  return (
    <div
      className="stylist-detail container mx-auto p-6"
      style={{ paddingTop: "80px" }}
    >
      <button
        onClick={handleBackClick}
        className="bg-[#8B4513] text-white px-4 py-2 rounded-md mt-4"
      >
        Quay lại trang Dashboard
      </button>

      <div
        className="bg-white shadow-lg rounded-lg p-9 mt-6 flex items-start st"
        style={{ margin: "40px" }}
      >
        {/* Left side - stylist Image */}
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
            <h2 className="font-bold text-3xl text-gray-800 mt-4">
              {stylist.name}
            </h2>
            <p className="font-bold text-lg text-gray-600 mt-2">
              {stylist.specialty}
            </p>
            <p className="font-bold text-lg text-gray-500 mt-2">
              Kinh nghiệm: {stylist.experience}
            </p>
          </div>
        </div>

        {/* Right side - Time slots and selected time */}
        <div className="flex-grow">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {" "}
            {dates.map((date, index) => (
              <button
                key={index}
                className={`p-2 rounded-lg text-center ${
                  selectedDateTime?.date === date.toDateString()
                    ? "bg-[#8B4513] text-white"
                    : "bg-white hover:bg-[#DEB887]/20"
                }`}
                onClick={() =>
                  setSelectedDateTime({
                    ...selectedDateTime,
                    date: date.toDateString(),
                  })
                }
              >
                <div className="text-sm font-medium">
                  {date.toLocaleDateString("vi-VN", { weekday: "short" })}
                </div>
                <div className="text-lg font-bold">{date.getDate()}</div>
              </button>
            ))}
          </div>

          {/* Phần thời gian */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
              marginTop: "10px", 
            }}
          >
            {timeSlots.map((time, index) => (
              <button
                key={index}
                style={{
                  padding: "15px",
                  borderRadius: "5px",
                  textAlign: "center",
                  backgroundColor:
                    hoveredTime === time
                      ? "#90EE90"
                      : approvedTimes.includes(time) // Check if time is approved
                      ? "#d3d3d3"
                      : stylist.bookings.includes(time)
                      ? "#d3d3d3"
                      : "#ffffff",
                  color:
                    approvedTimes.includes(time) ||
                    stylist.bookings.includes(time)
                      ? "#555"
                      : "#000",
                  cursor:
                    approvedTimes.includes(time) ||
                    stylist.bookings.includes(time)
                      ? "not-allowed"
                      : "pointer",
                  border: "1px solid #ccc",
                }}
                disabled={
                  approvedTimes.includes(time) ||
                  stylist.bookings.includes(time)
                } // Disable times that are approved or already booked
                onMouseEnter={() => setHoveredTime(time)}
                onMouseLeave={() => setHoveredTime(null)}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>

          {successMessage && (
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#d4edda",
                color: "#155724",
                padding: "15px",
                borderRadius: "5px",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {successMessage}
            </div>
          )}

          {popup.visible && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                border: "1px solid #ccc",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                zIndex: 1000,
              }}
            >
              <p
                style={{
                  marginBottom: "20px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Bạn có muốn đặt lịch vào{" "}
                <span style={{ color: "#8B4513" }}>{popup.time}</span> không?
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <button
                  onClick={handleApprove}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#45a049")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#4CAF50")
                  }
                >
                  Approve
                </button>
                <button
                  onClick={handleDecline}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#d32f2f")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#f44336")
                  }
                >
                  Decline
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StylistDetail;
