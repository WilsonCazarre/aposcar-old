import React, { useState } from "react";
import CardHeader from "../CardHeader";
import { SwitchHorizontalIcon, GlobeAltIcon } from "@heroicons/react/outline";
import RoomModal from "./RoomModal";
import useCurrentRoom from "../../utils/useCurrentRoom";

const ScoreboardCardHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentRoom, setRoom } = useCurrentRoom();
  return (
    <CardHeader>
      <div className="flex justify-between">
        <div>{currentRoom ? currentRoom.name : "Global Ranking"}</div>
        <div className="space-x-4">
          {currentRoom && (
            <button onClick={() => setRoom(undefined)}>
              <GlobeAltIcon className="h-7 w-7" />
            </button>
          )}
          <button onClick={() => setIsModalOpen(true)}>
            <SwitchHorizontalIcon className="h-7 w-7" />
          </button>
        </div>
      </div>
      <RoomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </CardHeader>
  );
};

export default ScoreboardCardHeader;
