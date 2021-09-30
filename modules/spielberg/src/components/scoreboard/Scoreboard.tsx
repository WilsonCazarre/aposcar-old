import React from "react";
import { User } from "../../utils/apiEntities";
import { useQuery } from "react-query";
import { kubrick } from "../../utils/apiClient";
import ScoreboardItem from "./ScoreboardItem";
import useCurrentRoom from "../../utils/useCurrentRoom";
import ColumnHeader from "../layouts/ColumnHeader";
import Loader from "react-loader-spinner";

const Scoreboard: React.FC = () => {
  const { currentRoom } = useCurrentRoom();
  const { data: users } = useQuery(["users", `room=${currentRoom?.id}`], () =>
    kubrick.get<User[]>(
      `users/?ordering=-score${currentRoom ? `&room=${currentRoom.id}` : ""}`
    )
  );

  return (
    <>
      <ColumnHeader>
        <div className="text-4xl leading-6">
          {currentRoom?.name ?? "Aposcar Global"}
        </div>
        <div className="text-2xl font-light leading-8">{"12 participants"}</div>
      </ColumnHeader>

      <div className="overflow-y-auto space-y-3">
        {users ? (
          users.data.map((user, index) => (
            <ScoreboardItem key={user.id} user={user} userIdx={index} />
          ))
        ) : (
          <Loader
            type={"TailSpin"}
            color={"var(--accent-color)"}
            height="2em"
            width="100%"
            radius={1}
          />
        )}
      </div>
    </>
  );
};

export default Scoreboard;
