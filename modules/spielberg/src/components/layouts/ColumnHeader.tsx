import React from "react";

const ColumnHeader: React.FC = ({ children }) => {
  return (
    <div className="flex h-16 text-center flex-none justify-center flex-col">
      {children}
    </div>
  );
};

export default ColumnHeader;
