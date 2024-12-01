import React, { useState } from "react";
import Layout from "../../Layout";
import { Card, CardContent, CardHeader } from "../../../../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../../../ui/avatar";
import { 
  UserCircle2, 
  Smartphone, 
  AtSign, 
  CalendarCheck, 
  UserCheck, 
  BookUser, 
  Briefcase, 
  CreditCard, 
  Percent, 
  Banknote, 
  StarHalf, 
  PieChart, 
  Scissors, 
  Paintbrush, 
  TrendingUp 
} from "lucide-react";
import { useParams } from "react-router-dom";
import theme from "../../../../theme";
import { Button } from "../../../../ui/button";

const StylishDetailManagement = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("profile");
  
  const stylishData = {
    1: {
      id: 1,
      name: "Nguyễn Văn A",
      position: "Quản Lý",
      phone: "0987654321",
      email: "nguyenvana@example.com",
      hireDate: "2023-01-15",
      status: "active",
      avatar: "",
      bio: "Nhân viên quản lý với 3 năm kinh nghiệm tại salon",
      specialization: "Cắt tóc nam, chăm sóc khách hàng",
      salary: {
        base: 15000000, // VND
        commission: 0.1, // 10% commission
        totalCommission: 5000000, // VND
        workDays: 25,
        performanceBonus: 2000000,
      },
      performance: {
        totalCustomers: 150,
        servicesSold: {
          haircut: 80,
          dyeing: 40,
          perm: 30
        },
        customerSatisfaction: 4.8,
        monthlyRevenue: 75000000 // VND
      },
      scheduleShift: {
        morning: "7:00 - 12:00",
        afternoon: "13:00 - 18:00"
      }
    },
    2: {
      id: 2,
      name: "Trần Thị B",
      position: "Nhân Viên Salon",
      phone: "0123456789",
      email: "tranthib@example.com",
      hireDate: "2022-06-20",
      status: "active",
      avatar: "",
      bio: "Chuyên viên tạo mẫu tóc với kỹ năng nhuộm và uốn cao cấp",
      specialization: "Nhuộm tóc, uốn tóc chuyên nghiệp",
      salary: {
        base: 12000000, // VND
        commission: 0.12, // 12% commission
        totalCommission: 4500000, // VND
        workDays: 22,
        performanceBonus: 1800000,
      },
      performance: {
        totalCustomers: 120,
        servicesSold: {
          haircut: 50,
          dyeing: 60,
          perm: 50
        },
        customerSatisfaction: 4.7,
        monthlyRevenue: 65000000 // VND
      },
      scheduleShift: {
        morning: "8:00 - 13:00",
        afternoon: "14:00 - 19:00"
      }
    }
  };

  const stylish = stylishData[id];

  if (!stylish) {
    return <div>Nhân viên không tồn tại</div>;
  }

  const renderProfileTab = () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <Smartphone 
          className="mr-4" 
          style={{ color: theme.colors.primary.light }}
        />
        <span>{stylish.phone}</span>
      </div>
      <div className="flex items-center">
        <AtSign 
          className="mr-4" 
          style={{ color: theme.colors.primary.light }}
        />
        <span>{stylish.email}</span>
      </div>
      <div className="flex items-center">
        <CalendarCheck 
          className="mr-4" 
          style={{ color: theme.colors.primary.light }}
        />
        <span>Ngày bắt đầu: {stylish.hireDate}</span>
      </div>
      <div className="flex items-center">
        <UserCheck 
          className="mr-4" 
          style={{ color: theme.colors.primary.light }}
        />
        <span>
          Trạng thái: {stylish.status === 'active' ? 'Đang làm' : 'Nghỉ việc'}
        </span>
      </div>
      
      {stylish.bio && (
        <div className="mt-4">
          <h3 
            className="font-semibold mb-2"
            style={{ color: theme.colors.text.primary }}
          >
            <BookUser 
              className="inline-block mr-2" 
              style={{ color: theme.colors.primary.light }}
            />
            Giới thiệu
          </h3>
          <p>{stylish.bio}</p>
        </div>
      )}
      
      {stylish.specialization && (
        <div className="mt-4">
          <h3 
            className="font-semibold mb-2"
            style={{ color: theme.colors.text.primary }}
          >
            <Briefcase 
              className="inline-block mr-2" 
              style={{ color: theme.colors.primary.light }}
            />
            Chuyên môn
          </h3>
          <p>{stylish.specialization}</p>
        </div>
      )}
    </div>
  );

  const renderSalaryTab = () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <CreditCard 
          className="mr-4" 
          style={{ color: theme.colors.primary.light }}
        />
        <span>Lương cơ bản: {stylish.salary.base.toLocaleString()} VND</span>
      </div>
      <div className="flex items-center">
        <Percent 
          className="mr-4" 
          style={{ color: theme.colors.primary.light }}
        />
        <span>Hoa hồng: {stylish.salary.commission * 100}%</span>
      </div>
      <div className="flex items-center">
        <CalendarCheck 
          className="mr-4" 
          style={{ color: theme.colors.primary.light }}
        />
        <span>Số ngày làm việc: {stylish.salary.workDays} ngày</span>
      </div>
      <div className="flex items-center">
        <TrendingUp 
          className="mr-4" 
          style={{ color: theme.colors.primary.light }}
        />
        <span>Tổng hoa hồng: {stylish.salary.totalCommission.toLocaleString()} VND</span>
      </div>
      <div className="flex items-center">
        <Banknote 
          className="mr-4" 
          style={{ color: theme.colors.primary.light }}
        />
        <span>Thưởng hiệu suất: {stylish.salary.performanceBonus.toLocaleString()} VND</span>
      </div>
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <UserCircle2 
          className="mr-4" 
          style={{ color: theme.colors.primary.light }}
        />
        <span>Tổng số khách hàng: {stylish.performance.totalCustomers}</span>
      </div>
      <div className="flex items-center">
        <PieChart 
          className="mr-4" 
          style={{ color: theme.colors.primary.light }}
        />
        <span>Doanh thu tháng: {stylish.performance.monthlyRevenue.toLocaleString()} VND</span>
      </div>
      <div>
        <h3 
          className="font-semibold mb-2"
          style={{ color: theme.colors.text.primary }}
        >
          Dịch vụ đã bán
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center">
            <Scissors 
              className="mr-2" 
              size={16} 
              style={{ color: theme.colors.primary.light }}
            />
            Cắt tóc: {stylish.performance.servicesSold.haircut}
          </div>
          <div className="flex items-center">
            <Paintbrush 
              className="mr-2" 
              size={16} 
              style={{ color: theme.colors.primary.light }}
            />
            Nhuộm tóc: {stylish.performance.servicesSold.dyeing}
          </div>
          <div className="flex items-center">
            <Paintbrush 
              className="mr-2" 
              size={16} 
              style={{ color: theme.colors.primary.light }}
            />
            Uốn tóc: {stylish.performance.servicesSold.perm}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <StarHalf 
          className="mr-4" 
          style={{ color: theme.colors.primary.light }}
        />
        <span>Đánh giá khách hàng: {stylish.performance.customerSatisfaction}/5</span>
      </div>
    </div>
  );

  return (
    <Layout>
      <div 
        className="min-h-screen pt-24 pl-5 pr-5"
        style={{
          backgroundColor: theme.colors.background.primary,
          color: theme.colors.text.primary
        }}
      >
        <Card 
          className="max-w-3xl mx-auto shadow-xl"
          style={{
            backgroundColor: theme.colors.background.secondary,
            borderColor: theme.colors.primary.DEFAULT
          }}
        >
          <CardHeader 
            className="border-b flex items-center space-x-4 p-6"
            style={{
              backgroundColor: theme.colors.secondary.light,
              borderBottomColor: theme.colors.primary.dark
            }}
          >
            <Avatar className="h-24 w-24">
              <AvatarImage src={stylish.avatar} />
              <AvatarFallback
                style={{
                  backgroundColor: theme.colors.primary.light,
                  color: theme.colors.background.primary,
                }}
              >
                {stylish.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 
                className="text-2xl font-bold"
                style={{ color: theme.colors.text.primary }}
              >
                {stylish.name}
              </h2>
              <p 
                className="text-sm"
                style={{ color: theme.colors.text.secondary }}
              >
                {stylish.position}
              </p>
            </div>
          </CardHeader>
          
          <div className="flex border-b">
            <Button 
              variant={activeTab === "profile" ? "default" : "ghost"}
              onClick={() => setActiveTab("profile")}
              className="w-full"
            >
              Thông Tin
            </Button>
            <Button 
              variant={activeTab === "salary" ? "default" : "ghost"}
              onClick={() => setActiveTab("salary")}
              className="w-full"
            >
              Lương
            </Button>
            <Button 
              variant={activeTab === "performance" ? "default" : "ghost"}
              onClick={() => setActiveTab("performance")}
              className="w-full"
            >
              Hiệu Suất
            </Button>
          </div>
          
          <CardContent className="p-6">
            {activeTab === "profile" && renderProfileTab()}
            {activeTab === "salary" && renderSalaryTab()}
            {activeTab === "performance" && renderPerformanceTab()}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StylishDetailManagement;