import React from "react";
import AposcarLogo from "../../assets/icons/AposcarLogo";
import { useRouter } from "next/router";
import Link from "next/link";
import useAuth from "../../utils/useAuth";
import ProfileButton from "./ProfileButton";
import { useScreenType } from "../../utils/useScreenType";
import Button from "../Button";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { loggedUser } = useAuth();
  const screenType = useScreenType();
  const showUserOnSidebar = screenType !== "3-cols";

  return (
    <nav
      className="px-10 py-5 flex justify-between items-center
      flex-none bg-gray-900 flex-shrink-0"
    >
      <Link href="/">
        <a>
          {screenType === "1-cols" ? (
            <span className="underline text-5xl text-yellow">A</span>
          ) : (
            <AposcarLogo />
          )}
        </a>
      </Link>

      <div className="flex items-center space-x-4">
        <Link href={"https://github.com/WilsonCazarre/aposcar"}>
          <a className="hover:underline">Github</a>
        </Link>
        {showUserOnSidebar &&
          (loggedUser ? (
            <ProfileButton user={loggedUser} />
          ) : (
            <Button color="primary" onClick={() => router.push("/login")}>
              Login
            </Button>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
