import React from "react";
import LoginForm from "../components/auth/LoginForm";
import AuthLayout from "../components/auth/AuthLayout";

const Login: React.FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
