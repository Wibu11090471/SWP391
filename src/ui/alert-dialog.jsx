import React from "react";
import { cn } from "../lib/utils";
import { Dialog } from "./dialog"; // Adjust import path as needed

const AlertDialog = ({ open, onOpenChange, children }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  );
};

const AlertDialogTrigger = ({ children, ...props }) => {
  return React.cloneElement(children, props);
};

const AlertDialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        className
      )}
      {...props}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        {children}
      </div>
    </div>
  )
);

const AlertDialogHeader = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  )
);

const AlertDialogTitle = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-xl font-bold text-gray-900 mb-2", className)}
      {...props}
    >
      {children}
    </h2>
  )
);

const AlertDialogDescription = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-gray-600", className)} {...props}>
      {children}
    </p>
  )
);

const AlertDialogFooter = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex justify-end space-x-2 mt-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);

const AlertDialogCancel = ({ children, className, ...props }) => (
  <button
    className={cn(
      "px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200",
      className
    )}
    {...props}
  >
    {children || "Hủy"}
  </button>
);

const AlertDialogAction = ({ children, className, ...props }) => (
  <button
    className={cn(
      "px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600",
      className
    )}
    {...props}
  >
    {children || "Xác Nhận"}
  </button>
);

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
};
