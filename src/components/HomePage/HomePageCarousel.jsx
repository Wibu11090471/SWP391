import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Giữ lại import này để giữ các style mặc định của carousel

const banners = [
  {
    id: 1,
    image: "/assets/image/1.jpg",
    title: "Chăm Sóc Tóc Chuyên Nghiệp",
    description:
      "Trải nghiệm dịch vụ cắt tóc và chăm sóc tóc cao cấp tại Hair Harmony Star Rail.",
  },
  {
    id: 2,
    image: "/assets/image/2.jpg",
    title: "Thiết Kế Kiểu Tóc Độc Đáo",
    description:
      "Để các chuyên gia tạo nên mái tóc ưng ý nhất theo phong cách của bạn.",
  },
  {
    id: 3,
    image: "/assets/image/3.jpg",
    title: "Sản Phẩm Chăm Sóc Tóc Chất Lượng",
    description:
      "Sử dụng các sản phẩm chăm sóc tóc cao cấp, an toàn và hiệu quả.",
  },
  {
    id: 4,
    image: "/assets/image/4.jpg",
    title: "Không Gian Salon Hiện Đại",
    description:
      "Thư giãn trong không gian sang trọng, tiện nghi và thoải mái.",
  },
  {
    id: 5,
    image: "/assets/image/5.jpg",
    title: "Đặt Lịch Online Tiện Lợi",
    description:
      "Dễ dàng đặt lịch cắt tóc trực tuyến với vài thao tác đơn giản.",
  },
];

const HomePageCarousel = () => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      autoPlay
      interval={5000}
      transitionTime={500}
    >
      {banners.map((banner) => (
        <div key={banner.id} className="relative">
          <img
            src={banner.image}
            alt={banner.title}
            className="w-[1196px] h-[700px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
            <h3 className="text-2xl font-bold">{banner.title}</h3>
            <p className="text-lg">{banner.description}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default HomePageCarousel;
