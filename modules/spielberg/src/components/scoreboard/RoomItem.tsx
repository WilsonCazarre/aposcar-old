import React from "react";
import { Room } from "../../utils/apiEntities";
import CardItem from "../CardItem";

interface Props {
  room: Room;
  onClick?: () => void;
}

const RoomItem: React.FC<Props> = ({ room, onClick }) => {
  return (
    <CardItem
      className="border-t border-gray-700 flex justify-between items-center"
      role="button"
      onClick={onClick}
    >
      <span className="text-2xl">{room.name}</span>
      <span className="text-center">
        <div className="text-xs">Share code</div>
        <div className="text-xl font-bold">{room.shareCode}</div>
      </span>
    </CardItem>
  );
};

export default RoomItem;
