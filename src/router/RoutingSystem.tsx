import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { TodosPage, LoginPage } from "../pages";
import PrivateRoute from "../components/PrivateRoute";

const RoutingSystem: React.FC = ({ children }) => {
  return (
    <Router>
      {children}
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/todos">
          <TodosPage />
        </PrivateRoute>
        <Route path="*">
          <h1>404</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default RoutingSystem;
