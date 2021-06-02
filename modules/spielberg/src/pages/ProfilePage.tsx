import React from "react";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";
import { Redirect } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div>
      {!user && <Redirect to="/" />}
      {JSON.stringify(user)}
      <Button styleType="primary" onClick={signOut}>
        Logout
      </Button>
    </div>
  );
};

export default ProfilePage;
