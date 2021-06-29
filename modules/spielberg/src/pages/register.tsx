import React from "react";

import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

const Register: React.FC = () => {
  return (
    <AuthLayout pageTitle="Register">
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
