import React from "react";
import Head from "next/head";
import MainLayout from "../components/MainLayout";
import Card from "../components/Card";

export default function Home() {
  return (
    <>
      <main className="h-full">
        <MainLayout>
          <div className="grid grid-cols-1 p-10 pt-7 gap-7 h-full md:grid-cols-2">
            <Card
              header={<div className="font-bold text-2xl">Global Ranking</div>}
            />
            <Card
              header={<div className="font-bold text-2xl">Categories</div>}
            />
          </div>
        </MainLayout>
      </main>
    </>
  );
}
