import React from "react";
import Navbar from "./navigation/Navbar";
import Footer from "./navigation/Footer";
import Head from "next/head";

interface Props {
  pageTitle?: string;
}

const MainLayout: React.FC<Props> = ({ children, pageTitle }) => {
  return (
    <>
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
      <div className="flex flex-col h-full">
        <Navbar />
        <div className="mt-7 h-full flex-initial">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
