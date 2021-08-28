import React, { SetStateAction, useState } from "react";
import { ChartBarIcon, FilmIcon } from "@heroicons/react/outline";
import { Routes } from "../../utils/constants";

interface Props {
  currentRoute: Routes;
  setCurrentRoute: React.Dispatch<SetStateAction<Routes>>;
}

const Navbar1Col: React.FC<Props> = ({ currentRoute, setCurrentRoute }) => {
  const iconClassName = "w-8 h-8 mx-auto";
  const buttonClassName = "flex-1 text-center text-gray-50";
  const buttonActiveClassName = `${buttonClassName} text-yellow`;
  return (
    <div className="w-full flex bg-gray-800 py-2 fixed bottom-0 border-gray-700 border-t">
      <button
        onClick={() => setCurrentRoute("scoreboard")}
        className={`${
          currentRoute === "scoreboard"
            ? buttonActiveClassName
            : buttonClassName
        }`}
      >
        <ChartBarIcon className={iconClassName} />
      </button>

      <button
        onClick={() => setCurrentRoute("categories")}
        className={`${
          currentRoute === "categories"
            ? buttonActiveClassName
            : buttonClassName
        }`}
      >
        <FilmIcon className={iconClassName} />
      </button>
    </div>
  );
};

export default Navbar1Col;
