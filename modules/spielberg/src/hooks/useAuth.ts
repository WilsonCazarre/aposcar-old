import { useContext } from "react";
import { AuthContext, AuthObject } from "../components/AuthProvider";

const useAuth = () => useContext(AuthContext) as AuthObject;

export default useAuth;
