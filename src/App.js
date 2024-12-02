import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import ScrollToTop from "./ScrollToTop";

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
