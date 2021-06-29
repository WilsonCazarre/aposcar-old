import React from "react";
import CardItem from "../CardItem";

interface Props {
  name: string;
  winner?: string;
  userIndication?: string;
}

const CategoryItem: React.FC<Props> = ({ name, winner, userIndication }) => {
  return (
    <CardItem className="grid grid-cols-4">
      <span className="col-span-2 text-xl">{name}</span>
      <span className="text-center">{winner ?? "TBD"}</span>
      <span className="text-right">{userIndication ?? "Place bet"}</span>
    </CardItem>
  );
};

export default CategoryItem;
