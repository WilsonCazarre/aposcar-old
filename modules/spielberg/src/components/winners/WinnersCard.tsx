import React from "react";
import { Category } from "../../utils/apiEntities";
import CategoryItem from "./CategoryItem";

interface Props {
  categories: Category[];
}

const WinnersCard: React.FC<Props> = ({ categories }) => {
  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <CategoryItem
          category={category}
          name={category.name}
          key={category.name}
          userIndication="Parasite"
        />
      ))}
    </div>
  );
};

export default WinnersCard;
