import React from "react";
import AposcarLogo from "../assets/icons/AposcarLogo";
import Button from "./Button";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const router = useRouter();
  return (
    <nav className="px-10 py-3 flex justify-between items-center flex-none">
      <AposcarLogo />
      <div className="underline">
        <Button color="primary" onClick={() => router.push("/register")}>
          Register
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
