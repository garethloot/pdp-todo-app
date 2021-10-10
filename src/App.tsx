import React from "react";
import client from "./helpers/appoloClient";
import RoutingSystem from "./router/RoutingSystem";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";
import { AppContextProvider } from "./components";

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <RoutingSystem />
      </ThemeProvider>
    </AppContextProvider>
  </ApolloProvider>
);
export default App;
