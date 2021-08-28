import React, { useEffect, useState } from "react";
import CardItem from "../CardItem";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { Category } from "../../utils/apiEntities";
import useAuth from "../../utils/useAuth";

interface Props {
  name: string;
  category: Category;
}

const CategoryItem: React.FC<Props> = ({ name, category }) => {
  const { loggedUser } = useAuth();
  const winnerName = category.winnerIndication?.nominated?.name;
  const userChoice = category.currentUserIndication?.nominated.name;
  const isWinner = winnerName === userChoice;
  const StatusIcon = isWinner ? CheckIcon : XIcon;
  const statusClasses = {
    win: "bg-yellow text-gray-800",
    miss: "bg-red text-black",
    default: "bg-gray-800 text-gray-50",
  };
  const [showNominees, setShowNominees] = useState(false);

  const [currentStatus, setCurrentStatus] = useState<
    keyof typeof statusClasses
  >("default");
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
        onClick={() => setShowNominees(!showNominees)}
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
      {showNominees && <div>Nominees go la la la</div>}
    </div>
  );
};

export default CategoryItem;
