import { getCategories } from "@/service/Home/home.service";
import { Loader } from "lucide-react";
import Link from "next/link";

const Catagory = async () => {
  const category = await getCategories();

  const data = category?.data;

  return (
    <section className="px-4 sm:px-6 py-12 md:py-20 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-10 md:mb-14 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Popular Categories
          </h3>
          <div className="h-1.5 w-16 bg-orange-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {data?.map((cat: { id: string; name: string }) => (
            <Link
              key={cat.id}
              href={`/meals?category=${cat.name}`}
              className="group cursor-pointer bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-5 sm:p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-50 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-orange-500 transition-colors duration-500">
                <span className="text-xl sm:text-2xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                  🍱
                </span>
              </div>

              <h4 className="font-bold text-gray-700 text-base sm:text-lg md:text-xl group-hover:text-orange-600 transition-colors line-clamp-1">
                {cat?.name}
              </h4>

              <p className="hidden sm:block text-xs sm:text-sm text-gray-400 mt-2 font-medium">
                Explore Items
              </p>

              <div className="sm:hidden mt-2 w-5 h-1 bg-orange-200 rounded-full group-hover:w-8 group-hover:bg-orange-500 transition-all"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catagory;
