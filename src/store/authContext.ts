import { createContext } from "react";

export type Context = {
  isAuthenticated: boolean;
  loginUser: (jwtToken: string, refreshToken: string) => void;
  logoutUser: () => void;
};

export const AppContext = createContext<Context>({
  isAuthenticated: false,
  loginUser: () => undefined,
  logoutUser: () => undefined,
});
