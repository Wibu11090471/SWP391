import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./components/Login/Login";
import Home from "./components/HomePage/HairSalonHome";
import AllService from "./components/ServicePage/AllService/AllService";
import HairCutService from "./components/ServicePage/HairCutService/HairCutService";
import HairDyeingService from "./components/ServicePage/HairDyeingService/HairDyeingService";
import HairPermService from "./components/ServicePage/HairPermService/HairPermService";
import HairCutServiceDetail from "./components/ServicePage/HairCutService/HairCutServiceDetail/HairCutServiceDetail";
import HairDyeingServiceDetail from "./components/ServicePage/HairDyeingService/HairDyeingServiceDetail/HairDyeingServiceDetail";
import HairPermServiceDetail from "./components/ServicePage/HairPermService/HairPermServiceDetail/HairPermServiceDetail";
import EarCleaningServiceDetail from "./components/ServicePage/EarCleaningService/EarCleaningServiceDetail/EarCleaningServiceDetail";
import BookingService from "./components/BookingService/BookingService";
import NotFound from "./components/NotFound/NotFound";
import CreateService from "./components/Dashboard/ServiceImageContainer/CreateService";
import CreateImage from "./components/Dashboard/ServiceImageContainer/CreateImage";
import ServiceImageContainer from "./components/Dashboard/ServiceImageContainer";
import Notifications from "./components/Dashboard/Notifications";
import Statistics from "./components/Dashboard/Statistics";
import Service from "./components/HairSalonManager/Service/Service";
import OverviewDashboard from "./components/HairSalonManager/OverView/OverView";
import StaffManagement from "./components/HairSalonManager/StaffManagement/StaffManagement";
import StaffDetailManagement from "./components/HairSalonManager/StaffManagement/StaffDetailManagement/StaffDetailManagement";
import StylistManagement from "./components/HairSalonManager/StylistManagement/StylistManagement";
import StylistDetailManagement from "./components/HairSalonManager/StylistManagement/StylistDetailManagement/StylistDetailManagement";
import MassageRelaxService from "./components/ServicePage/MassageRelaxService/MassageRelaxService";
import EarCleaningService from "./components/ServicePage/EarCleaningService/EarCleaningService";
import BookingConfirmation from "./components/BookingService/BookingSuccess";
import PickingStylish from "./components/Dashboard/AppointmentManagement/PickingStylist";
import PaymentCounter from "./components/Dashboard/AppointmentManagement/PaymentCounter";
import DashboardSalonStaff from "./components/Dashboard/AppointmentManagement/DashboardSalonStaff";
import SalonStaffDashboard from "./components/Dashboard/SalonStaffDashboard";
import AccountProfile from "./components/Profile/AccountProfile";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Các route công khai */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* Route dịch vụ - có thể cho phép truy cập không cần đăng nhập */}
      <Route path="/haircutservice" element={<HairCutService />} />
      <Route path="/hairdyeingservice" element={<HairDyeingService />} />
      <Route path="/hairpermservice" element={<HairPermService />} />
      <Route path="/massageservice" element={<MassageRelaxService />} />
      <Route path="/earcleaningservice" element={<EarCleaningService />} />
      <Route path="/service/:id" element={<HairCutServiceDetail />} />
      <Route path="/massage-service/:id" element={<MassageRelaxServiceDetail />} />
      <Route path="/ear-service/:id" element={<EarCleaningServiceDetail />} />
      <Route path="/dyeing-service/:id" element={<HairDyeingServiceDetail />} />
      <Route path="/perm-service/:id" element={<HairPermServiceDetail />} />
      <Route path="/booking-service" element={<BookingService />} />
      <Route path="/all-service" element={<AllService />} />
      <Route path="/profile" element={<AccountProfile />} />
      {/* Route yêu cầu đăng nhập */}

      <Route
        path="/pickingstylist"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <PickingStylish />
          </ProtectedRoute>
        }
      />

      <Route
        path="/paymentcounter"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <PaymentCounter />
          </ProtectedRoute>
        }
      />

      <Route
        path="/SelectedField"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <SalonStaffDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/stylistcommission"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <StylistCommission />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking-success"
        element={
          <ProtectedRoute>
            <BookingConfirmation />
          </ProtectedRoute>
        }
      />
      {/* Route dành cho nhân viên salon */}
      <Route
        path="/hairsalon-staff"
        element={
          <ProtectedRoute requiredRoles={["staff", "admin"]}>
            <DashboardSalonStaff />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-service"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <CreateService />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-image"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <CreateImage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addserviceimage"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <ServiceImageContainer />
          </ProtectedRoute>
        }
      />
      {/* Route quản lý dành cho quản lý */}
      <Route
        path="/statistics"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <Statistics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/service-management"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <Service />
          </ProtectedRoute>
        }
      />

      <Route
        path="/overview-management"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <OverviewDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/staff-management"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <StaffManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/staff-detail/:id"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <StaffDetailManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/stylist-management"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <StylistManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/stylist-detail/:id"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <StylistDetailManagement />
          </ProtectedRoute>
        }
      />

      {/* Trang không được phép truy cập */}
      <Route path="/404" element={<NotFound />} />

      {/* Catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
