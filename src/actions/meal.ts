import { getMealById } from "@/service/Home/home.service";

export default async function getMeal(id: string) {
  return await getMealById(id);
}
