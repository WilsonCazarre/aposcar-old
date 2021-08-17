import React from "react";
import AposcarLogo from "../../assets/icons/AposcarLogo";
import Button from "../Button";
import { useRouter } from "next/router";
import Link from "next/link";
import useAuth from "../../utils/useAuth";
import ProfileButton from "./ProfileButton";
import LogoutButton from "./LogoutButton";
import { useScreenType } from "../../utils/useScreenType";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { loggedUser } = useAuth();
  const screenType = useScreenType();
  const showUserOnSidebar = screenType !== "3-cols";

  return (
    <nav className="px-10 py-3 flex justify-between items-center flex-none bg-gray-900">
      <Link href="/">
        <a>
          <AposcarLogo />
        </a>
      </Link>
      {showUserOnSidebar && (
        <div>
          {loggedUser ? (
            <div className="flex items-center space-x-4">
              <LogoutButton />
              <ProfileButton user={loggedUser} />
            </div>
          ) : (
            <Button color="primary" onClick={() => router.push("/register")}>
              Register
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
