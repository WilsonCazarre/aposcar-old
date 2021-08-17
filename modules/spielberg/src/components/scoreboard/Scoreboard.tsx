import React from "react";
import { User } from "../../utils/apiEntities";
import { useQuery } from "react-query";
import { kubrick } from "../../utils/apiClient";
import ScoreboardItem from "./ScoreboardItem";
import useCurrentRoom from "../../utils/useCurrentRoom";

const Scoreboard: React.FC = () => {
  const { currentRoom } = useCurrentRoom();
  const { data: users } = useQuery(["users", `room=${currentRoom?.id}`], () =>
    kubrick.get<User[]>(
      `users/?ordering=-score/${currentRoom ? `&room=${currentRoom.id}` : ""}`
    )
  );

  return (
    <div className="relative">
      <div className="text-center mb-4 sticky bg-gray-800 top-0 py-2 border-b border-gray-700">
        <div className="text-2xl leading-6">
          {currentRoom?.name ?? "Global Ranking"}
        </div>
        <div className="text-lg font-light leading-6">{"12 participants"}</div>
      </div>
      <div className="space-y-3 overflow-y-auto h-full">
        {users
          ? users.data.map((user, index) => (
              <div className="space-y-3" key={user.id}>
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
                <ScoreboardItem user={user} userIdx={index} />
              </div>
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default Scoreboard;
