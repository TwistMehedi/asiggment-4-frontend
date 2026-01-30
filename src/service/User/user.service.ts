import { envConfig } from "@/config/envConfig";
import { cookies } from "next/headers";

export const getUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  // console.log(token);
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

    // console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Backend Error Message", errorData);
      return null;
    }

    const data = await response.json();
    // console.log("data", data);
    return data;
  } catch (error) {
    console.error("Auth Error:", error);
    return null;
  }
};
