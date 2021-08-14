import React, { useState } from "react";
import InputWithIcon from "../forms/InputWithIcon";
import { FormProvider, useForm } from "react-hook-form";
import { SearchIcon } from "@heroicons/react/outline";
import Button from "../Button";
import Modal from "../Modal";
import { useMutation, useQuery } from "react-query";
import { kubrick } from "../../utils/apiClient";
import { Room } from "../../utils/apiEntities";
import useCurrentRoom from "../../utils/useCurrentRoom";
import { AxiosError, AxiosResponse } from "axios";
import CreateRoomForm from "./CreateRoomForm";
import RoomsList from "./RoomsList";
import useAuth from "../../utils/useAuth";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (newState: boolean) => void;
}

interface FormFields {
  shareCode: string;
}

const RoomModal: React.FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
  const { loggedUser } = useAuth();
  const { data: rooms, refetch } = useQuery(
    "rooms",
    () => kubrick.get<Room[]>("rooms/"),
    { enabled: !!loggedUser }
  );
  const { setRoom } = useCurrentRoom();
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const setNewRoom = (room: Room) => {
    setIsModalOpen(false);
    setRoom(room);
  };
  const formMethods = useForm<FormFields>();

  const joinRoomMutation = useMutation<
    AxiosResponse<{ status: string }>,
    AxiosError,
    FormFields
  >((payload) => kubrick.post("rooms/join_room/", payload), {
    onSuccess: () => {
      refetch();
    },
    onSettled: () => {
      formMethods.reset();
    },
  });
  const onSubmit = (data: FormFields) => {
    joinRoomMutation.mutate(data);
  };

  return (
    <Modal
      title="Rooms"
      subtitle="Create or join rooms"
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <div className="flex space-x-4 justify-between p-4">
        <Button
          color="secondary"
          onClick={() => setIsCreatingRoom(!isCreatingRoom)}
        >
          {isCreatingRoom ? "Go back to rooms list" : "Create new room"}
        </Button>

        <FormProvider {...formMethods}>
          <form
            className="flex justify-end items-center space-x-2"
            onSubmit={formMethods.handleSubmit(onSubmit)}
          >
            <InputWithIcon
              HeroIcon={SearchIcon}
              name="shareCode"
              size={10}
              placeholder="Share code"
            />
            <Button
              color="primary"
              type="submit"
              loading={joinRoomMutation.isLoading}
            >
              Join
            </Button>
          </form>
        </FormProvider>
      </div>
      <div>
        {isCreatingRoom ? (
          <CreateRoomForm
            afterCreation={() => {
              refetch();
              setIsCreatingRoom(false);
            }}
          />
        ) : (
          <RoomsList setNewRoom={setNewRoom} rooms={rooms?.data} />
        )}
      </div>
    </Modal>
  );
};

export default RoomModal;
