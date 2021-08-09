import { useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { REFRESH_MUTATION } from "../queries";

import { CircularProgress, Fade } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { AppContext } from "../store/authContext";
import { RefreshLoginInputVars } from "../types/auth";

export const useAppContext = () => useContext(AppContext);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  },
}));

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
      onError: (error) => {
        setFirstLoad(false);
      },
    }
  );

  const checkLogin = () => {
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
  };

  useEffect(() => {
    checkLogin();
  }, []);

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
