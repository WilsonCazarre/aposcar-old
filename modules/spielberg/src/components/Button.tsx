import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styleType: "primary" | "secondary" | "disabled";
}

const Button: React.FC<Props> = ({
  className,
  styleType,
  children,
  disabled,
  ...rest
}) => {
  const buttonStyles = {
    primary: "text-black bg-yellow",
    secondary: "text-white bg-gray-700",
    disabled: "text-black bg-gray-500 cursor-not-allowed",
  };

  const styleClass = `
    py-1 px-6 rounded outline-none appearance-none
    ${buttonStyles[styleType]}
    ${className ?? ""}
  `;

  return (
    <button {...rest} className={styleClass}>
      {children}
    </button>
  );
};

export default Button;
