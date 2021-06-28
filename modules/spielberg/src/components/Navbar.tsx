import React from "react";
import AposcarLogo from "../assets/icons/AposcarLogo";
import Button from "./Button";
import { useRouter } from "next/router";
import Link from "next/link";
import useAuth from "../lib/useAuth";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <nav className="px-10 py-3 flex justify-between items-center flex-none">
      <Link href="/" passHref>
        <AposcarLogo className="cursor-pointer" />
      </Link>
      <div className="underline">
        {user ? (
          <Button
            color="primary"
            onClick={() => router.push(`/profile/${user.name}`)}
          >
            {user.name}
          </Button>
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
