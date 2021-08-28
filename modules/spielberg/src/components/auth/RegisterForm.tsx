import React, { useState } from "react";
import InputWithIcon from "../forms/InputWithIcon";
import { LockClosedIcon, MailIcon, UserIcon } from "@heroicons/react/outline";
import Button from "../Button";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { kubrick } from "../../utils/apiClient";
import { AxiosError, AxiosResponse } from "axios";
import { User } from "../../utils/apiEntities";
import useAuth from "../../utils/useAuth";
import { REGEX_EMAIL } from "../../utils/constants";
import Link from "next/link";

interface FormFields {
  username: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formMethods = useForm<FormFields>();
  const registerMutation = useMutation<
    AxiosResponse<User>,
    AxiosError,
    FormFields
  >((payload) => kubrick.post("users/", payload), {
    onSuccess: (_data, variables) => {
      login({
        username: variables.username,
        password: variables.password,
      });
    },
    onError: (e: AxiosError) => {
      const fieldErrors = Object.keys(e.response?.data);
      for (const fieldErrorsKey of fieldErrors) {
        console.log(fieldErrorsKey);
        formMethods.setError(fieldErrorsKey as keyof FormFields, {
          message: e.response?.data[fieldErrorsKey][0],
          type: "badAuth",
        });
      }
    },
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSettled: () => {
      console.log("settled");
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: FormFields) => {
    registerMutation.mutate(data);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} id="registerForm">
        <div className="space-y-4">
          <InputWithIcon
            HeroIcon={UserIcon}
            placeholder="username"
            name="username"
            registerOptions={{ required: true }}
          />

          <InputWithIcon
            HeroIcon={MailIcon}
            placeholder="email"
            autoComplete="email"
            name="email"
            registerOptions={{
              required: true,
              pattern: {
                value: REGEX_EMAIL,
                message: "This doesn't looks like an email",
              },
            }}
          />
          <InputWithIcon
            HeroIcon={LockClosedIcon}
            placeholder="password"
            autoComplete="new-password"
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
          Register
        </Button>
        <div className="text-center mt-5">
          Already have an account?{" "}
          <Link href="/login" passHref>
            <a className="text-yellow">Login</a>
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
