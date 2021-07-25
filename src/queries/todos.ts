import { gql } from "@apollo/client";

export const TODO_CREATE_MUTATION = gql`
  mutation action($input: ActionInput!, $application_identifier: String!) {
    actionb5(
      uuid: "todos/create"
      applicationIdentifier: $application_identifier
      input: $input
    )
  }
`;

export const TODO_DELETE_MUTATION = gql`
  mutation action($input: ActionInput!, $application_identifier: String!) {
    actionb5(
      uuid: "todos/delete"
      applicationIdentifier: $application_identifier
      input: $input
    )
  }
`;
