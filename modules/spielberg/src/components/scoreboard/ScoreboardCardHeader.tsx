import React, { useState } from "react";
import CardHeader from "../CardHeader";
import {
  SwitchHorizontalIcon,
  GlobeAltIcon,
  StarIcon,
  LogoutIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import RoomModal from "./RoomModal";
import useCurrentRoom from "../../utils/useCurrentRoom";
import useAuth from "../../utils/useAuth";
import { useMutation, useQueryClient } from "react-query";
import { kubrick } from "../../utils/apiClient";

const ScoreboardCardHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentRoom, setRoom } = useCurrentRoom();
  const { loggedUser } = useAuth();
  const queryClient = useQueryClient();

  const onMutationSuccess = () => {
    queryClient
      .invalidateQueries(["users", `room=${currentRoom?.id}`], {
        refetchActive: false,
      })
      .then(() =>
        queryClient.invalidateQueries("rooms").then(() => setRoom(undefined))
      );
  };

  const isOwner = loggedUser?.id === currentRoom?.owner;
  const leaveRoomMutation = useMutation(
    () =>
      kubrick.post(`rooms/${currentRoom?.id}/remove_user/`, {
        username: loggedUser?.username,
      }),
    {
      onSuccess: onMutationSuccess,
    }
  );

  const deleteRoomMutation = useMutation(
    () => kubrick.delete(`rooms/${currentRoom?.id}/`),
    { onSuccess: onMutationSuccess }
  );

  return (
    <CardHeader>
      <div className="flex justify-between">
        <div>{currentRoom ? currentRoom.name : "Global Ranking"}</div>
        {loggedUser && (
          <div className="space-x-4">
            {currentRoom && (
              <>
                <button
                  onClick={() => setRoom(undefined)}
                  title="Switch back to Global Ranking"
                >
                  <GlobeAltIcon className="h-6 w-6" />
                </button>
                {isOwner ? (
                  <button
                    title="Delete room"
                    onClick={() => deleteRoomMutation.mutate()}
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                ) : (
                  <button
                    title="Leave room"
                    onClick={() => leaveRoomMutation.mutate()}
                  >
                    <LogoutIcon className="w-6 h-6" />
                  </button>
                )}
              </>
            )}

            <button onClick={() => setIsModalOpen(true)} title="Switch rooms">
              <SwitchHorizontalIcon className="h-7 w-7" />
            </button>
          </div>
        )}
      </div>
      <RoomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </CardHeader>
  );
};

export default ScoreboardCardHeader;
