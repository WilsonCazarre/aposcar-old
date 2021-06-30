import React from "react";
import InputWithIcon from "../forms/InputWithIcon";
import { LockClosedIcon, MailIcon, UserIcon } from "@heroicons/react/outline";
import Button from "../Button";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { kubrick } from "../../utils/apiClient";
import { AxiosError, AxiosResponse } from "axios";
import { User } from "../../utils/apiEntities";
import useAuth from "../../utils/useAuth";

interface Props {}

interface FormFields {
  username: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC<Props> = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<FormFields>();
  const registerMutation = useMutation<
    AxiosResponse<User>,
    AxiosError,
    FormFields
  >((payload) => kubrick.post("users/", payload), {
    onSuccess: (_data, variables) => {
      login({ username: variables.username, password: variables.password });
    },
  });

  const onSubmit = (data: FormFields) => {
    registerMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <InputWithIcon
          HeroIcon={UserIcon}
          placeholder="username"
          {...register("username")}
        />

        <InputWithIcon
          HeroIcon={MailIcon}
          placeholder="email"
          {...register("email")}
        />
        <InputWithIcon
          HeroIcon={LockClosedIcon}
          placeholder="password"
          type="password"
          {...register("password")}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-16">
        <Button
          type="button"
          color={"secondary"}
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
        <Button color={"primary"} type="submit">
          Register
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
