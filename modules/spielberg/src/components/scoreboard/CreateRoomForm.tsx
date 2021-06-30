import React from "react";
import { useForm } from "react-hook-form";
import { AnnotationIcon } from "@heroicons/react/outline";
import InputWithIcon from "../forms/InputWithIcon";
import { useMutation } from "react-query";
import { kubrick } from "../../utils/apiClient";
import { AxiosError, AxiosResponse } from "axios";
import { Room } from "../../utils/apiEntities";
import Button from "../Button";
import useAuth from "../../utils/useAuth";

interface Props {
  afterCreation: () => void;
}

interface FormFields {
  name: string;
}

const CreateRoomForm: React.FC<Props> = ({ afterCreation }) => {
  const { register, handleSubmit } = useForm<FormFields>();
  const { loggedUser } = useAuth();
  const createRoomMutation = useMutation<
    AxiosResponse<Room>,
    AxiosError,
    FormFields
  >(
    (payload) => {
      const users = [loggedUser?.id];
      return kubrick.post("rooms/", { users, ...payload });
    },
    { onSuccess: afterCreation }
  );

  const onSubmit = (data: FormFields) => {
    createRoomMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <InputWithIcon
        HeroIcon={AnnotationIcon}
        placeholder="Room name"
        {...register("name")}
      />
      <Button color="primary" className="block mx-auto" type="submit">
        Create
      </Button>
    </form>
  );
};

export default CreateRoomForm;
