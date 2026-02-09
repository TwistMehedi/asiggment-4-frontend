import { z } from "zod";

export const mealSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Meal name must be at least 3 characters")
    .max(20, "Meal name not be at up 20 characters"),

  price: z
    .number()
    .refine((val) => !isNaN(val), {
      message: "Price must be a number",
    })
    .refine((val) => val > 0, {
      message: "Price must be greater than 0",
    }),

  categoryName: z.string().trim().min(1, "Category selection is required"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),
});

export type MealFormData = z.infer<typeof mealSchema>;
