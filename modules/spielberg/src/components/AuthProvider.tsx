import React, { useState } from "react";
import { User } from "../types/interfaces";
import { api } from "../hooks/api";
import { UseMutateFunction, useMutation } from "react-query";

interface signInFields {
  username: string;
  password: string;
}

export interface AuthObject {
  user?: User;
  signIn: UseMutateFunction<User, unknown, signInFields>;
  signOut: () => void;
  token: string;
}

export const AuthContext = React.createContext<AuthObject | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState("");

  const signIn = useMutation(
    async (data: signInFields) => {
      const tokenRes = await api.post<{ token: string }>("/login/", data);
      const newToken = `Token ${tokenRes.data.token}`;

      const userRes = await api.get<User>("/users/current_user/", {
        headers: { Authorization: newToken },
      });

      return { newToken, ...userRes.data };
    },
    {
      onSuccess: (data) => {
        const { newToken, ...userData } = data;
        setUser(userData);
        setToken(newToken);
        api.defaults.headers["Authorization"] = newToken;
      },
    }
  );

  const signOut = () => {
    setToken("");
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn: signIn.mutateAsync, signOut, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
