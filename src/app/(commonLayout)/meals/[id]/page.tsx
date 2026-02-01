import Image from "next/image";
import { Clock, MapPin, Store, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import getMeal from "@/actions/meal";
import AddToCartButton from "@/components/Meal/AddToCartButton";

const MealDetailPage = async ({ params }: { params: any }) => {
  const { id } = await params;
  const { meal } = await getMeal(id);

  return (
    <main className="min-h-screen bg-gray-50 pb-10 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 md:py-6">
        <Link
          href="/meals"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back to Menu</span>
        </Link>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="relative h-[300px] sm:h-[400px] md:h-[550px] bg-gray-200 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-inner flex items-center justify-center">
          {meal.image ? (
            <Image
              src={meal.image}
              alt={meal.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <span className="text-6xl mb-2">🍱</span>
              <p>No Image Available</p>
            </div>
          )}

          <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs md:text-sm font-bold text-orange-600 shadow-sm uppercase">
            {meal.categoryName}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {meal.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-3xl font-black text-orange-600">
                ৳{meal.price}
              </span>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${meal?.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {meal?.isAvailable ? <CheckCircle size={14} /> : null}
                Available: {meal?.isAvailable.toString()}
              </span>
            </div>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm mb-6">
            <h3 className="font-bold text-gray-400 mb-2 uppercase text-[10px] tracking-[0.15em]">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {meal.description}
            </p>
          </div>

          <div className="bg-orange-50 p-5 md:p-6 rounded-3xl border border-orange-100 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 p-2.5 rounded-2xl text-white shrink-0">
                  <Store size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 line-clamp-1">
                    {meal.provider.shopName}
                  </h4>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <MapPin size={12} />
                    <span className="line-clamp-1">
                      {meal.provider.address}
                    </span>
                  </div>
                </div>
              </div>

              <span
                className={`sm:ml-auto self-start text-[10px] font-bold px-3 py-1 rounded-full border uppercase ${meal.provider.isOpen ? "bg-white text-green-600 border-green-200" : "bg-white text-red-600 border-red-200"}`}
              >
                Open: {meal.provider.isOpen.toString()}
              </span>
            </div>
            {meal.provider.description && (
              <p className="text-xs md:text-sm text-gray-600 italic mt-2">
                "{meal.provider.description}"
              </p>
            )}
          </div>

          <div className="flex gap-4 mt-auto">
            <AddToCartButton meal={meal} />
            <button className="flex-1 flex items-center justify-center border-2 border-gray-200 rounded-2xl hover:bg-white hover:border-orange-500 transition-all active:scale-95 text-xl">
              ❤️
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MealDetailPage;
