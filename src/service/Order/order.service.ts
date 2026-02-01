"use server";

import { cookies } from "next/headers";

export const createOrder = async (orderData: any) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "You must be logged in to place an order.",
      };
    }

    const res = await fetch("http://localhost:5000/api/order/create", {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

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
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    const res = await fetch("http://localhost:5000/api/order/get/me", {
      method: "GET",
      cache: "no-store",
      headers: {
        Cookie: cookieString,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
      credentials: "include",
    });

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
    const cookieStore = await cookies();
    const res = await fetch(`http://localhost:5000/api/order/single/${id}`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      cache: "no-store",
      credentials: "include",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch order detail error:", error);
    return null;
  }
};
