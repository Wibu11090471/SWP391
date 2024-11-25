import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const BranchSystem = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const branches = [
    {
      id: 1,
      name: "HAIR HARMONY 1",
      address: "3 Đường Số 671, Long Thạnh Mỹ, Quận 9, Hồ Chí Minh, Vietnam",
      rating: "Không có đánh giá",
      image: "/assets/image/Branch.png",
    },
    {
      id: 2,
      name: "HAIR HARMONY 2",
      address: "337 đường hoàng hữu Nam, Long Thạnh Mỹ, quận 9, hồ chí minh",
      rating: "Không có đánh giá",
      image: "/assets/image/Branch.png",
    },
    {
      id: 3,
      name: "HAIR HARMONY 3",
      address:
        "C1/3 Lê Văn Việt, Lê Văn Việt, Tăng Nhơn Phú A, Quận 9, Hồ Chí Minh, Việt Nam",
      rating: "5/5 (4 đánh giá)",
      image: "/assets/image/Branch.png",
    },
    {
      id: 4,
      name: "HAIR HARMONY 4",
      address:
        "89/12 Đường Hằng Tre, Long Thạnh Mỹ, Quận 9, Hồ Chí Minh, Vietnam",
      rating: "4.165/5 (2 đánh giá)",
      image: "/assets/image/Branch.png",
    },
    {
      id: 5,
      name: "HAIR HARMONY 5",
      address:
        "C1/3 Lê Văn Việt, Lê Văn Việt, Tăng Nhơn Phú A, Quận 9, Hồ Chí Minh, Việt Nam",
      rating: "5/5 (4 đánh giá)",
      image: "/assets/image/Branch.png",
    },
    {
      id: 6,
      name: "HAIR HARMONY 6",
      address:
        "C1/3 Lê Văn Việt, Lê Văn Việt, Tăng Nhơn Phú A, Quận 9, Hồ Chí Minh, Việt Nam",
      rating: "5/5 (4 đánh giá)",
      image: "/assets/image/Branch.png",
    },
    {
      id: 7,
      name: "HAIR HARMONY 7",
      address:
        "C1/3 Lê Văn Việt, Lê Văn Việt, Tăng Nhơn Phú A, Quận 9, Hồ Chí Minh, Việt Nam",
      rating: "5/5 (4 đánh giá)",
      image: "/assets/image/Branch.png",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === branches.length - 5 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? branches.length - 5 : prevIndex - 1
    );
  };

  return (
    <section className="container mx-auto px-4 py-16 bg-[#FDF5E6]">
      <h3 className="text-3xl font-bold text-center mb-12 text-[#3E2723]">
        Hệ Thống Chi Nhánh
      </h3>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}
          >
            {branches.map((branch) => (
              <div key={branch.id} className="w-1/5 flex-shrink-0 px-1">
                <div className="relative group">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 bg-[#DEB887]/90 px-2 py-0.5 rounded-full text-sm text-[#3E2723]">
                    {branch.rating}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-[#8B4513]/90 p-2 rounded-b-lg">
                    <h4 className="text-base font-bold text-[#FDF5E6] mb-1">
                      {branch.name}
                    </h4>
                    <div className="flex items-start text-[#FDF5E6]">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0 mt-1" />
                      <p className="text-xs line-clamp-2">{branch.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#8B4513]/80 p-2 rounded-full shadow-lg hover:bg-[#8B4513] transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-[#FDF5E6]" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#8B4513]/80 p-2 rounded-full shadow-lg hover:bg-[#8B4513] transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-[#FDF5E6]" />
        </button>
      </div>
    </section>
  );
};

export default BranchSystem;
