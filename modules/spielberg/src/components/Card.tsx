import React, { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
  noPadding?: boolean;
  childrenClassName?: string;
}

const Card: React.FC<Props> = ({
  children,
  noPadding,
  header,
  childrenClassName,
  ...props
}) => {
  const { className, ...rest } = props;

  return (
    <div
      className={`flex flex-col bg-gray-800 border border-gray-700 rounded-xl max-h-[70vh] ${
        className ?? ""
      }`}
      {...rest}
    >
      {header && (
        <div className="border-b border-gray-700 p-2 pl-4">{header}</div>
      )}

      {children && (
        <div
          className={`p-2 overflow-y-auto flex-grow ${childrenClassName ?? ""}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Card;
