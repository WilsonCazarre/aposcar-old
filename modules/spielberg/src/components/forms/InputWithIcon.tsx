import React from "react";
import { XIcon } from "@heroicons/react/outline";
import { FieldError } from "react-hook-form/dist/types/errors";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  HeroIcon: (props: React.ComponentProps<"svg">) => JSX.Element;
  errors?: FieldError;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, Props>(
  ({ HeroIcon, errors, ...props }, ref) => {
    return (
      <div>
        <div className="flex items-center bg-gray-900 rounded-md border border-gray-700 relative">
          <HeroIcon className="text-white h-5 w-5 ml-1 absolute" />
          <input
            className="bg-transparent text-white font-sans text-lg w-full h-full rounded-md p-1 pl-7 "
            ref={ref}
            {...props}
          />
        </div>
        {errors && (
          <div className="text-red-600 text-sm flex items-center space-x-1">
            <XIcon className="text-red-600 h-4 w-4" />
            <span>
              {errors.type === "required" && "This field is required"}
              {errors.type === "badPassword" && "This field is required"}
            </span>
          </div>
        )}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";

export default InputWithIcon;
