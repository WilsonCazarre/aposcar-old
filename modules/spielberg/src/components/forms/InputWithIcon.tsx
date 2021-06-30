import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  HeroIcon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, Props>(
  ({ HeroIcon, ...props }, ref) => {
    return (
      <div className="flex items-center bg-gray-900 p-1 rounded-md border border-gray-700">
        <HeroIcon className="text-white h-5 w-5 mr-2" />
        <input
          className="bg-transparent text-white font-sans text-lg"
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";

export default InputWithIcon;
