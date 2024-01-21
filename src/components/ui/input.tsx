import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  outline?: boolean;
  type?: string;
  icon?: React.ReactNode; // Nova propriedade "icon"
  side?: "left" | "right"; // Nova propriedade "side"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, side = "right", ...props }, ref) => {
    const [inputType, setInputType] = React.useState(type);

    const togglePasswordVisibility = () => {
      setInputType((prevType) => (prevType === "password" ? "text" : "password"));
    };

    const inputFieldType = type === "password" ? inputType : type;

    return (
      <div className="relative">
        {icon && side === "left" && (
          <div className="absolute top-3 left-3">
            {icon}
          </div>
        )}
        <input
          type={inputFieldType}
          className={cn(
            `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50
            ${props.outline ? '' : 'ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'}`,
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && side === "right" && (
          <div className="absolute top-3 right-3">
            {icon}
          </div>
        )}
        {type === "password" && (
          <button
            type="button"
            className="absolute top-3 right-3 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {inputType === "password" ? (
              <Icons.eyeOff className="h-5 w-5 text-primary" />
            ) : (
              <Icons.eye className="h-5 w-5 text-primary" />
            )}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
