import { getAllMeals } from "@/service/meal/meal.service";
import { IMeal } from "@/types/meal.type";
import PublicMealCard from "@/components/Meal/PublicMealCard";
import SearchSection from "@/components/Meal/SearchSection";
import Pagination from "@/components/Meal/Pagination";

const Meals = async ({
  searchParams,
}: {
  searchParams: Promise<{
    searchTerm?: string;
    category?: string;
    page?: string;
  }>;
}) => {
  const { searchTerm, category, page } = await searchParams;

  const currentPage = Number(page) || 1;

  const data = await getAllMeals(
    searchTerm || "",
    category || "",
    currentPage,
    10,
  );

  const { meals, meta } = data;

  // console.log(meals);
  return (
    <section className="px-4 md:px-6 py-12 md:py-20 bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Choose you interested meals
        </h3>
        <SearchSection />

        {meals && meals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {meals?.map((meal: IMeal) => (
              <PublicMealCard key={meal.id} meal={meal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl font-semibold text-gray-500">
              No Meals Found
            </p>
            <p className="text-gray-400 mt-2">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>

      {meta?.totalPages > 1 && meals && meals.length > 0 && (
        <Pagination
          totalPages={meta.totalPages}
          currentPage={currentPage}
          searchTerm={searchTerm}
          category={category}
        />
      )}
    </section>
  );
};

export default Meals;
