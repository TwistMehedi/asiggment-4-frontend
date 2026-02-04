"use server";
import { cookies, headers } from "next/headers";

export const createOrder = async (orderData: any) => {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/order/create`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          Cookie: cookieString,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message:
          data.message || "Something went wrong while creating the order.",
      };
    }

    return {
      success: true,
      message: "Order placed successfully!",
      data: data.order,
    };
  } catch (error: any) {
    console.error("CREATE_ORDER_ERROR:", error);
    return {
      success: false,
      message: "Internal Server Error. Please try again later.",
    };
  }
};

export const getMyOrders = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/order/me`,
      {
        method: "GET",
        cache: "no-store",
        headers: await headers(),
        next: { revalidate: 0 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Orders fetch error:", error);
    return [];
  }
};

export const getSingleOrder = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/order/${id}`,
      {
        method: "GET",
        headers: await headers(),
        cache: "no-store",
      },
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch order detail error:", error);
    return null;
  }
};

export const getMyOrdersByProvider = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/order/me/provider`,
      {
        method: "GET",
        cache: "no-store",
        headers: await headers(),
        next: { revalidate: 0 },
        credentials: "include",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await res.json();

    return data || [];
  } catch (error) {
    console.error("Orders fetch error:", error);
    return [];
  }
};
