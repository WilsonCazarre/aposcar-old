import React from "react";
import { XIcon } from "@heroicons/react/outline";
import ReactModal from "react-modal";
import BaseModal from "./BaseModal";

interface Props extends ReactModal.Props {
  title: string;
  subtitle: string;
}

const ModalWithHeader: React.FC<Props> = ({ title, subtitle, ...props }) => {
  return (
    <BaseModal {...props}>
      <div
        className="bg-yellow text-gray-900 p-5
      rounded-t-lg flex justify-between"
      >
        <div>
          <div className="font-bold text-3xl">{title}</div>
          <div className="text-xl">{subtitle}</div>
        </div>
        <button onClick={props.onRequestClose}>
          <XIcon className="w-6 h-6" />
        </button>
      </div>
    </BaseModal>
  );
};

export default ModalWithHeader;
