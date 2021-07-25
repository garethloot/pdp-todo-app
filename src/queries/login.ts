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
