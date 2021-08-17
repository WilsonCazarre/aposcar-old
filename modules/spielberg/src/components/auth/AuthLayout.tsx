import React, { useEffect } from "react";
import AposcarLogo from "../../assets/icons/AposcarLogo";
import useAuth from "../../utils/useAuth";
import { useRouter } from "next/router";
import Head from "next/head";

interface Props {
  pageTitle?: string;
  submitButton?: React.ReactNode;
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
    <div className="max-h-screen">
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
      <div className="max-w-xs mx-auto pt-16 px-8">
        <AposcarLogo height="70" width="100%" />
        <div className="mt-16">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
