import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./helpers/appoloClient";

import RoutingSystem from "./router/RoutingSystem";
import AppContextProvider from "./components/AppContextProvider";

import NavigationBar from "./components/NavigationBar";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <RoutingSystem>
          <NavigationBar />
        </RoutingSystem>
      </AppContextProvider>
    </ApolloProvider>
  );
};

export default App;
