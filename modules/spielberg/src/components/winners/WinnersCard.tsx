import React from "react";
import Card from "../Card";
import CardHeader from "../CardHeader";
import { Category } from "../../lib/apiEntities";
import CategoryItem from "./CategoryItem";

interface Props {
  categories: Category[];
}

const WinnersCard: React.FC<Props> = ({ categories }) => {
  return (
    <Card
      header={
        <CardHeader>
          <div className="grid grid-cols-4 pr-3">
            <span className="col-span-2">Categories</span>
            <span className="text-center font-light">Winner</span>
            <span className="text-right font-light">Your bet</span>
          </div>
        </CardHeader>
      }
      childrenClassName="divide-y-2 p-0 divide-gray-700"
    >
      {categories.map((category) => (
        <CategoryItem name={category.name} key={category.name} />
      ))}
    </Card>
  );
};

export default WinnersCard;
