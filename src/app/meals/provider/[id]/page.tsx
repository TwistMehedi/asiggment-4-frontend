import { getProviderById } from "@/service/Home/meal.service";
import { MapPin, Phone, Star, ShoppingBag, Clock, Info } from "lucide-react";

const Provider = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const provider = await getProviderById(id);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gray-900 text-white pt-12 md:pt-20 pb-24 md:pb-32 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider ${
                    provider?.isOpen
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {provider?.isOpen ? "Open Now" : "Closed"}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-bold text-white">
                    (50+ Reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                {provider.shopName}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-300">
                <div className="flex items-center gap-1.5">
                  <MapPin size={18} className="text-orange-500 shrink-0" />
                  <span className="text-sm line-clamp-1">
                    {provider.address}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShoppingBag size={18} className="text-orange-500 shrink-0" />
                  <span className="text-sm">
                    {provider.totalMeals} Items Available
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-orange-500/20 active:scale-95">
              Follow Shop
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-12 md:-mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Info size={20} className="text-orange-500" /> About Shop
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                {provider.description}
              </p>

              <div className="space-y-4 border-t border-gray-50 pt-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 flex items-center gap-2">
                    <Clock size={14} /> Delivery Time
                  </span>
                  <span className="font-bold text-gray-800 tracking-tight">
                    30-45 min
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Min. Order</span>
                  <span className="font-bold text-gray-800">৳500</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Available Meals
              </h2>
              <div className="h-0.5 flex-1 bg-gray-100 mx-4 md:mx-6 hidden sm:block"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full p-12 border-2 border-dashed border-gray-200 rounded-3xl text-center flex flex-col items-center gap-3">
                <div className="bg-gray-100 p-4 rounded-full">
                  <ShoppingBag className="text-gray-300 h-8 w-8" />
                </div>
                <p className="text-gray-400 font-medium">
                  Add your MealCard map here to show provider's items
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Provider;
