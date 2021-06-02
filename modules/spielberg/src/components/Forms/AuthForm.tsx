import React from "react";
import logo from "../../assets/logo.svg";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {}

const AuthForm: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <div
      className="text-center p-4 bg-transparent w-full rounded-2xl
      sm:bg-gray-700 mx-auto w-full sm:w-96 mt-5 sm:mt-10"
    >
      <img
        src={logo}
        alt="Aposcar"
        className="w-full py-6 sm:px-16 mb-5 max-h-40"
      />
      <form className="sm:px-8 mb-5 mx-auto" {...rest}>
        {children}
      </form>
    </div>
  );
};

export default AuthForm;
