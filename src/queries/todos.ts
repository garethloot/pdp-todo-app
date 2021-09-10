import { gql } from "@apollo/client";

export const TODO_CREATE_MUTATION = gql`
  mutation action($input: ActionInput!) {
    actionb5(uuid: "todos/create", input: $input)
  }
`;

export const TODO_DELETE_MUTATION = gql`
  mutation action($input: ActionInput!) {
    actionb5(uuid: "todos/delete", input: $input)
  }
`;

export const TODO_UPDATE_MUTATION = gql`
  mutation action($input: ActionInput!) {
    actionb5(uuid: "todos/update", input: $input)
  }
`;

export const TODOS_QUERY = gql`
  query ($where: TaskFilterInput!, $take: Number, $skip: Number) {
    allTask(where: $where, take: $take, skip: $skip) {
      results {
        id
        name
        completed
      }
      totalCount
    }
  }
`;
