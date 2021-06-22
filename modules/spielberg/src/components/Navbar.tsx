import React from "react";
import AposcarLogo from "../assets/icons/AposcarLogo";
import Button from "./Button";

const Navbar: React.FC = () => {
  return (
    <nav className="px-10 py-3 flex justify-between items-center flex-none">
      <AposcarLogo />
      <div className="underline">
        <Button color="primary">Register</Button>
      </div>
    </nav>
  );
};

export default Navbar;
