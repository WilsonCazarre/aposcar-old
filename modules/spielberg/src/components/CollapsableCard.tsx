import React, { Dispatch, SetStateAction } from "react";

interface Props {
  title: string;
  collapse: boolean;
  setCollapse: Dispatch<SetStateAction<boolean>>;
}

const CollapsableCard: React.FC<Props> = ({
  children,
  title,
  setCollapse,
  collapse,
}) => {
  return (
    <div className="rounded-xl flex-grow">
      <button
        className={`bg-gray-700 ${
          collapse ? "rounded-t-xl" : "rounded-xl"
        } p-2 w-full`}
        onClick={() => setCollapse(!collapse)}
      >
        {title}
      </button>
      <div className={`${collapse ? "block" : "hidden"} bg-gray-900`}>
        {children}
      </div>
    </div>
  );
};

export default CollapsableCard;
