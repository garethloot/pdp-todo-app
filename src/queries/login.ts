import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($profile: String!, $username: String!, $password: String!) {
    login(authProfileUuid: $profile, username: $username, password: $password) {
      isValid
      jwtToken
      refreshToken
    }
  }
`;

export const REFRESH_MUTATION = gql`
  mutation refresh($token: String!) {
    refreshToken(token: $token) {
      isValid
      jwtToken
      refreshToken
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation action($input: ActionInput!) {
    actionb5(uuid: "account/signup", input: $input)
  }
`;
