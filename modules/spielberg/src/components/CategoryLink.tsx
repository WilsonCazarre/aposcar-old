import React from "react";
import { Link } from "react-router-dom";

import { Category } from "../types/interfaces";

interface Props {
  category: Category;
}

const CategoryLink: React.FC<Props> = ({ category }) => {
  return (
    <Link
      to={`/app/categories/${category.urlField}`}
      className="sm:h-20 sm:w-40 h-20 w-36 border border-gray-100 flex
      items-center justify-center m-2 transition duration-75
      hover:border-yellow hover:text-yellow"
    >
      <p className="px-2 text-center text-sm">{category.name}</p>
    </Link>
  );
};

export default CategoryLink;
