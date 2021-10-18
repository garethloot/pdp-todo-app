import { ApolloError } from "@apollo/client/errors";

const formatError = (err: ApolloError) => {
  const errorMessage =
    (err.graphQLErrors &&
      err.graphQLErrors[0] &&
      err.graphQLErrors[0].extensions?.error) ||
    err.message;
  const errorTitle =
    (err.graphQLErrors &&
      err.graphQLErrors[0] &&
      err.graphQLErrors[0].message) ||
    (err.networkError && err.networkError.message);
  return [errorTitle, errorMessage];
};

const cleanUpMessage = (message: any) =>
  message &&
  JSON.stringify(message)
    .replace(/[{}[\]_"]/g, " ")
    .replace(/[ ]+/g, " ")
    .replace(/ :/g, ":")
    .replace(/ ,/g, ",")
    .trim();

const getErrorText = (error: ApolloError | undefined): string | undefined => {
  if (error) {
    const [, errorMessage] = formatError(error);
    return cleanUpMessage(errorMessage);
  }
  return undefined;
};
export default getErrorText;
