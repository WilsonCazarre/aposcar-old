import React, { useEffect, useRef } from "react";
import { XIcon } from "@heroicons/react/outline";
import ProfileCard from "./ProfileCard";
import BaseModal from "../modals/BaseModal";
import ReactModal from "react-modal";
import { User } from "../../utils/apiEntities";
import RoomCard from "../rooms/RoomCard";
import useCurrentRoom from "../../utils/useCurrentRoom";

interface Props extends ReactModal.Props {
  user: User;
}

const ProfileModal: React.FC<Props> = ({ user, onRequestClose, ...props }) => {
  const { currentRoom } = useCurrentRoom();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    closeButtonRef.current?.click();
  }, [currentRoom]);
  return (
    <BaseModal onRequestClose={onRequestClose} {...props}>
      <div className="w-96">
        <div className="flex justify-end">
          <button className="p-4" onClick={onRequestClose} ref={closeButtonRef}>
            <XIcon className="h-7 w-7" />
          </button>
        </div>
        <div className="divide-y divide-gray-700">
          <ProfileCard user={user} />
          <RoomCard />
        </div>
      </div>
    </BaseModal>
  );
};

export default ProfileModal;
