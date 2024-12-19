import React from "react";
import { Card, CardContent } from "../../../../ui/card";
import { Badge } from "../../../../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../../../../ui/avatar";
import { CircleUserRound, AtSign, CheckCircle, XCircle } from "lucide-react";
import theme from "../../../../theme";

const UserCard = ({ member = {}, navigateToUserDetail }) => {
  const {
    id = "",
    fullName = "Không rõ",
    userName = "",
    role = "User",
    status = false,
    avatar = "",
  } = member;

  const handleCardClick = () => navigateToUserDetail(id);

  return (
    <Card
      className="hover:shadow-lg transition-shadow relative"
      style={{
        backgroundColor: theme.colors.background.secondary,
        border: `1px solid ${theme.colors.primary.light}`,
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-6">
          {/* Avatar Section */}
          <Avatar
            className="h-20 w-20 cursor-pointer shadow-md"
            onClick={handleCardClick}
            style={{
              border: `2px solid ${theme.colors.primary.light}`,
            }}
          >
            <AvatarImage src={avatar} />
            <AvatarFallback
              style={{
                backgroundColor: theme.colors.primary.light,
                color: theme.colors.background.primary,
              }}
            >
              {fullName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Info Section */}
          <div className="flex-grow">
            <div className="flex justify-between items-center">
              <h3
                className="text-xl font-bold cursor-pointer"
                onClick={handleCardClick}
                style={{ color: theme.colors.text.primary }}
              >
                {fullName}
              </h3>
            </div>

            <div
              className="text-sm mt-2 space-y-1"
              style={{ color: theme.colors.text.secondary }}
            >
              <div className="flex items-center">
                <CircleUserRound
                  className="h-5 w-5 mr-2"
                  style={{ color: theme.colors.primary.light }}
                />
                {role}
              </div>
              <div className="flex items-center">
                <AtSign
                  className="h-5 w-5 mr-2"
                  style={{ color: theme.colors.primary.light }}
                />
                {userName || "Chưa cập nhật"}
              </div>
            </div>
          </div>
        </div>

        {/* Badge and Status Section */}
        <div className="flex justify-between items-center mt-6">
          <Badge
            className="px-3 py-1 rounded-full text-sm flex items-center"
            style={{
              backgroundColor: status
                ? theme.colors.accent.DEFAULT
                : theme.colors.secondary.dark,
              color: theme.colors.background.primary,
            }}
          >
            {status ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Đang Hoạt Động
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 mr-2" />
                Ngưng Hoạt Động
              </>
            )}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
