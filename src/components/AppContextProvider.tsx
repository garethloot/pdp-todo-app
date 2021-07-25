import { useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { REFRESH_MUTATION } from "../queries";

import { CircularProgress, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AppContext } from "../store/authContext";

export const useAppContext = () => useContext(AppContext);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    width: "100vw",
  },
}));

interface InputVars {
  token: string;
}

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

  const [loginMutation, { loading, data }] = useMutation<any, InputVars>(
    REFRESH_MUTATION,
    {
      onCompleted: (data) => {
        const { isValid, jwtToken, refreshToken } = data.refreshToken;
        if (isValid) {
          loginUser(jwtToken, refreshToken);
        }
        console.log("Complete");
        setFirstLoad(false);
      },
      onError: (error) => {
        console.log("Error");
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
    console.log("Mount");
    checkLogin();
  }, []);

  return firstLoad ? (
    <div>
      <Fade in>
        <CircularProgress color="secondary" />
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
