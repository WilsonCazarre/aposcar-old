import React from "react";
import MainLayout from "../components/MainLayout";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { kubrick } from "../utils/apiClient";
import { Category } from "../utils/apiEntities";
import WinnersCard from "../components/winners/WinnersCard";
import ScoreboardCard from "../components/scoreboard/ScoreboardCard";
import RoomProvider from "../components/scoreboard/RoomProvider";

export interface Props {
  categories: Category[];
}

const Home: React.FC<Props> = ({ categories }) => {
  return (
    <>
      <main className="h-full">
        <MainLayout>
          <div className="grid grid-cols-1 p-10 pt-0 gap-7 h-full md:grid-cols-2">
            <RoomProvider>
              <ScoreboardCard />
            </RoomProvider>
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
