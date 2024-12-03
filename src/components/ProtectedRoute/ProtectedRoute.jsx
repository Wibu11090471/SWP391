import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  // Kiểm tra token và vai trò
  const isAuthenticated = !!token;
  const hasRequiredRole = !requiredRoles || (user && requiredRoles.includes(user.role));

  if (!isAuthenticated) {
    // Chưa đăng nhập, chuyển về trang login
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  if (requiredRoles && !hasRequiredRole) {
    // Không có quyền truy cập
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;