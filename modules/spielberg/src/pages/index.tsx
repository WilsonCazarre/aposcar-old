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
import Navbar1Col from "../components/navigation/Navbar1Col";

const Home: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Routes>("scoreboard");
  const screenType = useScreenType();
  const { loggedUser } = useAuth();

  return (
    <>
      <MainLayout>
        <MainGrid
          leftPanel={
            <>
              <ColumnHeader />
              <ProfileCard user={loggedUser} />
              {loggedUser && <RoomCard />}
            </>
          }
          rightPanel={<WinnersCard />}
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
      </MainLayout>
    </>
  );
};

export default Home;
