import React from "react";
import ReactModal from "react-modal";
import { XIcon } from "@heroicons/react/outline";

interface Props extends ReactModal.Props {
  title: string;
  subtitle: string;
}

const Modal: React.FC<Props> = ({ children, title, subtitle, ...props }) => {
  return (
    <ReactModal
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      overlayClassName="fixed bg-gray-900 inset-0 bg-opacity-70"
      className="absolute min-w-min bg-gray-800 top-20
      left-1/2 mx-auto -translate-x-1/2 text-gray-50 min-w-[500px]
      rounded-lg"
      {...props}
    >
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
      <div>{children}</div>
    </ReactModal>
  );
};

export default Modal;
