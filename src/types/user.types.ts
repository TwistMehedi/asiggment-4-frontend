export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: "CUSTOMER" | "ADMIN" | "PROVIDER";
  createdAt?: string;
  updatedAt?: string;
  image?: string | null;
}
