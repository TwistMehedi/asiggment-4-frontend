import { getHomeMeals } from "@/service/Home/home.service";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HomeMeals = async () => {
  const mealInfo = await getHomeMeals();
  const data = mealInfo?.data;
  // if (!data) {
  //   return <Loader />;
  // }
  return (
    <section className="px-4 sm:px-6 py-12 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800">
          Popular Meals
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {data?.map(
            (meal: {
              id: string;
              name: string;
              price: number;
              image: string;
              categoryName: string;
            }) => (
              <div
                key={meal?.id}
                className="group border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                  {meal?.image ? (
                    <Image
                      src={meal.image}
                      alt={meal.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-orange-600">
                    {meal?.categoryName}
                  </div>
                </div>

                <div className="p-4 md:p-5">
                  <h4 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-orange-600 transition-colors">
                    {meal?.name}
                  </h4>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xl font-extrabold text-orange-600">
                      ৳{meal?.price}
                    </p>
                    <Link href={`/meals/${meal.id}`}>
                      <button className="text-xs font-semibold bg-gray-100 px-3 py-2 rounded-lg hover:bg-orange-600 hover:text-white transition-colors">
                        Reed More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeMeals;
