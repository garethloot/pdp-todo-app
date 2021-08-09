import { ApolloError } from "@apollo/client/errors";

const getErrorText = (error: ApolloError | undefined): string | undefined => {
  if (error) {
    const errors = error.graphQLErrors.map((value, index) => {
      return `Error: ${value?.extensions?.error.error}`;
    });
    return errors.join("! ");
  }
  return undefined;
};
export default getErrorText;
