import React from "react";
import { LogoutIcon } from "@heroicons/react/outline";
import useAuth from "../../utils/useAuth";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  return (
    <button onClick={logout} title="Logout">
      <LogoutIcon className="text-white w-7 h-7" />
    </button>
  );
};

export default LogoutButton;
