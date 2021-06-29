import React from "react";
import CardItem from "../CardItem";
import Link from "next/link";

interface Props {
  name: string;
  winner?: string;
  userIndication?: string;
  urlPath: string;
}

const CategoryItem: React.FC<Props> = ({
  name,
  winner,
  userIndication,
  urlPath,
}) => {
  return (
    <Link href={`/categories/${urlPath}`}>
      <a className="block">
        <CardItem className="grid grid-cols-4">
          <span className="col-span-2 text-xl">{name}</span>
          <span className="text-center">{winner ?? "TBD"}</span>
          <span className="text-right">{userIndication ?? "Place bet"}</span>
        </CardItem>
      </a>
    </Link>
  );
};

export default CategoryItem;
