import React from "react";
import RoomController from "./RoomController";

const RoomCard: React.FC = () => {
  return (
    <div className="bg-gray-800 mt-4 overflow-y-auto">
      <RoomController />
    </div>
  );
};

export default RoomCard;
