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
        <div className="text-xl flex">
          {`${userIdx + 1}° `}
          <div className="truncate w-40 ml-1">
            <Link href={`profile/${user.username}`} passHref>
              {user.username}
            </Link>
          </div>
        </div>
        <div>{user.score} / 24</div>
      </div>
      <ScoreBar score={user.score} />
    </div>
  );
};

export default UserRank;
