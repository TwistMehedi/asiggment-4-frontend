import { headers } from "next/headers";

export const getUser = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/auth/get-session`,
      {
        method: "GET",
        headers: await headers(),
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    const session = await response.json();
    return session?.user || null;
  } catch (error) {
    console.error("getUser Error:", error);
    return null;
  }
};
