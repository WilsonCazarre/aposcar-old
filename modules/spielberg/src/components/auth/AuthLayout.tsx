import React, { useEffect } from "react";
import Card from "../Card";
import AposcarLogo from "../../assets/icons/AposcarLogo";
import useAuth from "../../lib/useAuth";
import { useRouter } from "next/router";

const AuthLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <div className="h-screen">
      <div className="w-96 py-24 mx-auto">
        <Card>
          <div className="pt-10 mx-auto">
            <AposcarLogo height="70" width="100%" />
            <div className="p-8 pt-16">{children}</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
