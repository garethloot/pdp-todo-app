import { createContext } from "react";

export type Context = {
  isAuthenticated: Boolean;
  loginUser: (jwtToken: string, refreshToken: string) => void;
  logoutUser: () => void;
};

export const AppContext = createContext<Context>({
  isAuthenticated: false,
  loginUser: (jwtToken: string, refreshToken: string) => {},
  logoutUser: () => {},
});
