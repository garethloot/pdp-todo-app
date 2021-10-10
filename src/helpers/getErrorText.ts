import { ApolloError } from "@apollo/client/errors";

const concatErrors = (extensions: any) => {
  if (extensions.error) {
    const errors: string[] = [];
    for (const objectName in extensions.error) {
      const object = extensions.error[objectName];
      let errorArray = [];
      for (const errorName in object) {
        const error = extensions.error[objectName][errorName];
        const replaceDashes = error.map((text: string) =>
          text.replaceAll("_", " ")
        );
        errorArray.push(
          `${errorName.replaceAll("_", " ")} ${replaceDashes.join("and ")} `
        );
      }
      errors.push(`${objectName} - ${errorArray.join(", ")}`);
    }
    return errors.join(". ");
  }
  return undefined;
};

const getErrorText = (error: ApolloError | undefined): string | undefined => {
  if (error) {
    const errors = error.graphQLErrors.map((value) => {
      return `Error: ${concatErrors(value?.extensions) || value?.message}`;
    });
    return errors.join(" ");
  }
  return undefined;
};
export default getErrorText;
