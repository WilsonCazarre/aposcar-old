import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../../utils/constants";
import jwtDecode from "jwt-decode";
import { useMutation, useQuery } from "react-query";
import { kubrick } from "../../utils/apiClient";
import { AxiosError, AxiosResponse } from "axios";
import { User } from "../../utils/apiEntities";

export interface UserTokenClaims {
  tokenType: "access" | "refresh";
  exp: number;
  jti: string;
  user_id: number;
  name: string;
}

export interface UserToken {
  access: string;
  refresh: string;
}

export interface Auth {
  loggedUser?: User;
  login: (credentials: LoginCredentials) => Promise<AxiosResponse<UserToken>>;
  logout: () => void;
}

export const AuthContext = React.createContext<Auth | undefined>(undefined);

export interface LoginCredentials {
  username: string;
  password: string;
}

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const userQuery = useQuery<AxiosResponse<User>>(
    ["users", user?.username],
    () => kubrick.get("users/current_user/"),
    { onSuccess: (response) => setUser(response.data), enabled: !!user }
  );
  const onLoginSuccess = async (response: AxiosResponse<UserToken>) => {
    const { access, refresh } = response.data;
    kubrick.defaults.headers["Authorization"] = `Bearer ${access}`;
    const decoded = jwtDecode<UserTokenClaims>(access);
    const date = new Date(decoded.exp * 1000);
    setTimeout(
      () => refreshMutation.mutate({ refresh }),
      date.getTime() - new Date().getTime()
    );
    localStorage.setItem(ACCESS_TOKEN_NAME, access);
    localStorage.setItem(REFRESH_TOKEN_NAME, refresh);
    await userQuery.refetch();
  };

  const loginMutation = useMutation<
    AxiosResponse<UserToken>,
    AxiosError,
    LoginCredentials
  >((credentials) => kubrick.post("token/", credentials), {
    onSuccess: onLoginSuccess,
  });

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    localStorage.removeItem(REFRESH_TOKEN_NAME);
    kubrick.defaults.headers["Authorization"] = undefined;
    setUser(undefined);
  };

  const refreshMutation = useMutation(
    (payload: { refresh: string }) => kubrick.post("token/refresh/", payload),
    { onSuccess: onLoginSuccess, onError: logout }
  );

  useEffect(() => {
    const refresh = localStorage.getItem(REFRESH_TOKEN_NAME);
    if (refresh) {
      refreshMutation.mutate({ refresh });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedUser: user, login: loginMutation.mutateAsync, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
