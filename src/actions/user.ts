"use server";
import { getUser } from "@/service/User/user.service";

export default async function currentUser() {
  return await getUser();
}
