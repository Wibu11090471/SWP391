import React from "react";
import { Card, CardContent } from "../../../../ui/card";
import { Badge } from "../../../../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../../../../ui/avatar";
import { CircleUserRound, AtSign } from "lucide-react";
import theme from "../../../../theme";

const StylistCard = ({ member = {}, navigateToStylistDetail }) => {
  const {
    id = "",
    fullName = "Không rõ",
    userName = "",
    role = "Stylist",
    status = false,
    avatar = "",
  } = member;

  const handleCardClick = () => navigateToStylistDetail(id);

  return (
    <Card
      className="hover:shadow-lg transition-shadow"
      style={{
        backgroundColor: theme.colors.background.secondary,
        borderColor: theme.colors.primary.light,
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar
            className="h-16 w-16 cursor-pointer"
            onClick={handleCardClick}
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

          <div className="flex-grow">
            <div className="flex justify-between items-center">
              <h3
                className="text-lg font-semibold cursor-pointer"
                onClick={handleCardClick}
                style={{ color: theme.colors.text.primary }}
              >
                {fullName}
              </h3>
              <Badge
                style={{
                  backgroundColor: status
                    ? theme.colors.accent.DEFAULT
                    : theme.colors.secondary.dark,
                  color: theme.colors.background.primary,
                }}
              >
                {status ? "Đang Hoạt Động" : "Ngưng Hoạt Động"}
              </Badge>
            </div>

            <div
              className="text-sm space-y-1"
              style={{ color: theme.colors.text.secondary }}
            >
              <div className="flex items-center">
                <CircleUserRound
                  className="h-4 w-4 mr-2"
                  style={{ color: theme.colors.primary.light }}
                />
                {role}
              </div>
              <div className="flex items-center">
                <AtSign
                  className="h-4 w-4 mr-2"
                  style={{ color: theme.colors.primary.light }}
                />
                {userName || "Chưa cập nhật"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StylistCard;
