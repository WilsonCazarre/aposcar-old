import React from "react";
import InputWithIcon from "../forms/InputWithIcon";
import { kubrick } from "../../lib/apiClient";
import { UserIcon, LockClosedIcon } from "@heroicons/react/outline";
import Button from "../Button";
import { useRouter } from "next/router";
import useAuth from "../../lib/useAuth";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  ACCESS_TOKEN_NAME,
  KUBRICK_URL,
  REFRESH_TOKEN_NAME,
} from "../../utils/constants";
import jwtDecode from "jwt-decode";
import { UserTokenClaims } from "./AuthProvider";
import { AxiosResponse } from "axios";

interface Props {}

interface FormFields {
  username: string;
  password: string;
}

export interface Token {
  refresh: string;
  access: string;
}

const LoginForm: React.FC<Props> = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const { register, handleSubmit } = useForm<FormFields>();
  const loginMutation = useMutation<AxiosResponse<Token>, unknown, FormFields>(
    (payload) => kubrick.post("token/", payload),
    {
      onSuccess: (response) => {
        console.log(response);
        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.access);
        localStorage.setItem(REFRESH_TOKEN_NAME, response.data.refresh);
        const decoded = jwtDecode<UserTokenClaims>(response.data.access);
        setUser(decoded);
        router.push("/");
      },
    }
  );

  const onSubmit = (fields: FormFields) => {
    loginMutation.mutate(fields);
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
          HeroIcon={LockClosedIcon}
          placeholder="password"
          type="password"
          {...register("password")}
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
