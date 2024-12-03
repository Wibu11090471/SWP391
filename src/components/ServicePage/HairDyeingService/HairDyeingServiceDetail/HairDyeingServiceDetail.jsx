import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../../../ui/card";
import {
  Clock,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

const HairDyeingServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7081/api/Service/getAll"
        );

        // Find the service by ID
        const foundService = response.data.items.find(
          (item) => item.serviceEnity.id === parseInt(id)
        );

        if (foundService) {
          // Transform service data
          const transformedService = {
            id: foundService.serviceEnity.id,
            name: foundService.serviceEnity.title,
            description: foundService.serviceEnity.description,
            price: `${foundService.serviceEnity.price.toLocaleString()}đ`,
            duration: `${Math.round(
              foundService.serviceEnity.timeService * 60
            )} Phút`,
            mainImage:
              foundService.images[0]?.url || "/assets/image/default.jpg",
            subImages: foundService.images.map((img) => img.url),
            features: foundService.serviceEnity.description
              .split(",")
              .map((feature) => feature.trim()),
            process: [
              {
                step: 1,
                title: "Tư vấn và phân tích tóc",
                description:
                  "Đánh giá tình trạng tóc hiện tại, màu tóc cũ, độ hư tổn để lựa chọn phương pháp nhuộm phù hợp",
                duration: "15 phút",
              },
              {
                step: 2,
                title: "Làm sạch và chuẩn bị tóc",
                description:
                  "Gội đầu sạch sẽ, kiểm tra độ đàn hồi và độ ẩm của tóc trước khi nhuộm",
                duration: "20 phút",
              },
              {
                step: 3,
                title: "Bảo vệ và chuẩn bị da đầu",
                description:
                  "Thoa kem bảo vệ da đầu để tránh kích ứng và tác động của hóa chất",
                duration: "10 phút",
              },
              {
                step: 4,
                title: "Pha và thi công màu",
                description:
                  "Pha màu theo công thức chuyên nghiệp, áp dụng kỹ thuật nhuộm đồng đều từng phần tóc",
                duration: "30 phút",
              },
              {
                step: 5,
                title: "Ủ và kích hoạt màu",
                description:
                  "Ủ tóc để màu thấm sâu và phát triển, sử dụng nhiệt và kỹ thuật chuyên nghiệp",
                duration: "20 phút",
              },
              {
                step: 6,
                title: "Gội rửa và chăm sóc sau nhuộm",
                description:
                  "Gội sạch, sử dụng dầu xả chuyên biệt và dưỡng chất phục hồi màu tóc",
                duration: "15 phút",
              },
            ],
            additionalServices: [
              "Tặng gói dưỡng phục hồi tóc",
              "Tư vấn chăm sóc tóc nhuộm tại nhà",
              "Kiểm tra độ bền màu miễn phí",
              "Chế độ chăm sóc sau nhuộm",
            ],
            notes: [
              "Không gội đầu trong 48h đầu sau khi nhuộm",
              "Sử dụng dầu gội và dầu xả chuyên dụng cho tóc nhuộm",
              "Tránh tiếp xúc trực tiếp với ánh nắng mặt trời trong tuần đầu",
              "Hạn chế sử dụng máy sấy ở nhiệt độ cao",
            ],
            suitableFor: [
              "Khách hàng muốn thay đổi màu tóc hoàn toàn",
              "Che phủ bạc hiệu quả",
              "Tóc chưa qua xử lý nhiều hóa chất",
              "Muốn nâng tone màu tóc tự nhiên",
            ],
          };

          setService(transformedService);
        } else {
          setError("Không tìm thấy dịch vụ");
        }
        setLoading(false);
      } catch (err) {
        setError("Không thể tải chi tiết dịch vụ. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handleBookingClick = (e, serviceId) => {
    e.stopPropagation();
    navigate("/booking-service", {
      state: { serviceId, serviceType: "hairdye" },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Đang tải dịch vụ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Không tìm thấy dịch vụ</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF5E6] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#8B4513] hover:text-[#915C38] mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Quay lại</span>
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={service.subImages[activeImage]}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {service.subImages.map((img, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
                    activeImage === index
                      ? "border-[#8B4513]"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={img}
                    alt={`${service.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#3E2723] mb-2">
                {service.name}
              </h1>
              <div className="flex items-center text-[#5D4037] mb-4">
                <Clock className="w-5 h-5 mr-2" />
                <span>{service.duration}</span>
                <span className="mx-4">|</span>
                <span className="font-semibold">{service.price}</span>
              </div>
              <p className="text-[#5D4037]">{service.description}</p>
            </div>

            {/* Features */}
            <Card className="border-[#DEB887]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#3E2723] mb-4">
                  Dịch vụ bao gồm
                </h2>
                <div className="space-y-3">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-[#5D4037]"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#8B4513] mr-3" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suitable For */}
            <Card className="border-[#DEB887]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#3E2723] mb-4">
                  Phù hợp với
                </h2>
                <div className="space-y-3">
                  {service.suitableFor.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center text-[#5D4037]"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#DEB887] mr-3"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Process Steps */}
            <Card className="border-[#DEB887]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#3E2723] mb-4">
                  Quy trình thực hiện
                </h2>
                <div className="space-y-6">
                  {service.process.map((step) => (
                    <div key={step.step} className="relative pl-8">
                      <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#8B4513] text-white flex items-center justify-center text-sm">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#3E2723] mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-[#5D4037] mb-1">
                          {step.description}
                        </p>
                        <span className="text-sm text-[#8B4513]">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="border-[#DEB887]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#3E2723] mb-4">
                  Lưu ý quan trọng
                </h2>
                <div className="space-y-3">
                  {service.notes.map((note, index) => (
                    <div
                      key={index}
                      className="flex items-center text-[#5D4037]"
                    >
                      <AlertCircle className="w-5 h-5 text-[#8B4513] mr-3" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Services */}
            <Card className="border-[#DEB887]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#3E2723] mb-4">
                  Ưu đãi thêm
                </h2>
                <div className="space-y-3">
                  {service.additionalServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center text-[#5D4037]"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#DEB887] mr-3"></div>
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Booking Button */}
            <button
              className="w-full flex items-center justify-center bg-[#8B4513] hover:bg-[#915C38] text-white py-3 px-4 rounded-lg transition-colors duration-200 mt-auto"
              onClick={(e) => handleBookingClick(e, service.id)}
            >
              <span className="font-medium">Đặt lịch ngay</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HairDyeingServiceDetail;
