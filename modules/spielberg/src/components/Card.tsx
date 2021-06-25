import React, { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
}

const Card: React.FC<Props> = ({ children, header, ...props }) => {
  const { className, ...rest } = props;

  return (
    <div
      className={`bg-gray-800 border border-gray-700 rounded-xl ${
        className ?? ""
      }`}
      {...rest}
    >
      {header && (
        <div className="border-b border-gray-700 p-2 pl-4">{header}</div>
      )}

      {children && <div className="p-2">{children}</div>}
    </div>
  );
};

export default Card;
