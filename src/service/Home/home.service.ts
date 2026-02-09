export const getCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_HOST_URL}/api/meals/categories`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Backend Error:", errorData.message);
      return { success: false, data: [] };
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, data: [] };
  }
};

export const getHomeMeals = async () => {
  try {
    const res = await fetch(`${process.env.BACKEND_HOST_URL}/api/meals/home`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Meals fetched problem");
    }

    const data = await res.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error("Home meals error", error);
    return [];
  }
};
