import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

interface Props {
  nextUrl?: string;
  previousUrl?: string;
}

const CategoryNavButtons: React.FC<Props> = ({ previousUrl, nextUrl }) => {
  return (
    <div className="flex justify-between">
      <Button styleType={previousUrl ? "primary" : "disabled"}>
        <Link
          to={`/app/categories/${previousUrl}` ?? ""}
          className={previousUrl ? "" : "pointer-events-none"}
        >
          Previous
        </Link>
      </Button>
      <Button styleType={nextUrl ? "primary" : "disabled"}>
        <Link
          to={`/app/categories/${nextUrl}` ?? ""}
          className={nextUrl ? "" : "pointer-events-none"}
        >
          Next
        </Link>
      </Button>
    </div>
  );
};

export default CategoryNavButtons;
