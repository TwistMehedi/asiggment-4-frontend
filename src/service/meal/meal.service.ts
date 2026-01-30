import { envConfig } from "@/config/envConfig";

export const getProviderById = async (id: string) => {
  try {
    const res = await fetch(
      `${envConfig.backend_host_server_url}/provider/${id}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch provider detail for ID: ${id}`);
    }

    const data = await res.json();
    const provider = data?.provider;
    // console.log(provider);
    return provider;
  } catch (error) {
    console.error("Error fetching provider info", error);
    return null;
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
