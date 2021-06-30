import React from "react";
import Button, { ButtonProps } from "../Button";
import { User } from "../../utils/apiEntities";
import { useRouter } from "next/router";
import { UserIcon } from "@heroicons/react/outline";

interface Props extends Omit<ButtonProps, "color"> {
  user: User;
}

const ProfileButton: React.FC<Props> = ({ user, ...props }) => {
  const router = useRouter();

  return (
    <div className="flex items-center">
      <Button
        {...props}
        color="primary"
        onClick={() => router.push(`/profile/${user.username}`)}
        className="rounded-none rounded-l-full py-0.5 px-5"
      >
        <span>{user.username}</span>
      </Button>
      <UserIcon
        className="w-12 h-12 p-1.5 bg-gray-900
        text-yellow ring-yellow ring-[5px] rounded-full"
      />
    </div>
  );
};

export default ProfileButton;
