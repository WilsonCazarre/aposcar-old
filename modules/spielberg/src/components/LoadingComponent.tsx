import React from "react";
import { ReactComponent as Icon } from "../assets/loader.svg";

const LoadingComponent: React.FC = () => {
  return (
    <div
      className="overflow-hidden animate-pulse shadow-inner rounded"
      style={{ height: "50px" }}
    >
      <Icon width={50} className="animate-swipe" title={"Loader"} />
      <Icon width={50} className="animate-swipe" title={"Loader"} />
    </div>
  );
};

export default LoadingComponent;
