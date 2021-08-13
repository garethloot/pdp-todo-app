import { ApolloError } from "@apollo/client/errors";

const getErrorText = (error: ApolloError | undefined): string | undefined => {
  if (error) {
    const errors = error.graphQLErrors.map((value) => {
      return `Error: ${value?.extensions?.error?.error || value?.message}`;
    });
    return errors.join(" ");
  }
  return undefined;
};
export default getErrorText;
