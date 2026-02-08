import { cookies } from "next/headers";

export const getUser = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/auth/get-session`,
      {
        method: "GET",
        headers: {
          Cookie: cookieString,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    const session = await response.json();
    return session?.user || null;
  } catch (error: any) {
    console.error("getUser Error:", error);
    return null;
  }
};
