import React from "react";

const PageWrapper: React.FC = ({ children }) => {
  return <div className="p-4 sm:px-8 h-full pb-10">{children}</div>;
};

export default PageWrapper;
