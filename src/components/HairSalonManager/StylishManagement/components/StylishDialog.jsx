import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "../../../../ui/dialog";
import { Button } from "../../../../ui/button";
import { Input } from "../../../../ui/input";
import { Label } from "../../../../ui/label";
import { X } from "lucide-react";
import theme from "../../../../theme";

const StylishDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  isAddMode,
  formData,
  handleInputChange,
  handleAddStylish,
  handleUpdateStylish
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent
        className="sm:max-w-[600px]"
        style={{
          backgroundColor: theme.colors.background.primary,
          borderColor: theme.colors.primary.light,
        }}
      >
        <DialogHeader>
          <DialogTitle
            style={{
              color: theme.colors.text.primary,
            }}
          >
            {isAddMode
              ? "Thêm Stylish Mới"
              : "Chỉnh Sửa Thông Tin Stylish"}
          </DialogTitle>
          <DialogDescription
            style={{
              color: theme.colors.text.secondary,
            }}
          >
            {isAddMode
              ? "Nhập thông tin cho Stylish mới"
              : "Cập nhật thông tin cho Stylish đã chọn"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Name Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right"
              style={{ color: theme.colors.text.primary }}
            >
              Tên Stylish
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Nhập tên Stylish"
              style={{
                borderColor: theme.colors.primary.light,
                backgroundColor: theme.colors.background.primary,
              }}
            />
          </div>

          {/* Position Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="position"
              className="text-right"
              style={{ color: theme.colors.text.primary }}
            >
              Chức Vụ
            </Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Nhập chức vụ"
              style={{
                borderColor: theme.colors.primary.light,
                backgroundColor: theme.colors.background.primary,
              }}
            />
          </div>

          {/* Phone Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="phone"
              className="text-right"
              style={{ color: theme.colors.text.primary }}
            >
              Số Điện Thoại
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Nhập số điện thoại"
              style={{
                borderColor: theme.colors.primary.light,
                backgroundColor: theme.colors.background.primary,
              }}
            />
          </div>

          {/* Hire Date Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="hireDate"
              className="text-right"
              style={{ color: theme.colors.text.primary }}
            >
              Ngày Bắt Đầu
            </Label>
            <Input
              id="hireDate"
              name="hireDate"
              type="date"
              value={formData.hireDate}
              onChange={handleInputChange}
              className="col-span-3"
              style={{
                borderColor: theme.colors.primary.light,
                backgroundColor: theme.colors.background.primary,
              }}
            />
          </div>

          {/* Status Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="status"
              className="text-right"
              style={{ color: theme.colors.text.primary }}
            >
              Trạng Thái
            </Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="col-span-3 p-2 border rounded"
              style={{
                borderColor: theme.colors.primary.light,
                backgroundColor: theme.colors.background.primary,
                color: theme.colors.text.primary,
              }}
            >
              <option value="active">Đang Làm</option>
              <option value="inactive">Nghỉ Việc</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
            style={{
              borderColor: theme.colors.primary.dark,
              color: theme.colors.text.primary,
            }}
          >
            <X className="mr-2 h-4 w-4" /> Hủy
          </Button>
          <Button
            onClick={isAddMode ? handleAddStylish : handleUpdateStylish}
            style={{
              backgroundColor: theme.colors.primary.DEFAULT,
              color: theme.colors.background.primary,
            }}
          >
            {isAddMode ? "Thêm Stylish" : "Cập Nhật"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StylishDialog;