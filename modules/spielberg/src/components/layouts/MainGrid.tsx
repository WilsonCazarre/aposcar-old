import React from "react";
import { useScreenType } from "../../utils/useScreenType";

interface Props {
  className?: string;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  showRightPanel1col?: boolean;
}

const MainGrid: React.FC<Props> = ({
  children,
  rightPanel,
  leftPanel,
  showRightPanel1col,
}) => {
  const screenType = useScreenType();
  const columnClassName = "overflow-y-auto h-[calc(100vh-100px)]";
  const gridClassName = "p-4 pt-0 gap-6";

  if (screenType === "3-cols") {
    return (
      <div className={`grid grid-cols-4 ${gridClassName}`}>
        <div className={`${columnClassName}`}>{leftPanel}</div>
        <div className={`col-span-2 ${columnClassName}`}>{children}</div>
        <div className={`${columnClassName}`}>{rightPanel}</div>
      </div>
    );
  }

  if (screenType === "2-cols") {
    return (
      <div className={`grid grid-cols-2 ${gridClassName}`}>
        <div className={`${columnClassName}`}>{children}</div>
        <div className={`${columnClassName}`}>{rightPanel}</div>
      </div>
    );
  }

  // if 1-cols
  return (
    <div className={`${gridClassName} ${columnClassName}`}>
      {showRightPanel1col ? rightPanel : children}
    </div>
  );
};

export default MainGrid;
