import React, { ReactNode } from "react";

interface Props {
  header?: ReactNode;
}

const Card: React.FC<Props> = ({ children, header }) => {
  return (
    <div className="bg-gray-800 border border-gray-600 rounded w-full">
      {header && <div className="border-b border-gray-600 p-2">{header}</div>}

      <div className="p-2">{children}</div>
    </div>
  );
};

export default Card;
