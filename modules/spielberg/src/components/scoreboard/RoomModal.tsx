import React, { useState } from "react";
import InputWithIcon from "../forms/InputWithIcon";
import { SearchIcon } from "@heroicons/react/outline";
import Button from "../Button";
import Modal from "../Modal";
import { useMutation, useQuery } from "react-query";
import { kubrick } from "../../utils/apiClient";
import { Room } from "../../utils/apiEntities";
import RoomItem from "./RoomItem";
import useCurrentRoom from "../../utils/useCurrentRoom";
import { AxiosError, AxiosResponse } from "axios";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (newState: boolean) => void;
}

interface FormFields {
  shareCode: string;
}

const RoomModal: React.FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
  const { data: rooms, refetch } = useQuery("rooms", () =>
    kubrick.get<Room[]>("rooms/")
  );
  const { setRoom } = useCurrentRoom();

  const setNewRoom = (room: Room) => {
    setIsModalOpen(false);
    setRoom(room);
  };
  const [shareCode, setShareCode] = useState("");

  const joinRoomMutation = useMutation<
    AxiosResponse<{ status: string }>,
    AxiosError,
    FormFields
  >((payload) => kubrick.post("rooms/join_room/", payload), {
    onSuccess: () => {
      refetch();
    },
    onSettled: () => {
      setShareCode("");
    },
  });

  return (
    <Modal
      title="Rooms"
      subtitle="Create or join rooms"
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <div className="flex space-x-4 justify-end p-4">
        <InputWithIcon
          HeroIcon={SearchIcon}
          size={8}
          value={shareCode}
          onChange={(e) => setShareCode(e.target.value)}
        />
        <Button
          color="primary"
          onClick={() => joinRoomMutation.mutate({ shareCode })}
        >
          Add
        </Button>
      </div>
      <div>
        {rooms?.data.map((room) => (
          <RoomItem
            key={room.id}
            room={room}
            onClick={() => setNewRoom(room)}
          />
        ))}
      </div>
    </Modal>
  );
};

export default RoomModal;
