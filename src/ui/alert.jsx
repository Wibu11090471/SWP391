import * as React from "react";
import { cn } from "../lib/utils";

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => {
  let variantClasses;

  switch (variant) {
    case "destructive":
      variantClasses = "bg-red-700 text-white"; // Đỏ lòm
      break;
    case "default":
    default:
      variantClasses = "bg-green-700 text-white"; // Xanh lá
      break;
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4",
        variantClasses,
        className
      )}
      {...props}
    />
  );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
