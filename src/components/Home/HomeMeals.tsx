import { getHomeMeals } from "@/service/Home/home.service";
import React from "react";

const HomeMeals = async () => {
  const { data } = await getHomeMeals();
  console.log(data);
  return (
    <section className="px-6 py-16 bg-gray-50">
      <h3 className="text-3xl font-semibold text-center mb-10">
        Popular Meals
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {data?.map(
          (meal: {
            id: string;
            name: string;
            price: number;
            image: string;
            category: string;
          }) => (
            <div
              key={meal.id}
              className="border rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              <div className="h-32 bg-gray-200" />
              <div className="p-4">
                <h4 className="font-semibold">{meal?.name}</h4>
                <p className="text-sm text-gray-500">{meal?.price}</p>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default HomeMeals;
