import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { TodosPage, LoginPage, SignupPage, Error404 } from "../pages";
import { PrivateRoute } from "../components";

const RoutingSystem: React.FC = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <TodosPage />
        </PrivateRoute>

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/signup">
          <SignupPage />
        </Route>

        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </Router>
  );
};

export default RoutingSystem;
