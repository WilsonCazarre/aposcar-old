import { Auth, AuthContext } from "../components/auth/AuthProvider";
import { useContext } from "react";

export default function useAuth() {
  return useContext(AuthContext) as Auth;
}
