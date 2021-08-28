import React from "react";
import BaseModal from "../modals/BaseModal";
import ReactModal from "react-modal";

const RoomModal: React.FC<ReactModal.Props> = (props) => {
  return <BaseModal {...props}></BaseModal>;
};

export default RoomModal;
