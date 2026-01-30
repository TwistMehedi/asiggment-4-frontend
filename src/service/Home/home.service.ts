import { envConfig } from "@/config/envConfig";
export const getCategories = async () => {
  try {
    const res = await fetch(`${envConfig.backend_host_server_url}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getHomeMeals = async () => {
  try {
    const res = await fetch(`${envConfig.backend_host_server_url}/home/meals`, {
      method: "GET",
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      throw new Error("Meals fetched problem");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Home meals error:", error);
    return [];
  }
};
