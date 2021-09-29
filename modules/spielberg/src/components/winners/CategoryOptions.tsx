import React from "react";
import { Category } from "../../utils/apiEntities";

interface Props {
  category: Category;
}

const CategoryOptions: React.FC<Props> = ({ category }) => {
  return (
    <div className="px-4 bg-gray-80">
      {category.indications.map((id) => id)}
    </div>
  );
};

export default CategoryOptions;
