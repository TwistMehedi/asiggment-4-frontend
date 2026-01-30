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
