import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation action($input: ActionInput!) {
    actionb5(uuid: "account/signup", input: $input)
  }
`;
