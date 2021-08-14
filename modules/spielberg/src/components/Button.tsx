import React from "react";
import Loader from "react-loader-spinner";
import { APOSCAR_YELLOW } from "../utils/constants";

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
  const { className, disabled, loading, ...rest } = props;

  return (
    <button
      className={`${commonClassName} ${colorClassNames[color]} h-8 ${
        className ?? ""
      } ${disabled || loading ? "cursor-not-allowed" : ""}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <div className="mx-auto">
          <Loader
            type={"ThreeDots"}
            color={color === "secondary" ? APOSCAR_YELLOW : "white"}
            height="1em"
            width="100%"
            radius={1}
          />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
