import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { formErrors } from "../utils/constants";
import { useMutation } from "react-query";
import { api } from "../hooks/api";
import { BaseError, User } from "../types/interfaces";
import { AxiosError, AxiosResponse } from "axios";
import { Link, useHistory } from "react-router-dom";

import PageWrapper from "../components/PageWrapper";
import AuthForm from "../components/Forms/AuthForm";
import InputField from "../components/Forms/InputField";
import Button from "../components/Button";
import LoadingComponent from "../components/LoadingComponent";

interface FormFields {
  username: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const { handleSubmit, register, errors, setError } = useForm<FormFields>();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  //const { setAlert } = useAlert();

  const userMutation = useMutation<
    AxiosResponse<User>,
    AxiosError<BaseError>,
    FormFields
  >((formData: FormFields) => api.post<User>("/users/", formData), {
    mutationKey: "createUser",
    onSuccess: (_data) => {
      //setAlert("Your account was created, give it a try :)");
      history.push("/login");
    },
    onError: (e) => {
      const errorMessage =
        e.response?.status === 400
          ? formErrors.badAuth
          : formErrors.serverError;

      setError("username", {
        message: errorMessage,
      });
      setIsLoading(false);
    },
  });

  const onSubmit = (data: FormFields) => {
    setIsLoading(true);
    userMutation.mutate(data);
  };

  return (
    <PageWrapper>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <InputField
            name="username"
            placeholder="username"
            icon="user"
            inputRef={register({ required: formErrors.required })}
            error={errors.username}
          />
          <InputField
            name="email"
            placeholder="email"
            icon="envelope"
            type="email"
            inputRef={register({ required: formErrors.required })}
            error={errors.email}
          />
          <InputField
            name="password"
            placeholder="password"
            icon="lock"
            type="password"
            inputRef={register({ required: formErrors.required })}
            error={errors.password}
          />
        </div>
        <div className="flex mt-5 space-x-1 sm:mt-10">
          <Button styleType="primary" className="flex-1" type="submit">
            Register
          </Button>

          <Link
            to="/login"
            className="flex-1 py-1 px-6 rounded outline-none text-white bg-gray-700 sm:bg-gray-800"
          >
            Login
          </Link>
        </div>
        {isLoading && <LoadingComponent />}
      </AuthForm>
    </PageWrapper>
  );
};

export default RegisterPage;
