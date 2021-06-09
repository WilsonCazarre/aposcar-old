import React from "react";

const Card: React.FC = ({ children }) => {
  return <div className="bg-gray-800 border-2 border-gray-600">{children}</div>;
};

export default Card;
