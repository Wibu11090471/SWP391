import React, { useState } from "react";
import HomePageCarousel from "./HomePageCarousel";
import TopHairstylists from "./TopHairStylists";
import MembershipSection from "./MembershipSection";
import BranchSystem from "./BranchSystem";
import MainService from "./MainService";

const HairSalonHome = () => {
  const [selectedService, setSelectedService] = useState(null);

  const toggleService = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans ">
      {/* Add margin-top to account for fixed header */}
      <div className="pt-20">
        <HomePageCarousel />
        <BranchSystem />
        <MainService />
        <TopHairstylists />
        <MembershipSection />
      </div>
    </div>
  );
};

export default HairSalonHome;
