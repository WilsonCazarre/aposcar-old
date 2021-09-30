import React, { useEffect, useState } from "react";
import CardItem from "../CardItem";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { Category } from "../../utils/apiEntities";
import CategoryOptions from "./CategoryOptions";

interface Props {
  name: string;
  category: Category;
  index: number;
  currentIndex: number | undefined;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const CategoryItem: React.FC<Props> = ({
  name,
  category,
  index,
  currentIndex,
  onClick,
}) => {
  const winnerName = category.winnerIndication?.nominated?.name;
  const userChoice = category.currentUserIndication?.nominated.name;
  const isWinner = winnerName === userChoice;
  const StatusIcon = isWinner ? CheckIcon : XIcon;
  const statusClasses = {
    win: "bg-yellow text-gray-800",
    miss: "bg-red text-black",
    default: "bg-gray-800 text-gray-50",
  };

  const [currentStatus, setCurrentStatus] =
    useState<keyof typeof statusClasses>("default");
  useEffect(() => {
    if (!winnerName) {
      setCurrentStatus("default");
    } else if (isWinner) {
      setCurrentStatus("win");
    } else {
      setCurrentStatus("miss");
    }
  }, [category, isWinner, winnerName]);
  return (
    <div>
      <CardItem
        className={`flex items-center justify-between ${
          statusClasses[winnerName && userChoice ? currentStatus : "default"]
        }`}
        onClick={onClick}
      >
        <div>
          <div className="text-2xl font-bold">{name}</div>
          <div className="text-sm font-bold">
            Winner: {category.winnerIndication?.nominated?.name ?? "-"}
          </div>
          <div className="text-sm font-bold">
            Your Choice: {userChoice ?? "Click to Place bet"}
          </div>
        </div>
        <StatusIcon
          className={`h-12 w-12 ${
            winnerName && userChoice ? "text-gray-800" : "text-transparent"
          }`}
        />
      </CardItem>
      {index === currentIndex && <CategoryOptions category={category} />}
    </div>
  );
};

export default CategoryItem;
