import React from "react";
import { User } from "../../utils/apiEntities";
import useAuth from "../../utils/useAuth";
import ScoreBar from "./ScoreBar";
import Link from "next/link";

interface Props {
  user: User;
  userIdx: number;
}

const UserRank: React.FC<Props> = ({ user, userIdx }) => {
  const { loggedUser } = useAuth();
  return (
    <div
      className={`${
        loggedUser?.username === user.username ? "text-yellow" : ""
      }`}
    >
      <div className="flex justify-between">
        <span className="text-xl">
          {`${userIdx + 1}° `}
          <Link href={`profile/${user.username}`}>{user.username}</Link>
        </span>
        <span>{user.score} / 24</span>
      </div>
      <ScoreBar score={user.score} />
    </div>
  );
};

export default UserRank;
