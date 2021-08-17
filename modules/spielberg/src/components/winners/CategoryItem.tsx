import React from "react";
import CardItem from "../CardItem";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { Category } from "../../utils/apiEntities";

interface Props {
  name: string;
  userIndication?: string;
  category: Category;
}

const CategoryItem: React.FC<Props> = ({ name, userIndication, category }) => {
  const winnerName = category.winnerIndication?.nominated?.name;
  const isWinner = winnerName === userIndication;
  const StatusIcon = isWinner ? CheckIcon : XIcon;
  const statusClasses = {
    win: "bg-yellow text-gray-800",
    miss: "bg-red text-black",
    default: "bg-gray-800 text-gray-50",
  };
  let currentStatus: keyof typeof statusClasses;
  if (!winnerName) {
    currentStatus = "default";
  } else if (isWinner) {
    currentStatus = "win";
  } else {
    currentStatus = "miss";
  }
  return (
    <CardItem
      className={`flex items-center justify-between ${statusClasses[currentStatus]}`}
    >
      <div className="">
        <div className="text-2xl font-bold">{name}</div>
        <div className="text-sm font-bold">
          Winner: {category.winnerIndication?.nominated?.name ?? "-"}
        </div>
        <div className="text-sm font-bold">
          Your Choice: {userIndication ?? "Click to Place bet"}
        </div>
      </div>
      <StatusIcon
        className={`h-12 w-12 ${
          winnerName ? "text-gray-800" : "text-transparent"
        }`}
      />
    </CardItem>
  );
};

export default CategoryItem;
