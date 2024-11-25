import React, { useState } from "react";
import { Star, Trophy, Sparkles, Gift } from "lucide-react";

const MembershipSection = () => {
  const [activeTier, setActiveTier] = useState("silver");

  const membershipTiers = [
    {
      name: "Silver",
      icon: <Star className="w-12 h-12 text-[#8B4513]" />,
      price: "0 VND",
      benefits: ["Ưu tiên đặt lịch online", "Nhận thông báo ưu đãi đặc biệt"],
      backgroundColor: "bg-[#FAEBD7]",
      textColor: "text-[#3E2723]",
    },
    {
      name: "Gold",
      icon: <Trophy className="w-12 h-12 text-[#CD853F]" />,
      price: "100,000 VND/tháng",
      benefits: [
        "Miễn phí chăm sóc tóc 1 lần/tháng",
        "Quà tặng sinh nhật",
        "Ưu tiên cao nhất đặt lịch",
      ],
      backgroundColor: "bg-[#F5DEB3]",
      textColor: "text-[#3E2723]",
    },
    {
      name: "Platinum",
      icon: <Sparkles className="w-12 h-12 text-[#654321]" />,
      price: "500,000 VND/tháng",
      benefits: [
        "Miễn phí chăm sóc tóc 2 lần/tháng",
        "Tư vấn phong cách cá nhân miễn phí",
        "Quà tặng cao cấp mỗi quý",
        "Ưu tiên tuyệt đối và dịch vụ VIP",
      ],
      backgroundColor: "bg-[#DEB887]",
      textColor: "text-[#3E2723]",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 bg-[#FDF5E6]">
      <h3 className="text-3xl font-bold text-center mb-12 text-[#3E2723]">
        Chương Trình Thành Viên
      </h3>

      <div className="flex justify-center mb-8">
        {membershipTiers.map((tier) => (
          <button
            key={tier.name}
            onClick={() => setActiveTier(tier.name.toLowerCase())}
            className={`
              px-6 py-2 mx-2 rounded-full transition-all duration-300
              ${
                activeTier === tier.name.toLowerCase()
                  ? "bg-[#8B4513] text-[#FDF5E6]"
                  : "bg-[#DEB887] text-[#3E2723] hover:bg-[#915C38] hover:text-[#FDF5E6]"
              }
            `}
          >
            {tier.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {membershipTiers.map((tier) => (
          <div
            key={tier.name}
            className={`
              ${tier.backgroundColor} 
              ${tier.textColor}
              rounded-lg p-6 shadow-lg 
              transform transition-all duration-300
              ${
                activeTier === tier.name.toLowerCase()
                  ? "scale-105 border-2 border-[#8B4513]"
                  : "hover:shadow-xl"
              }
            `}
          >
            <div className="flex items-center mb-4">
              {tier.icon}
              <h4 className="text-2xl font-semibold ml-4">{tier.name}</h4>
            </div>
            <p className="text-xl font-bold mb-4">{tier.price}</p>
            <ul className="space-y-2">
              {tier.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <Gift className="w-5 h-5 mr-2 text-[#8B4513]" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MembershipSection;
