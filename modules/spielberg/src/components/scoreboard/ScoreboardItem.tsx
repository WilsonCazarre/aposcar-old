import React from "react";
import { User } from "../../utils/apiEntities";
import ScoreBar from "./ScoreBar";
import { UserIcon } from "@heroicons/react/outline";
import ProfilePicture from "../profile/ProfilePicture";
import CardItem from "../CardItem";

interface Props {
  user: User;
  userIdx: number;
}

const ScoreboardItem: React.FC<Props> = ({ user, userIdx }) => {
  return (
    <CardItem className="flex items-center h-20 bg-gray-800">
      <span className="text-3xl">{userIdx + 1}</span>
      <span className="mx-4">
        <ProfilePicture />
      </span>

      <div className="flex-grow">
        <span className="flex justify-between items-center">
          <span className="font-bold text-xl">{user.username}</span>
          <span>{user.score} points</span>
        </span>
        <ScoreBar score={user.score} />
      </div>
    </CardItem>
  );
};

export default ScoreboardItem;
