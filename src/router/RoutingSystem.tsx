import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { TodosPage, LoginPage, Error404 } from "../pages";
import PrivateRoute from "../components/PrivateRoute";

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

        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </Router>
  );
};

export default RoutingSystem;
