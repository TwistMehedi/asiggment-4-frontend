import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",

  fetchOptions: {
    credentials: "include",
  },
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
