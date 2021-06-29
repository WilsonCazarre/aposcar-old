import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const CardItem: React.FC<Props> = ({ children, ...props }) => {
  const { className, ...rest } = props;
  return (
    <div className={`p-6 ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default CardItem;
