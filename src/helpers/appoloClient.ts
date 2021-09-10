import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { API_URL } from "../config";

const httpLink = createHttpLink({
  uri: API_URL,
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      // console.log("graphQLErrors", graphQLErrors);
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
      // console.log(`[Network error]: ${networkError}`);
    }
  }
);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return token
    ? {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      }
    : {
        headers: {
          ...headers,
        },
      };
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export default client;
