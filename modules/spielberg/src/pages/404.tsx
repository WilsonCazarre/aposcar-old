import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "../components/layouts/MainLayout";

const Custom404: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return <MainLayout />;
};

export default Custom404;
