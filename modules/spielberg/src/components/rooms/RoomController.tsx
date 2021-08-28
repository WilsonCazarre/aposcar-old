import React, { useState } from "react";
import Button from "../Button";
import { FormProvider, useForm } from "react-hook-form";
import InputWithIcon from "../forms/InputWithIcon";
import { SearchIcon } from "@heroicons/react/outline";
import CreateRoomForm from "./CreateRoomForm";
import RoomsList from "./RoomsList";
import useAuth from "../../utils/useAuth";
import { useMutation, useQuery } from "react-query";
import { kubrick } from "../../utils/apiClient";
import { Room } from "../../utils/apiEntities";
import useCurrentRoom from "../../utils/useCurrentRoom";
import { AxiosError, AxiosResponse } from "axios";

interface FormFields {
  shareCode: string;
}

const RoomController: React.FC = () => {
  const { loggedUser } = useAuth();
  const { data: rooms, refetch } = useQuery(
    "rooms",
    () => kubrick.get<Room[]>("rooms/"),
    { enabled: !!loggedUser }
  );
  const { setRoom } = useCurrentRoom();
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const setNewRoom = (room: Room | undefined) => {
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
    <div className="relative">
      <div className="flex space-x-4 justify-between p-4 sticky top-0 bg-gray-800">
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
      <div className="bg-gray-800 sticky bottom-0 w-full p-2 text-center">
        <Button
          color="secondary"
          onClick={() => setIsCreatingRoom(!isCreatingRoom)}
        >
          {isCreatingRoom ? "Go back to rooms list" : "Create new room"}
        </Button>
      </div>
    </div>
  );
};

export default RoomController;
