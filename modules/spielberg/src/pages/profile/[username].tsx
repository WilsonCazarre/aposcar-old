import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { kubrick } from "../../lib/apiClient";
import { User } from "../../lib/apiEntities";
import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";

interface ProfilePageProps {
  user: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  return (
    <>
      <MainLayout title={user.username}>
        <div className="w-2/4 mx-auto space-y-4">
          <Card className="p-4">
            <div className="text-2xl">{user.username}</div>
            <div className="font-light">Playing since 2020</div>
          </Card>
          <Card className="p-4">Current Edition</Card>
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
  const response = await kubrick.get<User>(`users/${query.username}/`);
  if (response.status === 404) {
    return { notFound: true };
  }
  return { props: { user: response.data } };
}
