import React from "react";
import RoomItem from "./RoomItem";
import { Room } from "../../utils/apiEntities";

interface Props {
  rooms?: Room[];
  setNewRoom: (room: Room) => void;
}

const RoomsList: React.FC<Props> = ({ rooms, setNewRoom }) => {
  if (!rooms || rooms.length === 0) {
    return (
      <div className="p-4">
        {"You don't have any rooms, try to join or create one :)"}
      </div>
    );
  }

  return (
    <>
      {rooms.map((room) => (
        <RoomItem key={room.id} room={room} onClick={() => setNewRoom(room)} />
      ))}
    </>
  );
};

export default RoomsList;
