import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="flex-1 flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
