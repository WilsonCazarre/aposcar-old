import React from "react";
import { titleCase } from "../utils";

interface Props {
  categoryName: string;
  nomineeName?: string;
}

const CategoryTitle: React.FC<Props> = ({ categoryName, nomineeName }) => {
  const categoryNameFormatted = titleCase(categoryName.replaceAll("_", " "));
  return (
    <div className="mb-10">
      <p className="text-3xl font-light flex-none">
        {nomineeName ? `Your  ${categoryNameFormatted} is` : "What is your"}
      </p>
      <p className="text-5xl font-bold flex-none">
        {nomineeName ?? categoryNameFormatted + "?"}
      </p>
    </div>
  );
};

export default CategoryTitle;
