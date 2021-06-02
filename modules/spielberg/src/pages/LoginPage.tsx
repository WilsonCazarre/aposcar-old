import React, { useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

import AuthForm from "../components/Forms/AuthForm";
import PageWrapper from "../components/PageWrapper";
import InputField from "../components/Forms/InputField";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import LoadingComponent from "../components/LoadingComponent";
import { formErrors } from "../utils/constants";

interface FormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit, errors, setError } = useForm<FormData>();
  const history = useHistory();
  const { signIn, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await signIn(data);
      history.push("/");
    } catch (e) {
      const errorMessage =
        e.response.status === 400 ? formErrors.badAuth : formErrors.serverError;

      setError("username", {
        message: errorMessage,
      });
      setIsLoading(false);
    }
  };
  return (
    <PageWrapper>
      {user && <Redirect to={"/"} />}
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <InputField
            name="username"
            placeholder="username"
            icon="user"
            inputRef={register({
              required: formErrors.required,
            })}
            error={errors.username}
          />
          <InputField
            name="password"
            placeholder="password"
            icon="lock"
            type="password"
            inputRef={register({ required: formErrors.required })}
            error={errors.password}
          />
          <a
            className="font-light text-sm block text-center pt-3"
            href={"/password-reset"}
          >
            Forgot your password?
          </a>
        </div>
        <div className="flex mt-5 space-x-1 sm:mt-10">
          <Button styleType="primary" className="flex-1" type="submit">
            Login
          </Button>

          <Link
            to="/register"
            className="flex-1 py-1 px-6 rounded outline-none text-white bg-gray-700 sm:bg-gray-800"
          >
            Register
          </Link>
        </div>
        {isLoading && <LoadingComponent />}
      </AuthForm>
    </PageWrapper>
  );
};

export default LoginPage;
