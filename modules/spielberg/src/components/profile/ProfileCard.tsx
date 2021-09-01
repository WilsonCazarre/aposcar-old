import React from "react";
import ProfilePicture from "./ProfilePicture";
import LogoutButton from "../navigation/LogoutButton";
import Button from "../Button";
import { useRouter } from "next/router";
import { User } from "../../utils/apiEntities";
import useAuth from "../../utils/useAuth";

interface Props {
  user: User | undefined;
}

const ProfileCard: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const wrapperClassName = "bg-gray-800 p-4";
  const { loggedUser } = useAuth();

  if (user) {
    return (
      <div className={wrapperClassName}>
        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-2 w-11/12 pr-3">
            <ProfilePicture />
            <div className="flex-1 text-2xl truncate">{user.username}</div>
          </span>
          {loggedUser?.email === user.email && <LogoutButton />}
        </div>
        <div className="text-gray-200 my-4">Aposcar points</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-4xl">{user?.score}</div>
            <div className="leading-4">
              This <br /> Edition
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-4xl">{user?.score}</div>
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
