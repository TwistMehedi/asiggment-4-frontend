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
