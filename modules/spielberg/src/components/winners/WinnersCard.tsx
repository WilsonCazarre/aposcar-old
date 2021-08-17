import React from "react";
import { Category } from "../../utils/apiEntities";
import CategoryItem from "./CategoryItem";

interface Props {
  categories: Category[];
}

const WinnersCard: React.FC<Props> = ({ categories }) => {
  return (
    <div className="space-y-3 relative">
      <div className="text-center mb-4 sticky bg-gray-800 top-0 py-2 border-b border-gray-700">
        <div className="text-2xl">Oscar Winners</div>
      </div>
      {categories.map((category) => (
        <CategoryItem
          category={category}
          name={category.name}
          key={category.name}
        />
      ))}
    </div>
  );
};

export default WinnersCard;
