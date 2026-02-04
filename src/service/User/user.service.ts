import { headers } from "next/headers";

export const getUser = async () => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;

    const headerList = await headers();

    const response = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
      headers: {
        cookie: headerList.get("cookie") || "",
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const session = await response.json();
    return session?.user || null;
  } catch (error) {
    console.error("getUser Error:", error);
    return null;
  }
};
