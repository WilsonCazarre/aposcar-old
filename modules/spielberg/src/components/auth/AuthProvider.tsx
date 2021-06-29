import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../../utils/constants";
import jwtDecode from "jwt-decode";
import { useMutation } from "react-query";
import { kubrick } from "../../lib/apiClient";

export interface UserTokenClaims {
  tokenType: "access" | "refresh";
  exp: number;
  jti: string;
  user_id: number;
  name: string;
}

export interface Auth {
  user?: UserTokenClaims;
  setUser: (newUser: UserTokenClaims | undefined) => void;
}

export const AuthContext = React.createContext<Auth | undefined>(undefined);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserTokenClaims | undefined>(undefined);
  const refreshMutation = useMutation(() =>
    kubrick.post("token/refresh/", {
      refresh: localStorage.getItem(REFRESH_TOKEN_NAME),
    })
  );

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_NAME);
    if (token) {
      const decoded = jwtDecode<UserTokenClaims>(token);
      setUser(decoded);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setTimeout(refreshMutation.mutate, user.exp);
    }
  }, [user, refreshMutation]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
