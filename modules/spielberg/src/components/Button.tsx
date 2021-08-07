import React from "react";

const colorClassNames = {
  primary: "bg-yellow text-gray-800",
  secondary: "bg-gray-700 text-50",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  color: keyof typeof colorClassNames;
}

const Button: React.FC<ButtonProps> = ({ color, children, ...props }) => {
  const commonClassName = "py-1 px-6 text-center rounded";
  const { className, disabled, ...rest } = props;

  return (
    <button
      className={`${commonClassName} ${colorClassNames[color]} ${
        className ?? ""
      } ${disabled ? "cursor-not-allowed" : ""}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
