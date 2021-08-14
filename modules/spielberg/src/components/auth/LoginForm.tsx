import React, { useState } from "react";
import InputWithIcon from "../forms/InputWithIcon";
import { LockClosedIcon, UserIcon } from "@heroicons/react/outline";
import Button from "../Button";
import { useRouter } from "next/router";
import useAuth from "../../utils/useAuth";
import { useForm, FormProvider } from "react-hook-form";
import { LoginCredentials } from "./AuthProvider";

const LoginForm: React.FC = () => {
  const router = useRouter();
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
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="space-y-2">
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
        <div className="grid grid-cols-2 gap-2 mt-16">
          <Button
            color={"secondary"}
            type="button"
            onClick={() => router.push("/register")}
            loading={isSubmitting}
          >
            Register
          </Button>
          <Button color={"primary"} type="submit" loading={isSubmitting}>
            Login
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
