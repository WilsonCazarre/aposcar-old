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
      {/*<div className="text-center pb-4 sticky bg-gray-900 top-0">*/}
      {/*  <div className="text-2xl">{currentRoom?.name ?? "Global Ranking"}</div>*/}
      {/*  <div className="text-lg font-light">{"12 participants"}</div>*/}
      {/*</div>*/}
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
