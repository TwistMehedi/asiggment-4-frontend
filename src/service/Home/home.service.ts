import { headers } from "next/headers";

export const getCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/meals/categories`,
      {
        method: "GET",
        headers: await headers(),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Backend Error:", errorData.message);
      return { success: false, data: [] };
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, data: [] };
  }
};

export const getHomeMeals = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/meals/home`,
      {
        method: "GET",
        headers: await headers(),
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Meals fetched problem");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Home meals error", error);
    return [];
  }
};
