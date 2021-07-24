import { useState, useContext } from "react";

import { AppContext } from "../store/authContext";

export const useAppContext = () => useContext(AppContext);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setAuthentication] = useState(false);

  const loginUser = (jwtToken: string, refreshToken: string) => {
    window.localStorage.setItem("token", jwtToken);
    window.localStorage.setItem("refresh_token", refreshToken);
    setAuthentication(true);
  };

  const logoutUser = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("refresh_token");
    setAuthentication(false);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
