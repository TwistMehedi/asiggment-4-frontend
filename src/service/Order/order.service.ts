"use server";
import { cookies } from "next/headers";

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
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/order/me`,
      {
        method: "GET",
        headers: {
          Cookie: cookieString,

          "Content-Type": "application/json",
        },
        cache: "no-store",
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
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/order/${id}`,
      {
        method: "GET",
        headers: {
          Cookie: cookieString,

          "Content-Type": "application/json",
        },
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
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/order/me/provider`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Cookie: cookieString,

          "Content-Type": "application/json",
        },
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
