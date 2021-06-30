import React from "react";
import { User } from "../../utils/apiEntities";
import Card from "../Card";
import { useQuery } from "react-query";
import { kubrick } from "../../utils/apiClient";
import UserRank from "./UserRank";
import ScoreboardCardHeader from "./ScoreboardCardHeader";
import useCurrentRoom from "../../utils/useCurrentRoom";

const ScoreboardCard: React.FC = () => {
  const { currentRoom } = useCurrentRoom();
  const { data: users } = useQuery(["users", `room=${currentRoom?.id}`], () =>
    kubrick.get<User[]>(
      `users/?ordering=-score/${currentRoom ? `&room=${currentRoom.id}` : ""}`
    )
  );

  return (
    <Card header={<ScoreboardCardHeader />} childrenClassName="space-y-3 px-5">
      {users
        ? users.data.map((user, index) => (
            <UserRank user={user} key={user.id} userIdx={index} />
          ))
        : "Loading..."}
    </Card>
  );
};

export default ScoreboardCard;
