export const getRestaurant = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/meals/get-resturant`,
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch restaurant");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    throw error;
  }
};

export const getCategoriesInProvider = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/meals/categories`,
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Backend Error:", errorData.message);
      return { success: false, data: [] };
    }

    const data = await res.json();
    if (!data) return null;
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, data: [] };
  }
};
