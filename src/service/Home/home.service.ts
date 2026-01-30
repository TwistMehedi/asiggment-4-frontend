import { envConfig } from "@/config/envConfig";
import { log } from "console";
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
    console.error("Error fetching categories", error);
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
    console.error("Home meals error", error);
    return [];
  }
};

export const getAllMeals = async (searchTerm = "", category = "") => {
  try {
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.append("search", searchTerm);
    if (category) queryParams.append("category", category);

    const res = await fetch(
      `${envConfig.backend_host_server_url}/meals?${queryParams.toString()}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch meals`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching all meals", error);
    return [];
  }
};

export const getMealById = async (id: string) => {
  try {
    const res = await fetch(
      `${envConfig.backend_host_server_url}/meals/${id}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch meal detail for ID: ${id}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching fish detail", error);
    return null;
  }
};
