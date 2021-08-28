import React, { useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { kubrick } from "../utils/apiClient";
import { Category } from "../utils/apiEntities";
import MainGrid from "../components/layouts/MainGrid";
import Scoreboard from "../components/scoreboard/Scoreboard";
import RoomProvider from "../components/rooms/RoomProvider";
import ProfileCard from "../components/profile/ProfileCard";
import WinnersCard from "../components/winners/WinnersCard";
import { useScreenType } from "../utils/useScreenType";
import ColumnHeader from "../components/layouts/ColumnHeader";
import RoomCard from "../components/rooms/RoomCard";
import useAuth from "../utils/useAuth";
import { Routes } from "../utils/constants";
import { ChartBarIcon, FilmIcon } from "@heroicons/react/outline";
import Navbar1Col from "../components/navigation/Navbar1Col";

export interface Props {
  categories: Category[];
}

const Home: React.FC<Props> = ({ categories }) => {
  const [currentRoute, setCurrentRoute] = useState<Routes>("scoreboard");
  const screenType = useScreenType();
  const { loggedUser } = useAuth();
  return (
    <>
      <MainLayout>
        <RoomProvider>
          <MainGrid
            leftPanel={
              <>
                <ColumnHeader />
                <ProfileCard />
                {loggedUser && <RoomCard />}
              </>
            }
            rightPanel={<WinnersCard categories={categories} />}
            currentRoute={currentRoute}
          >
            <Scoreboard />
          </MainGrid>
          {screenType === "1-cols" && (
            <Navbar1Col
              currentRoute={currentRoute}
              setCurrentRoute={setCurrentRoute}
            />
          )}
        </RoomProvider>
      </MainLayout>
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
