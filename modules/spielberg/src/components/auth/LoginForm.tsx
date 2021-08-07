import React from "react";
import InputWithIcon from "../forms/InputWithIcon";
import { LockClosedIcon, UserIcon } from "@heroicons/react/outline";
import Button from "../Button";
import { useRouter } from "next/router";
import useAuth from "../../utils/useAuth";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "./AuthProvider";

interface Props {}

export interface Token {
  refresh: string;
  access: string;
}

const LoginForm: React.FC<Props> = () => {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = (fields: LoginCredentials) => {
    login(fields);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <InputWithIcon
          HeroIcon={UserIcon}
          placeholder="username"
          errors={errors.username}
          {...register("username", { required: true })}
        />
        <InputWithIcon
          HeroIcon={LockClosedIcon}
          placeholder="password"
          type="password"
          errors={errors.password}
          {...register("password", { required: true })}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-16">
        <Button
          color={"secondary"}
          type="button"
          onClick={() => router.push("/register")}
        >
          Register
        </Button>
        <Button color={"primary"} type="submit">
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
