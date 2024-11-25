import React, { useRef, useState } from "react";
import { User } from "lucide-react";

const TopHairstylists = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const topHairstylists = [
    {
      id: 1,
      name: "Minh Tuấn",
      specialty: "Chuyên gia tạo kiểu Hàn Quốc",
      experience: "8 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
    },
    {
      id: 2,
      name: "Lan Phương",
      specialty: "Chuyên gia nhuộm và uốn",
      experience: "6 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
    },
    {
      id: 3,
      name: "Việt Anh",
      specialty: "Chuyên gia cắt tóc nam",
      experience: "10 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
    },
    {
      id: 4,
      name: "Hương Giang",
      specialty: "Chuyên gia tạo mẫu tóc cô dâu",
      experience: "7 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
    },
    {
      id: 5,
      name: "Quang Minh",
      specialty: "Chuyên gia tóc nam đương đại",
      experience: "5 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
    },
    {
      id: 6,
      name: "Mai Ly",
      specialty: "Chuyên gia uốn và duỗi",
      experience: "9 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
    },
    {
      id: 7,
      name: "Đức Trọng",
      specialty: "Chuyên gia tạo kiểu nghệ thuật",
      experience: "12 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
    },
    {
      id: 8,
      name: "Thảo Linh",
      specialty: "Chuyên gia nhuộm màu hiện đại",
      experience: "6 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
    },
    {
      id: 9,
      name: "Minh Khang",
      specialty: "Chuyên gia tóc nam phong cách",
      experience: "7 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
    },
    {
      id: 10,
      name: "Phương Anh",
      specialty: "Chuyên gia tạo kiểu Âu Mỹ",
      experience: "8 năm",
      imageUrl: "/assets/image/cáooooooo.jpg",
    },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplier for smoother scrolling
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="container mx-auto px-4 py-16 bg-[#FDF5E6]">
      <h3 className="text-3xl font-bold text-center mb-12 text-[#3E2723]">
        Top Thợ Cắt Tóc Trong Tháng
      </h3>
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollBehavior: "smooth",
        }}
      >
        <div className="flex gap-6 pb-4">
          {topHairstylists.map((stylist) => (
            <div
              key={stylist.id}
              className="flex-shrink-0 w-72 bg-[#FAEBD7] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 pointer-events-none"
            >
              <div className="relative">
                {stylist.imageUrl ? (
                  <img
                    src={stylist.imageUrl}
                    alt={stylist.name}
                    className="w-full aspect-[2/3] object-cover"
                  />
                ) : (
                  <div className="w-full h-96 bg-[#DEB887] flex items-center justify-center">
                    <User size={100} className="text-[#8B4513]" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-[#8B4513] bg-opacity-90 text-[#FDF5E6] p-4">
                  <h4 className="text-xl font-semibold">{stylist.name}</h4>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[#3E2723] mb-2">
                  <strong>Chuyên môn:</strong> {stylist.specialty}
                </p>
                <p className="text-[#3E2723]">
                  <strong>Kinh nghiệm:</strong> {stylist.experience}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopHairstylists;
