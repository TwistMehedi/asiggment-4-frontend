import MealCard from "@/components/Meal/MealCard";
import { getProviderById } from "@/service/meal/meal.service";
import {
  MapPin,
  ShoppingBag,
  Clock,
  Info,
  Star,
  Search,
  Filter,
  ArrowRight,
} from "lucide-react";

const Provider = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const provider = await getProviderById(id);
  const allMeals = provider?.meals;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 1. Hero Section (Header Area) */}
      <div className="bg-gray-950 text-white relative overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>

        <div className="max-w-6xl mx-auto px-6 pt-20 pb-28 relative z-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest ${
                  provider?.isOpen
                    ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                    : "bg-red-500 text-white"
                }`}
              >
                {provider?.isOpen ? "● Open Now" : "○ Closed"}
              </span>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Star
                  size={14}
                  className="text-yellow-400"
                  fill="currentColor"
                />
                <span className="text-sm font-bold">4.8</span>
                <span className="text-gray-400 text-xs">(50+ Reviews)</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              {provider.shopName}
            </h1>

            <div className="flex flex-wrap items-center gap-y-3 gap-x-8 text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">
                  <MapPin size={18} />
                </div>
                <span className="text-sm md:text-base font-medium">
                  {provider.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                  <ShoppingBag size={18} />
                </div>
                <span className="text-sm md:text-base font-medium">
                  {provider.totalMeals} Items Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. About Section (Full Width Stacked) */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Info className="text-orange-500" size={24} />
                <h2 className="text-2xl font-black text-gray-900">
                  About Our Kitchen
                </h2>
              </div>
              <p className="text-gray-500 text-lg leading-relaxed italic">
                "{provider.description}"
              </p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-400 text-sm flex items-center gap-2 font-medium">
                  <Clock size={16} /> Delivery Time
                </span>
                <span className="font-bold text-gray-900 tracking-tight">
                  30-45 min
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm font-medium">
                  Minimum Order
                </span>
                <span className="font-bold text-gray-900 tracking-tight">
                  ৳500
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Meals Grid Section */}
      <div className="max-w-6xl mx-auto px-6 mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 font-bold text-sm uppercase tracking-widest">
              <div className="w-10 h-[2px] bg-orange-600"></div>
              Freshly Prepared
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Today's Menu
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allMeals && allMeals.length > 0 ? (
            allMeals.map((meal: any) => (
              <div key={meal.id} className="h-full">
                <MealCard meal={meal} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 bg-gray-50 rounded-[3rem] text-center border-2 border-dashed border-gray-200">
              <ShoppingBag className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-xl font-bold text-gray-900">
                No meals found
              </h3>
              <p className="text-gray-400 mt-2">
                Check back later for delicious updates!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Provider;
