import { cookies } from "next/headers";
import { cache } from "react";

export const getUser = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/user/me`,
      {
        method: "GET",
        headers: {
          Cookie: `token=${token}`,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    // console.log(response);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
});
