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
import Button from "../components/Button";
import { useScreenType } from "../utils/useScreenType";
import ColumnHeader from "../components/layouts/ColumnHeader";
import RoomCard from "../components/rooms/RoomCard";

export interface Props {
  categories: Category[];
}

const Home: React.FC<Props> = ({ categories }) => {
  const [showRightPanel, setShowRightPanel] = useState(false);
  const screenType = useScreenType();
  return (
    <>
      <MainLayout>
        <RoomProvider>
          <MainGrid
            leftPanel={
              <>
                <ColumnHeader />
                <ProfileCard />
                <RoomCard />
              </>
            }
            rightPanel={<WinnersCard categories={categories} />}
            showRightPanel1col={showRightPanel}
          >
            <Scoreboard />
          </MainGrid>
          {screenType === "1-cols" && (
            <Button
              color="primary"
              onClick={() => setShowRightPanel(!showRightPanel)}
            >
              toggle
            </Button>
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
