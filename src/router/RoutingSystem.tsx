import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { TodosPage, LoginPage } from "../pages";
import PrivateRoute from "../components/PrivateRoute";

const RoutingSystem: React.FC = () => (
  <Router>
    <Switch>
      <PrivateRoute exact path="/">
        <TodosPage />
      </PrivateRoute>

      <Route path="/login">
        <LoginPage />
      </Route>

      <Route path="*">
        <h1>404</h1>
      </Route>
    </Switch>
  </Router>
);

export default RoutingSystem;
