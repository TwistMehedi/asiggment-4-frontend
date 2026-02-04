import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_HOST_URL,
});

export type CustomAuthClient = typeof authClient & {
  signUp: {
    email: (options: {
      name: string;
      email: string;
      password: string;
      role: string;
    }) => Promise<any>;
  };
};

export const client = authClient as CustomAuthClient;
