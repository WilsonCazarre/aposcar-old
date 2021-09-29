import React, { useState } from "react";
import { Category } from "../../utils/apiEntities";
import CategoryItem from "./CategoryItem";
import ColumnHeader from "../layouts/ColumnHeader";

interface Props {
  categories: Category[];
}

const WinnersCard: React.FC<Props> = ({ categories }) => {
  const [currentIndex, setCurrentIndex] = useState<number>();

  return (
    <>
      <ColumnHeader>
        <div className="text-center">
          <div className="text-4xl">Oscar Winners</div>
        </div>
      </ColumnHeader>

      <div className="overflow-y-auto space-y-3">
        {categories.map((category, index) => (
          <CategoryItem
            onClick={() => setCurrentIndex(index)}
            index={index}
            currentIndex={currentIndex}
            category={category}
            name={category.name}
            key={category.name}
          />
        ))}
      </div>
    </>
  );
};

export default WinnersCard;
