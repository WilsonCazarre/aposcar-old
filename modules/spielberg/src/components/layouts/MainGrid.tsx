import React from "react";
import { useScreenType } from "../../utils/useScreenType";
import { Routes } from "../../utils/constants";

interface Props {
  className?: string;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  currentRoute: Routes;
}

const MainGrid: React.FC<Props> = ({
  children,
  rightPanel,
  leftPanel,
  currentRoute,
}) => {
  const screenType = useScreenType();
  const columnClassName = "flex flex-col";
  const gridClassName = "flex pt-0 px-4 gap-6 min-h-0 flex-shrink pb-4";

  if (screenType === "3-cols") {
    return (
      <div className={`${gridClassName}`}>
        <div className={`${columnClassName} flex-1`}>{leftPanel}</div>
        <div className={`${columnClassName} flex-grow`}>{children}</div>
        <div className={`${columnClassName} flex-1`}>{rightPanel}</div>
      </div>
    );
  }

  if (screenType === "2-cols") {
    return (
      <div className={`${gridClassName}`}>
        <div className={`${columnClassName} flex-1`}>{children}</div>
        <div className={`${columnClassName} flex-1`}>{rightPanel}</div>
      </div>
    );
  }

  // if 1-cols
  return (
    <div className={`${gridClassName} ${columnClassName} pb-16`}>
      {currentRoute === "categories" ? rightPanel : children}
    </div>
  );
};

export default MainGrid;
