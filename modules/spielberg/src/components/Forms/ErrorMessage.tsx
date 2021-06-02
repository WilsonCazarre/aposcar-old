import React from "react";

const ErrorMessage: React.FC = ({ children }) => {
  return <div className="text-left text-sm pl-1 text-red-500">{children}</div>;
};

export default ErrorMessage;
