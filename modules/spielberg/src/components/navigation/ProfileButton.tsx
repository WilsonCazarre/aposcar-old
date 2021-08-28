import React, { useState } from "react";
import { ButtonProps } from "../Button";
import { User } from "../../utils/apiEntities";
import { UserIcon, XIcon } from "@heroicons/react/outline";
import BaseModal from "../modals/BaseModal";
import ProfileCard from "../profile/ProfileCard";

interface Props extends Omit<ButtonProps, "color"> {
  user: User;
}

const ProfileButton: React.FC<Props> = ({ user, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <button
      className="flex items-center"
      onClick={() => setIsModalOpen(!isModalOpen)}
      {...props}
    >
      <UserIcon
        className="w-12 h-12 p-2 bg-gray-800
        text-gray-200 ring-yellow  rounded-full shadow-lg"
      />
      <BaseModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(!isModalOpen)}
      >
        <div className="flex justify-end">
          <button className="p-4" onClick={() => setIsModalOpen(false)}>
            <XIcon className="h-7 w-7" />
          </button>
        </div>
        <ProfileCard />
      </BaseModal>
    </button>
  );
};

export default ProfileButton;
