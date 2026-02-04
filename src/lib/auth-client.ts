import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:5000",
});

export type CustomAuthClient = typeof authClient & {
  signUp: {
    email: (options: {
      name: string;
      email: string;
      password: string;
      data: { role: string };
    }) => Promise<any>;
  };
};

export const client = authClient as CustomAuthClient;
