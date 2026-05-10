import currentUser from "@/actions/user";
import { User } from "@/types/user.types";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const user = ((await currentUser()) as User) || null;

  if (user.role === "ADMIN") {
    redirect("/dashboard/admin");
  } else if (user.role === "PROVIDER") {
    redirect("/dashboard/provider");
  } else {
    redirect("/dashboard/customer");
  }

  return null;
};

export default Dashboard;
