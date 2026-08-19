import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // Button text or content
  type?: 'button' | 'submit' | 'reset';
  size?: "sm" | "md"; // Button size
  variant?: "primary" | "outline"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
}

const Button: React.FC<ButtonProps> = (
    {
        children,
        type = 'button',
        size = "md",
        variant = "primary",
        startIcon,
        endIcon,
        onClick,
        className = "",
        disabled = false,
    }
) => {
        const sizeClasses = {
        sm: "px-3 py-2.5 text-sm",
        md: "px-4 py-3.7 text-sm",
    };

    const variantClasses = {
        primary:
        "border border-gray-300 bg-gray-white leading-5 text-gray-900 shadow-md transition-all duration-200 focus:outline-none",
        outline:
        "border border-gray-300 bg-white leading-5 text-gray-900",
    };

      return (
    <button
      className={`inline-flex  items-center justify-center cursor-pointer font-medium gap-2 rounded-lg transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
