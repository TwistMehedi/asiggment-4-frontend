export const getProviderById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/meals/provider/${id}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch provider detail for ID: ${id}`);
    }

    const data = await res.json();
    const provider = data?.provider;
    return provider;
  } catch (error) {
    console.error("Error fetching provider info", error);
    return null;
  }
};

export const getMealById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/meals/${id}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch meal detail for ID: ${id}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching fish detail", error);
    return null;
  }
};

export const getAllMeals = async (
  searchTerm = "",
  category = "",
  page = 1,
  limit = 10,
) => {
  const queryParams = new URLSearchParams();

  if (searchTerm) queryParams.append("searchTerm", searchTerm);
  if (category) queryParams.append("category", category);

  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/meals?${queryParams.toString()}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch meals`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching all meals", error);
    return { meals: [], meta: { totalPages: 1, totalCount: 0 } };
  }
};
