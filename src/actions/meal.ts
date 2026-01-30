import { getMealById } from "@/service/meal/meal.service";

export default async function getMeal(id: string) {
  return await getMealById(id);
}
