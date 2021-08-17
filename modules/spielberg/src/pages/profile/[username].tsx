import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { kubrick } from "../../utils/apiClient";
import { User } from "../../utils/apiEntities";
import MainLayout from "../../components/layouts/MainLayout";
import Card from "../../components/Card";

interface ProfilePageProps {
  user: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  return (
    <>
      <MainLayout pageTitle={`Aposcar / ${user.username}`}>
        <div className="w-2/4 mx-auto space-y-4">
          <Card
            className="p-4"
            childrenClassName="flex items-center justify-between"
          >
            <div>
              <div className="text-2xl">{user.username}</div>
              <div className="font-light">Playing since 2020</div>
            </div>
            <div className="text-center w-20">
              <div className="text-7xl">{user.score}</div>
              <div className="leading-4">Total Aposcar Points </div>
            </div>
          </Card>
        </div>
      </MainLayout>
    </>
  );
};

export default ProfilePage;

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<ProfilePageProps>
> {
  try {
    const response = await kubrick.get<User>(`users/${query.username}/`);
    return { props: { user: response.data } };
  } catch (e) {
    return { notFound: true };
  }
}
