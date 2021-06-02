import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.svg";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import ProfileButton from "./ProfileButton";

const Navbar: React.FC = () => {
  const { user } = useAuth();
  return (
    <nav className="sm:h-20 h-16 py-4 sm:px-8 px-4 items-center justify-between flex">
      <Link to="/" className="h-full">
        <img className="h-full" src={logo} alt="Aposcar" />
      </Link>
      <div className="space-x-2">
        {user ? (
          <ProfileButton />
        ) : (
          <>
            <Button styleType="primary">
              <Link className="w-full h-full" to={"/login"}>
                Login
              </Link>
            </Button>
            <Button styleType="secondary">
              <Link className="w-full h-full" to={"/register"}>
                Register
              </Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
