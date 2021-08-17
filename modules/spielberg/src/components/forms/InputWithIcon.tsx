import React from "react";
import { XIcon } from "@heroicons/react/outline";
import { useFormContext } from "react-hook-form";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  HeroIcon: (props: React.ComponentProps<"svg">) => JSX.Element;
  name: string;
  registerOptions?: RegisterOptions;
}

const InputWithIcon: React.FC<Props> = ({
  HeroIcon,
  name,
  registerOptions,
  ...props
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  return (
    <div>
      <div className="flex items-center bg-gray-900 rounded-md border relative focus:border-yellow">
        <HeroIcon className="text-white h-5 w-5 ml-1 absolute" />
        <input
          className="bg-transparent text-white font-sans text-lg w-full h-full rounded-md p-1 pl-7 "
          {...props}
          {...register(name, registerOptions)}
        />
      </div>
      {errors[name] && (
        <div className="text-red-600 text-sm flex items-center space-x-1">
          <XIcon className="text-red-600 h-4 w-4" />
          <span>
            {errors[name].type === "required"
              ? "You really need to type this"
              : errors[name].message}
          </span>
        </div>
      )}
    </div>
  );
};

InputWithIcon.displayName = "InputWithIcon";

export default InputWithIcon;
