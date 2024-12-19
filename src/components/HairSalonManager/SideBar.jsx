import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, UserIcon, Users, Shirt, Menu, Folder } from "lucide-react";

const Sidebar = ({ topOffset = 80, bottomOffset = 0, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("overview");
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: Home,
      route: "/overview-management",
    },
    {
      id: "category",
      label: "Category Management",
      icon: Folder,
      route: "/category-management",
    },
    {
      id: "user",
      label: "User Management",
      icon: UserIcon,
      route: "/user-management",
    },
    {
      id: "staff-management",
      label: "Staff Management",
      icon: Users,
      route: "/staff-management",
    },
    {
      id: "stylist-management",
      label: "Stylist Management",
      icon: Shirt,
      route: "/stylist-management",
    },
  ];

  // Automatically update active item based on current route
  useEffect(() => {
    const currentRoute = location.pathname;
    const matchedItem = menuItems.find((item) => item.route === currentRoute);
    if (matchedItem) {
      setActiveItem(matchedItem.id);
    }
  }, [location.pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    navigate(item.route);
  };

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`
        fixed left-0 top-0 
        transition-all duration-300 ease-in-out
        ${isExpanded ? "border-r shadow-md w-64" : "w-16"}
        z-50
        ${className}
      `}
      style={{
        top: `${topOffset}px`,
        bottom: `${bottomOffset}px`,
        height: `calc(100vh - ${topOffset + bottomOffset}px)`,
        backgroundColor: isExpanded ? "#FDF5E6" : "transparent",
        borderColor: "#A0522D",
      }}
    >
      <div
        className={`
        p-2 text-center border-b flex items-center justify-center
        ${isExpanded ? "border-b" : "border-none"}
      `}
        style={{
          borderColor: "#A0522D",
          color: "#3E2723",
        }}
      >
        {isExpanded ? (
          <span className="font-bold text-xl flex-grow text-center">
            Dashboard
          </span>
        ) : (
          <Menu className="opacity-50 hover:opacity-100" color="#3E2723" />
        )}
      </div>
      <nav
        className="p-2 overflow-y-auto"
        style={{
          maxHeight: `calc(100vh - ${topOffset + bottomOffset + 100}px)`,
        }}
      >
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`
              flex items-center p-3 mb-2 cursor-pointer rounded-md 
              transition-all duration-200 ease-in-out
              ${
                activeItem === item.id && isExpanded
                  ? "text-white"
                  : "text-gray-700"
              }
              ${isExpanded ? "justify-start" : "justify-center"}
              ${isExpanded ? "opacity-100" : "opacity-0 hover:opacity-50"}
            `}
            style={{
              backgroundColor:
                activeItem === item.id && isExpanded
                  ? "#8B4513"
                  : "transparent",
              borderColor: "#A0522D",
              color: activeItem === item.id && isExpanded ? "white" : "#3E2723",
            }}
          >
            <item.icon
              size={20}
              color={activeItem === item.id && isExpanded ? "white" : "#3E2723"}
              className={isExpanded ? "opacity-100" : "opacity-50"}
            />
            {isExpanded && (
              <span className="ml-3 text-sm font-medium">{item.label}</span>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
