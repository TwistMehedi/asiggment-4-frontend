import { envConfig } from "@/config/envConfig";

import { cookies } from "next/headers";

export const getCategories = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;
    const res = await fetch(`${envConfig.backend_host_server_url}/categories`, {
      method: "GET",
      headers: {
        Cookie: `token=${token}`,
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Backend Error:", errorData.message);
      return { success: false, data: [] };
    }

    const data = await res.json();
    if (!data) return null;
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, data: [] };
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
