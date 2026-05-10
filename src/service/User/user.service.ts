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

export const getUserDashboardStats = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/stats/customer`,
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) return null;

    const data = await res.json();

    return data?.data;
  } catch (error) {
    console.error("Dashboard stats error:", error);

    return {
      totalOrders: 0,
      totalSpent: 0,
      recentOrders: [],
    };
  }
};
