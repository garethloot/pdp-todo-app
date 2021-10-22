import React, { useState, useContext, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { REFRESH_MUTATION } from "../../queries";

import { CircularProgress, Fade } from "@material-ui/core";

import { AppContext } from "../../store/authContext";
import { RefreshLoginInputVars } from "../../types/auth";
import { useStyles } from "./style";
import { AppContextProviderProps } from "./types";
import { Context } from "../../store/authContext";

export const useAppContext = (): Context => useContext(AppContext);

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}: AppContextProviderProps) => {
  const classes = useStyles();
  const [isAuthenticated, setAuthentication] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
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

  const [loginMutation] = useMutation<any, RefreshLoginInputVars>(
    REFRESH_MUTATION,
    {
      onCompleted: (data) => {
        const { isValid, jwtToken, refreshToken } = data.refreshToken;
        if (isValid) {
          loginUser(jwtToken, refreshToken);
        }
        setFirstLoad(false);
      },
      onError: () => {
        setFirstLoad(false);
      },
    }
  );

  const checkLogin = useCallback(() => {
    const token = window.localStorage.getItem("refresh_token");
    if (token) {
      loginMutation({
        variables: {
          token: token,
        },
      });
    } else {
      setFirstLoad(false);
    }
  }, [setFirstLoad, loginMutation]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return firstLoad ? (
    <div className={classes.root}>
      <Fade in>
        <CircularProgress size={100} color="secondary" thickness={1} />
      </Fade>
    </div>
  ) : (
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
