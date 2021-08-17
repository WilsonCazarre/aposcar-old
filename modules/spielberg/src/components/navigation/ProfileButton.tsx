import React from "react";
import { ButtonProps } from "../Button";
import { User } from "../../utils/apiEntities";
import { useRouter } from "next/router";
import { UserIcon } from "@heroicons/react/outline";
import { useScreenType } from "../../utils/useScreenType";

interface Props extends Omit<ButtonProps, "color"> {
  user: User;
}

const ProfileButton: React.FC<Props> = ({ user, ...props }) => {
  const router = useRouter();
  const screenType = useScreenType();
  return (
    <button
      className="flex items-center"
      onClick={() => router.push(`/profile/${user.username}`)}
      {...props}
    >
      {screenType !== "1-cols" && (
        <span
          title="Go to Profile"
          className="rounded-none rounded-l-full py-0.5 px-5 bg-yellow text-gray-900"
        >
          <span>{user.username}</span>
        </span>
      )}
      <UserIcon
        className="w-12 h-12 p-1.5 bg-gray-900
        text-yellow ring-yellow ring-[5px] rounded-full"
      />
    </button>
  );
};

export default ProfileButton;
