import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "./AppContextProvider";

interface PrivateRouteProps {
  path: string;
  exact: boolean;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
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
