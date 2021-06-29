import React from "react";
import MainLayout from "../components/MainLayout";
import Card from "../components/Card";
import CardHeader from "../components/CardHeader";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { kubrick } from "../lib/apiClient";
import { Category } from "../lib/apiEntities";
import WinnersCard from "../components/winners/WinnersCard";

export interface Props {
  categories: Category[];
}
const Home: React.FC<Props> = ({ categories }) => {
  return (
    <>
      <main className="h-full">
        <MainLayout>
          <div className="grid grid-cols-1 p-10 pt-0 gap-7 h-full md:grid-cols-2">
            <Card
              header={<CardHeader>Global Ranking</CardHeader>}
              className="h-full"
            />
            <WinnersCard categories={categories} />
          </div>
        </MainLayout>
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const response = await kubrick.get<Category[]>("categories/");

  return {
    props: { categories: response.data },
  };
}
