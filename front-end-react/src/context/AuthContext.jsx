import { useMutation } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { authResource } from "../resources/auth.resource";
import { axiosInstance } from '../resources/axios-instance';

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState("");
  const {
    mutate: signIn,
    isLoading: isSigningIn,
    error: signInError,
  } = useMutation(
    ({ email, password }) => authResource.signIn(email, password),
    {
      onSuccess: ({ token }) => {
        setToken(token);
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`
      },
      onError: () => {
        signOut();
      },
    }
  );
  const isAuth = Boolean(token);
  const signOut = () => {
    setToken("");
    axiosInstance.defaults.headers['Authorization'] = ''
  }

  return (
    <AuthContext.Provider
      value={{ isAuth, signIn, signOut, isSigningIn, signInError }}
    >
      {children}
    </AuthContext.Provider>
  );
}
