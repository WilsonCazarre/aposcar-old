import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const ProfileButton: React.FC = () => {
  const { user } = useAuth();
  return (
    <Link
      to={"/app/profile"}
      className="flex items-center bg-gray-900 rounded-full block"
    >
      <div className="h-10 w-10 bg-yellow p-2 rounded-full flex items-center justify-center mr-3">
        <FontAwesomeIcon
          icon="chess-rook"
          size="2x"
          className="text-black p-1"
          fixedWidth
        />
      </div>
      <p className="text-xl hover:underline mr-4">{user?.username}</p>
    </Link>
  );
};

export default ProfileButton;
