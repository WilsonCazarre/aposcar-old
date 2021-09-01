import React from "react";
import ReactModal from "react-modal";

const BaseModal: React.FC<ReactModal.Props> = ({ children, ...props }) => {
  return (
    <ReactModal
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      overlayClassName="fixed bg-gray-900 inset-0 bg-opacity-70 overflow-y-auto"
      className="absolute bg-gray-800 top-20
      left-1/2 -translate-x-1/2 text-gray-50
      rounded-lg overflow-y-auto"
      onRequestClose={props.onRequestClose}
      {...props}
    >
      {children}
    </ReactModal>
  );
};

export default BaseModal;
