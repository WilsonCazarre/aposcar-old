import React from "react";
import AposcarLogo from "../assets/icons/AposcarLogo";
import Button from "./Button";
import { useRouter } from "next/router";
import Link from "next/link";
import useAuth from "../lib/useAuth";
import { LogoutIcon } from "@heroicons/react/outline";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../utils/constants";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    localStorage.removeItem(REFRESH_TOKEN_NAME);
  };

  return (
    <nav className="px-10 py-3 flex justify-between items-center flex-none">
      <Link href="/">
        <a>
          <AposcarLogo />
        </a>
      </Link>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <button onClick={logout}>
              <LogoutIcon className="text-white w-7 h-7 rotate-180" />
            </button>
            <Button
              color="primary"
              onClick={() => router.push(`/profile/${user.name}`)}
            >
              Go to profile
            </Button>
          </div>
        ) : (
          <Button color="primary" onClick={() => router.push("/register")}>
            Register
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
