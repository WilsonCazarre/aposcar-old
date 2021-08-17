import React, { useState } from "react";
import InputWithIcon from "../forms/InputWithIcon";
import { LockClosedIcon, UserIcon } from "@heroicons/react/outline";
import Button from "../Button";
import { useRouter } from "next/router";
import useAuth from "../../utils/useAuth";
import { useForm, FormProvider } from "react-hook-form";
import { LoginCredentials } from "./AuthProvider";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formMethods = useForm<LoginCredentials>();

  const onSubmit = (fields: LoginCredentials) => {
    setIsSubmitting(true);
    login(fields)
      .finally(() => setIsSubmitting(false))
      .catch(() => {
        formMethods.setError("username", {
          type: "badAuth",
          message: "Are you sure this is your name?",
        });
        formMethods.setError("password", {
          type: "badAuth",
          message: "Or password?",
        });
      });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} id="loginForm">
        <div className="space-y-4">
          <InputWithIcon
            HeroIcon={UserIcon}
            placeholder="username"
            name={"username"}
            registerOptions={{ required: true }}
          />
          <InputWithIcon
            HeroIcon={LockClosedIcon}
            placeholder="password"
            type="password"
            name={"password"}
            registerOptions={{ required: true }}
          />
        </div>
        <Button
          color={"primary"}
          type="submit"
          loading={isSubmitting}
          className="w-full mt-7"
        >
          Login
        </Button>
        <div className="text-center mt-5">
          Need an account?{" "}
          <Link href="/register" passHref>
            <a className="text-yellow">Register</a>
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
