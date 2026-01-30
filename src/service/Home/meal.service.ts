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
