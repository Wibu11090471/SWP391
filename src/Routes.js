import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/HomePage/HairSalonHome";
import HairCutService from "./components/ServicePage/HairCutService/HairCutService";
import HairDyeingService from "./components/ServicePage/HairDyeingService/HairDyeingService";
import HairPermService from "./components/ServicePage/HairPermService/HairPermService";
import HairCutServiceDetail from "./components/ServicePage/HairCutService/HairCutServiceDetail/HairCutServiceDetail";
import HairDyeingServiceDetail from "./components/ServicePage/HairDyeingService/HairDyeingServiceDetail/HairDyeingServiceDetail";
import HairPermServiceDetail from "./components/ServicePage/HairPermService/HairPermServiceDetail/HairPermServiceDetail";
import BookingService from "./components/BookingService/BookingService";
import NotFound from "./components/NotFound/NotFound";
import DashboardSalonStaff from "./components/Dashboard/DashboardSalonStaff";
import StylistDetail from "./components/Dashboard/StylistDetail";
import Notifications from "./components/Dashboard/Notifications"; 
import Statistics from "./components/Dashboard/Statistics";
import SalonRevenueDashboard from "./components/HairSalonManager/Revenue/Revenue";
import OverviewDashboard from "./components/HairSalonManager/OverView/OverView";
import StaffManagement from "./components/HairSalonManager/StaffManagement/StaffManagement";
import StaffDetailManagement from "./components/HairSalonManager/StaffManagement/StaffDetailManagement/StaffDetailManagement";
import StylishManagement from "./components/HairSalonManager/StylishManagement/StylishManagement";
import StylishDetailManagement from "./components/HairSalonManager/StylishManagement/StylishDetailManagement/StylishDetailManagement";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/haircutservice" element={<HairCutService />} />
      <Route path="/hairdyeingservice" element={<HairDyeingService />} />
      <Route path="/hairpermservice" element={<HairPermService />} />
      <Route path="/service/:id" element={<HairCutServiceDetail />} />
      <Route path="/dyeing-service/:id" element={<HairDyeingServiceDetail />} />
      <Route path="/perm-service/:id" element={<HairPermServiceDetail />} />
      <Route path="/booking-service" element={<BookingService />} />
      <Route path="/hairsalon-staff" element={<DashboardSalonStaff />} />
      <Route path="/stylist/:id" element={<StylistDetail />} />
      <Route path="/notifications" element={<Notifications />} /> 
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/revenue-management" element={<SalonRevenueDashboard />} />
      <Route path="/overview-management" element={<OverviewDashboard />} />
      <Route path="/staff-management" element={<StaffManagement />} />
      <Route path="/staff-detail/:id" element={<StaffDetailManagement />} />
      <Route path="/stylish-management" element={<StylishManagement />} />
      <Route path="/stylish-detail/:id" element={<StylishDetailManagement/>} />
      {/* Catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
