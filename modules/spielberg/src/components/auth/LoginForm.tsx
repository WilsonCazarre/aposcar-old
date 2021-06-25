import React from "react";
import InputWithIcon from "../forms/InputWithIcon";
import { UserIcon, LockClosedIcon } from "@heroicons/react/outline";
import Button from "../Button";
import { useRouter } from "next/router";

interface Props {}

const LoginForm: React.FC<Props> = () => {
  const router = useRouter();
  return (
    <form>
      <div className="space-y-2">
        <InputWithIcon HeroIcon={UserIcon} placeholder="username" />
        <InputWithIcon HeroIcon={LockClosedIcon} placeholder="password" />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-16">
        <Button
          color={"secondary"}
          type="button"
          onClick={() => router.push("/register")}
        >
          Register
        </Button>
        <Button
          color={"primary"}
          type="button"
          onClick={() => router.push("/")}
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
