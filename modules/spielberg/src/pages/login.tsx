import React from "react";
import LoginForm from "../components/auth/LoginForm";
import AuthLayout from "../components/auth/AuthLayout";

const Login: React.FC = () => {
  return (
    <AuthLayout pageTitle="Login">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
