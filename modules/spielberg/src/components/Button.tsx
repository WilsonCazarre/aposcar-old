import React from "react";

const colorClassNames = {
  primary: "bg-yellow text-gray-800",
  secondary: "bg-gray-700 text-50",
};

interface Props {
  loading?: boolean;
  color: keyof typeof colorClassNames;
}

const Button: React.FC<Props> = ({ color, children }) => {
  const commonClassName = "py-1 px-6 text-center rounded";

  return (
    <button className={`${commonClassName} ${colorClassNames[color]}`}>
      {children}
    </button>
  );
};

export default Button;
