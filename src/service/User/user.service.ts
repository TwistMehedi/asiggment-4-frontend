import { envConfig } from "@/config/envConfig";
import { cookies } from "next/headers";

export const getUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${envConfig.backend_host_server_url}/user/me`,
      {
        method: "GET",
        headers: {
          Cookie: `token=${token}`,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Backend Error Message", errorData);
      return null;
    }

    const data = await response.json();
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.error("Auth Error:", error);
    return null;
  }
};
