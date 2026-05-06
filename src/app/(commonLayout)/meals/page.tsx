import { getAllMeals } from "@/service/meal/meal.service";
import { IMeal } from "@/types/meal.type";
import PublicMealCard from "@/components/Meal/PublicMealCard";
import SearchSection from "@/components/Meal/SearchSection";
import Pagination from "@/components/Meal/Pagination";
import SkeletonMealCard from "@/components/Meal/SkeletonMealCard";
import { Suspense } from "react";

const Meals = async ({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const { query, category, sort, page } = await searchParams;

  const currentPage = Number(page) || 1;

  const data = await getAllMeals(
    query || "",
    category || "",
    currentPage,
    10,
    sort || "",
  );

  let meals = data.meals || [];

  if (sort === "price_asc") {
    meals = [...meals].sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    meals = [...meals].sort((a, b) => b.price - a.price);
  } else if (sort === "rating_desc") {
    meals = [...meals].sort((a, b) => {
      const aRate = a.reviews?.length
        ? a.reviews.reduce((sum: number, item) => sum + item.rating, 0) /
          a.reviews.length
        : 0;
      const bRate = b.reviews?.length
        ? b.reviews.reduce((sum: number, item) => sum + item.rating, 0) /
          b.reviews.length
        : 0;
      return bRate - aRate;
    });
  }

  const meta = data.meta;

  // console.log(meals);
  return (
    <section className="px-4 md:px-6 py-12 md:py-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Choose your favorite meals
        </h3>
        <SearchSection />

        {meals && meals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <Suspense fallback={
              <>
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonMealCard key={i} />
                ))}
              </>
            }>
              {meals?.map((meal: IMeal) => (
                <PublicMealCard key={meal.id} meal={meal} />
              ))}
            </Suspense>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl font-semibold text-gray-500 dark:text-slate-200">
              No Meals Found
            </p>
            <p className="text-gray-400 dark:text-slate-400 mt-2">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>

      {meta?.totalPages > 1 && meals && meals.length > 0 && (
        <Pagination
          totalPages={meta.totalPages}
          currentPage={currentPage}
          query={query}
          category={category}
        />
      )}
    </section>
  );
};

export default Meals;
