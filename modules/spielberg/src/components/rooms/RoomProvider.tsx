import React, { useState } from "react";
import { Room } from "../../utils/apiEntities";

export interface RoomContextProps {
  currentRoom: Room | undefined;
  setRoom: (newRoom: Room | undefined) => void;
}

export const RoomContext = React.createContext<RoomContextProps | undefined>(
  undefined
);

const RoomProvider: React.FC = ({ children }) => {
  const [room, setRoom] = useState<Room>();
  return (
    <RoomContext.Provider value={{ currentRoom: room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
