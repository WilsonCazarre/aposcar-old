import React from "react";
import BaseModal from "../modals/BaseModal";
import ReactModal from "react-modal";
import RoomCard from "./RoomCard";

const RoomModal: React.FC<ReactModal.Props> = (props) => {
  return (
    <BaseModal {...props}>
      <RoomCard />
    </BaseModal>
  );
};

export default RoomModal;
