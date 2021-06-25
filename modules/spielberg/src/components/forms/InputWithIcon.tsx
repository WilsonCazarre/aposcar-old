import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  HeroIcon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

const InputWithIcon: React.FC<Props> = ({ HeroIcon, ...props }) => {
  return (
    <div className="flex items-center bg-gray-900 p-1 rounded-md">
      <HeroIcon className="text-white h-5 w-5 mr-2" />
      <input
        className="bg-transparent text-white font-sans text-lg"
        {...props}
      />
    </div>
  );
};

export default InputWithIcon;
