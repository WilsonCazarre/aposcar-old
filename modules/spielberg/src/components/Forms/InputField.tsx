import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FieldError } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: IconProp;
  inputRef?:
    | React.RefObject<HTMLInputElement>
    | ((instance: HTMLInputElement | null) => void);
  error?: FieldError;
}

const InputField: React.FC<Props> = ({ icon, inputRef, error, ...rest }) => {
  return (
    <div className="relative w-full">
      <FontAwesomeIcon
        icon={icon}
        className={`absolute ml-2 text-gray-300 mt-3`}
      />
      <input
        className={`bg-gray-900 outline-none pl-8 p-2 rounded-md w-full border border-gray-900 ${
          error && "border-red-400"
        }`}
        {...rest}
        ref={inputRef}
      />
      <ErrorMessage>{error?.message}</ErrorMessage>
    </div>
  );
};

export default InputField;
