import React from "react";
import LoadingComponent from "./LoadingComponent";

const LoadingOverlay: React.FC = () => {
  return (
    <div className="absolute h-screen w-screen bg-gray-800">
      <div className="relative left-1/2 top-2/4">
        <LoadingComponent />
      </div>
    </div>
  );
};

export default LoadingOverlay;
