import React from "react";
import InputWithIcon from "../forms/InputWithIcon";
import { UserIcon, LockClosedIcon, MailIcon } from "@heroicons/react/outline";
import Button from "../Button";
import { useRouter } from "next/router";

interface Props {}

const RegisterForm: React.FC<Props> = () => {
  const router = useRouter();
  return (
    <form>
      <div className="space-y-2">
        <InputWithIcon HeroIcon={UserIcon} placeholder="username" />

        <InputWithIcon HeroIcon={MailIcon} placeholder="email" />
        <InputWithIcon HeroIcon={LockClosedIcon} placeholder="password" />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-16">
        <Button
          type="button"
          color={"secondary"}
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
        <Button color={"primary"} type="submit">
          Register
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
