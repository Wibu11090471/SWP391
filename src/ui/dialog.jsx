import React from "react";
import { cn } from "../lib/utils";

const Dialog = ({ open, onOpenChange, children }) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const DialogTrigger = ({ children, asChild, onClick, ...props }) => {
  return React.cloneElement(children, {
    ...props,
    onClick: (e) => {
      if (onClick) onClick(e);
    },
  });
};

const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-6 space-y-4 bg-white rounded-lg shadow-xl", className)}
      {...props}
    >
      {children}
    </div>
  )
);

const DialogHeader = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("border-b pb-4 mb-4", className)} {...props}>
      {children}
    </div>
  )
);

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-xl font-semibold text-gray-900", className)}
    {...props}
  />
));

const DialogDescription = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-gray-600", className)} {...props}>
      {children}
    </p>
  )
);

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
};
