"use server";
import { getCategories } from "@/service/Home/home.service";

export default async function categories() {
  const data = await getCategories();

  return data;
}
