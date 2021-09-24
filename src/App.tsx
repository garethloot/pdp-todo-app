import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./helpers/appoloClient";

import RoutingSystem from "./router/RoutingSystem";
import AppContextProvider from "./components/AppContextProvider";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <RoutingSystem />
        </ThemeProvider>
      </AppContextProvider>
    </ApolloProvider>
  );
};

export default App;
