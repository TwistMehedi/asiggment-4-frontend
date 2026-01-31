import { IMeal } from "@/types/meal.type";
import Image from "next/image";
import Link from "next/link";

const PublicMealCard = ({ meal }: { meal: IMeal }) => {
  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
      <div className="relative h-48 bg-gray-100 overflow-hidden shrink-0">
        {meal?.image ? (
          <Image
            src={meal.image}
            alt={meal.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
            <span className="text-4xl mb-1">🥘</span>
            <p className="text-xs">No Image</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-col gap-1 mb-4">
          <h4 className="font-bold text-lg md:text-xl text-gray-800 group-hover:text-orange-600 transition-colors truncate">
            {meal?.name}
          </h4>
          <p className="text-xs md:text-sm font-medium text-gray-600">
            <span className="text-gray-400 font-normal">By </span>
            <Link
              href={`/meals/provider/${meal?.providerId}`}
              className="hover:text-orange-600 hover:underline transition-all"
            >
              {meal?.provider?.shopName || "Local Kitchen"}
            </Link>
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
          <span className="text-xl md:text-2xl font-black text-gray-900">
            ৳{meal?.price}
          </span>
          <Link href={`/meals/${meal.id}`}>
            <button className="bg-gray-900 cursor-pointer text-white text-[10px] md:text-xs px-4 py-2 rounded-full font-bold group-hover:bg-orange-600 transition-all active:scale-95 shadow-md">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicMealCard;
