import React from "react";
import { useForm, FormProvider } from "react-hook-form";
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
  const formMethods = useForm<FormFields>();
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
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="p-4 space-y-4"
      >
        <InputWithIcon
          HeroIcon={AnnotationIcon}
          placeholder="Room name"
          name="name"
        />
        <Button color="primary" className="block mx-auto" type="submit">
          Create
        </Button>
      </form>
    </FormProvider>
  );
};

export default CreateRoomForm;
