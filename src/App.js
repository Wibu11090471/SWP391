import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import ScrollToTop from "./ScrollToTop";
import Sidebar from "./components/HairSalonManager/SideBar";
import OverView from "./components/HairSalonManager/OverView/OverView";
import SalonRevenueDashboard from "./components/HairSalonManager/Revenue/Revenue";
import StaffManagement from "./components/HairSalonManager/StaffManagement/StaffManagement";

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Header />
        <AppRoutes />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
