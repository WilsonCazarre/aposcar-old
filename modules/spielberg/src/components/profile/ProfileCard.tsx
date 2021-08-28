import React from "react";
import useAuth from "../../utils/useAuth";
import ProfilePicture from "./ProfilePicture";
import LogoutButton from "../navigation/LogoutButton";
import Button from "../Button";
import { useRouter } from "next/router";

const ProfileCard: React.FC = () => {
  const router = useRouter();
  const { loggedUser } = useAuth();
  const wrapperClassName = "bg-gray-800 p-4";
  if (loggedUser) {
    return (
      <div className={wrapperClassName}>
        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-2 w-11/12 pr-3">
            <ProfilePicture />
            <div className="flex-1 text-2xl truncate">
              {loggedUser.username}
            </div>
          </span>
          <LogoutButton />
        </div>
        <div className="text-gray-200 my-4">Aposcar points</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-4xl">{loggedUser?.score}</div>
            <div className="leading-4">
              This <br /> Edition
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-4xl">{loggedUser?.score}</div>
            <div className="leading-4">
              All <br /> Time
            </div>
          </div>
          <div />
        </div>
      </div>
    );
  }
  return (
    <div className={`flex flex-col text-center ${wrapperClassName} px-24`}>
      <Button color="primary" onClick={() => router.push("/login")}>
        Login
      </Button>
      <div className="my-3">OR</div>
      <Button color="primary" onClick={() => router.push("/register")}>
        Register
      </Button>
    </div>
  );
};

export default ProfileCard;
