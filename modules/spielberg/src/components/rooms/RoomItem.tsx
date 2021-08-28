import React from "react";
import { Room } from "../../utils/apiEntities";
import CardItem from "../CardItem";
import { StarIcon } from "@heroicons/react/outline";
import useAuth from "../../utils/useAuth";
import { useMutation } from "react-query";
import { kubrick } from "../../utils/apiClient";
import useCurrentRoom from "../../utils/useCurrentRoom";

interface Props {
  room: Room;
  onClick?: () => void;
}

const RoomItem: React.FC<Props> = ({ room, onClick }) => {
  const { loggedUser } = useAuth();
  const isOwner = loggedUser?.id === room.owner;
  const { setRoom } = useCurrentRoom();
  const leaveRoomMutation = useMutation(
    () =>
      kubrick.post(`rooms/${room.id}/remove_user/`, {
        username: loggedUser?.username,
      }),
    {
      onSuccess: () => {
        setRoom(undefined);
      },
    }
  );

  return (
    <CardItem className="border-t border-gray-700 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <button className="text-2xl truncate" onClick={onClick}>
          {room.name}
        </button>
        {isOwner && (
          <span title="You're the owner of this room">
            <StarIcon className="w-6 h-6" />
          </span>
        )}
      </div>
      <span className="text-center">
        <div className="text-xs">Share code</div>
        <div className="text-2xl font-bold">{room.shareCode}</div>
      </span>
    </CardItem>
  );
};

export default RoomItem;
