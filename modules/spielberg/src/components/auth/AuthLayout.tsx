import React, { useEffect } from "react";
import Card from "../Card";
import AposcarLogo from "../../assets/icons/AposcarLogo";
import useAuth from "../../utils/useAuth";
import { useRouter } from "next/router";
import Head from "next/head";

interface Props {
  pageTitle?: string;
}

const AuthLayout: React.FC<Props> = ({ children, pageTitle }) => {
  const router = useRouter();
  const { loggedUser } = useAuth();

  useEffect(() => {
    if (loggedUser) {
      router.push("/");
    }
  }, [router, loggedUser]);

  return (
    <div className="h-screen">
      <Head>
        <title>{pageTitle ?? "Aposcar"}</title>
        <meta
          name="description"
          content="Vote and compete with your friends to discover who knows more about the Academy Awards"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏆</text></svg>"
        />
      </Head>
      <div className="w-96 pt-16 mx-auto">
        <Card noMaxHeight>
          <div className="pt-8 mx-auto">
            <AposcarLogo height="70" width="100%" />
            <div className="p-8 pt-16">{children}</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
