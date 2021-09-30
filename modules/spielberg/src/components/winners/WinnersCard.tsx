import React, { useState } from "react";
import { Category } from "../../utils/apiEntities";
import CategoryItem from "./CategoryItem";
import ColumnHeader from "../layouts/ColumnHeader";
import { useQuery } from "react-query";
import { kubrick } from "../../utils/apiClient";
import { AxiosResponse } from "axios";

const WinnersCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>();
  const { data: categories } = useQuery<AxiosResponse<Category[]>>(
    "categories",
    () => kubrick.get("categories/")
  );

  return (
    <>
      <ColumnHeader>
        <div className="text-center">
          <div className="text-4xl">Oscar Winners</div>
        </div>
      </ColumnHeader>

      <div className="overflow-y-auto space-y-3">
        {categories?.data.map((category, index) => (
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
