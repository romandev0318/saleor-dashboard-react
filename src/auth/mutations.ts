import gql from "graphql-tag";

import { TypedMutation } from "../mutations";
import {
  RequestPasswordReset,
  RequestPasswordResetVariables
} from "./types/RequestPasswordReset";
import { TokenAuth, TokenAuthVariables } from "./types/TokenAuth";
import { VerifyToken, VerifyTokenVariables } from "./types/VerifyToken";

export const fragmentUser = gql`
  fragment User on User {
    id
    email
    firstName
    lastName
    isStaff
    note
    permissions {
      code
      name
    }
    avatar {
      url
    }
  }
`;

export const tokenAuthMutation = gql`
  ${fragmentUser}
  mutation TokenAuth($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      errors {
        field
        message
      }
      user {
        ...User
      }
    }
  }
`;

export const TypedTokenAuthMutation = TypedMutation<
  TokenAuth,
  TokenAuthVariables
>(tokenAuthMutation);

export const tokenVerifyMutation = gql`
  ${fragmentUser}
  mutation VerifyToken($token: String!) {
    tokenVerify(token: $token) {
      payload
      user {
        ...User
      }
    }
  }
`;

export const TypedVerifyTokenMutation = TypedMutation<
  VerifyToken,
  VerifyTokenVariables
>(tokenVerifyMutation);

export const requestPasswordReset = gql`
  mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {
    requestPasswordReset(email: $email, redirectUrl: $redirectUrl) {
      errors {
        field
        message
      }
    }
  }
`;
export const RequestPasswordResetMutation = TypedMutation<
  RequestPasswordReset,
  RequestPasswordResetVariables
>(requestPasswordReset);
