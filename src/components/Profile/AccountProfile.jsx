import React, { useState, useEffect } from "react";
import { User, Mail, Calendar, MapPin, Earth, Edit, Save } from "lucide-react";
import axios from "axios";

const AccountProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://localhost:7081/api/User/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data);
        setEditedProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        // TODO: Add proper error handling and user notification
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://localhost:7081/api/User/profile",
        editedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setProfile(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      // TODO: Add proper error handling and user notification
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#8B4513]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w pt-24">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#8B4513] p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#FDF5E6]">Hồ Sơ Cá Nhân</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-[#FDF5E6] hover:bg-[#915C38] p-2 rounded-full transition-colors"
          >
            {isEditing ? <Save /> : <Edit />}
          </button>
        </div>

        <div className="p-6 space-y-4">
          <ProfileField
            icon={<User className="text-[#8B4513]" />}
            label="Tên Đầy Đủ"
            value={
              isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={editedProfile.fullName}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                profile.fullName
              )
            }
            isEditing={isEditing}
          />

          <ProfileField
            icon={<Mail className="text-[#8B4513]" />}
            label="Email"
            value={
              isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                profile.email
              )
            }
            isEditing={isEditing}
          />

          <ProfileField
            icon={
              profile.gender === "Male" ? (
                <Earth className="text-[#8B4513]" />
              ) : (
                <Earth className="text-[#8B4513]" />
              )
            }
            label="Giới Tính"
            value={profile.gender === "Male" ? "Nam" : "Nữ"}
          />

          <ProfileField
            icon={<Calendar className="text-[#8B4513]" />}
            label="Ngày Sinh"
            value={
              isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={editedProfile.dob}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                new Date(profile.dob).toLocaleDateString()
              )
            }
            isEditing={isEditing}
          />

          <ProfileField
            icon={<MapPin className="text-[#8B4513]" />}
            label="Địa Chỉ"
            value={
              isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={editedProfile.address}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                profile.address
              )
            }
            isEditing={isEditing}
          />

          <div className="grid grid-cols-2 gap-4">
            <ProfileField label="Tên Đăng Nhập" value={profile.userName} />
            <ProfileField
              label="Vai Trò"
              value={profile.role === "user" ? "Khách Hàng" : profile.role}
            />
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-[#8B4513] text-white rounded hover:bg-[#915C38]"
              >
                Lưu Thay Đổi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ icon, label, value, isEditing }) => (
  <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
    {icon && (
      <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
    )}
    <div className="flex-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

export default AccountProfile;
