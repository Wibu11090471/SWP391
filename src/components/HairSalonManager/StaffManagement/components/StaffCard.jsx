import React from "react";
import { Card, CardContent } from "../../../../ui/card";
import { Button } from "../../../../ui/button";
import { Badge } from "../../../../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../../../../ui/avatar";
import { 
  Pencil, 
  Trash2, 
  Phone, 
  Mail, 
  Calendar 
} from "lucide-react";
import theme from "../../../../theme";

const StaffCard = ({ 
  member, 
  navigateToStaffDetail, 
  openEditDialog, 
  openDeleteDialog 
}) => {
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
            onClick={() => navigateToStaffDetail(member.id)}
          >
            <AvatarImage src={member.avatar} />
            <AvatarFallback
              style={{
                backgroundColor: theme.colors.primary.light,
                color: theme.colors.background.primary,
              }}
            >
              {member.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex justify-between items-center">
              <h3
                className="text-lg font-semibold cursor-pointer"
                onClick={() => navigateToStaffDetail(member.id)}
                style={{ color: theme.colors.text.primary }}
              >
                {member.name}
              </h3>
              <Badge
                style={{
                  backgroundColor:
                    member.status === "active"
                      ? theme.colors.accent.DEFAULT
                      : theme.colors.secondary.dark,
                  color: theme.colors.background.primary,
                }}
              >
                {member.status === "active" ? "Đang Làm" : "Nghỉ Việc"}
              </Badge>
            </div>
            <div
              className="text-sm space-y-1"
              style={{ color: theme.colors.text.secondary }}
            >
              <div className="flex items-center">
                <Phone
                  className="h-4 w-4 mr-2"
                  style={{ color: theme.colors.primary.light }}
                />
                {member.phone}
              </div>
              <div className="flex items-center">
                <Mail
                  className="h-4 w-4 mr-2"
                  style={{ color: theme.colors.primary.light }}
                />
                {member.email}
              </div>
              <div className="flex items-center">
                <Calendar
                  className="h-4 w-4 mr-2"
                  style={{ color: theme.colors.primary.light }}
                />
                {member.hireDate}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => openEditDialog(member)}
            style={{
              borderColor: theme.colors.primary.light,
              color: theme.colors.primary.DEFAULT,
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => openDeleteDialog(member)}
            style={{
              backgroundColor: theme.colors.secondary.dark,
              color: theme.colors.background.primary,
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffCard;