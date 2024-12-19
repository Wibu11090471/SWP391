import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./components/Login/Login";
import Home from "./components/HomePage/HairSalonHome";
import NotFound from "./components/NotFound/NotFound";
import CreateService from "./components/Dashboard/AppointmentManagement/ServiceImageContainer/CreateService";
import CreateImage from "./components/Dashboard/AppointmentManagement/ServiceImageContainer/CreateImage";
import ServiceImageContainer from "./components/Dashboard/ServiceImageContainer";
import HistoryPayment from "./components/Dashboard/HistoryPayment";
import Statistics from "./components/Dashboard/Statistics";
import Service from "./components/HairSalonManager/Service/Service";
import OverviewDashboard from "./components/HairSalonManager/OverView/OverView";
import StaffManagement from "./components/HairSalonManager/StaffManagement/StaffManagement";
import StaffDetailManagement from "./components/HairSalonManager/StaffManagement/StaffDetailManagement/StaffDetailManagement";
import StylistManagement from "./components/HairSalonManager/StylistManagement/StylistManagement";
import StylistDetailManagement from "./components/HairSalonManager/StylistManagement/StylistDetailManagement/StylistDetailManagement";
import PickingStylish from "./components/Dashboard/AppointmentManagement/PickingStylist";
import PaymentCounter from "./components/Dashboard/AppointmentManagement/PaymentCounter";
import DashboardSalonStaff from "./components/Dashboard/AppointmentManagement/DashboardSalonStaff";
import SalonStaffDashboard from "./components/Dashboard/SalonStaffDashboard";
import AccountProfile from "./components/Profile/AccountProfile";
import StylistCommission from "./components/Dashboard/StylistCommission/StylistCommission";
import ServiceList from "./components/ServicePage/ServiceList/ServiceList";
import ServiceDetail from "./components/ServicePage/ServiceDetail/ServiceDetail";
import BookingService from "./components/BookingService/BookingService";
import BookingConfirmation from "./components/BookingService/BookingConfirmation";
import StylistSalary from "./components/StylistSalary/StylistSalary";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Các route công khai */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* Route dịch vụ - có thể cho phép truy cập không cần đăng nhập */}
      <Route path="/profile" element={<AccountProfile />} />
      <Route path="/services/:categoryId" element={<ServiceList />} />
      <Route path="/service/:serviceId" element={<ServiceDetail />} />
      <Route path="/booking/:serviceId" element={<BookingService />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />

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
        path="/stylist-calender"
        element={
          <ProtectedRoute requiredRoles={["stylist"]}>
            <StylistSalary />
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
        path="/history"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <HistoryPayment />
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
