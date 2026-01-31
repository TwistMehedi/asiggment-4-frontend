import { adminRoutes } from "@/routes/admin.route";
import { customerRoutes } from "@/routes/customer.route";
import { providerRoutes } from "@/routes/provider.route";

export type Role = "ADMIN" | "CUSTOMER" | "PROVIDER";

export const navByRole: Record<Role, any> = {
  CUSTOMER: customerRoutes,
  ADMIN: adminRoutes,
  PROVIDER: providerRoutes,
};

export const getNavData = (role: Role) => {
  return navByRole[role];
};

// console.log(getNavData);
