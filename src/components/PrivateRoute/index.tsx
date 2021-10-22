import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../AppContextProvider";

import { PrivateRouteProps } from "./types";

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  ...rest
}: PrivateRouteProps) => {
  const appContext = useAppContext();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        appContext.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
