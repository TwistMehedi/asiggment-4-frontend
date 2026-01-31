import { Edit3, Trash2, Utensils } from "lucide-react";
import { Button } from "../ui/button";

const MealCard = ({ meal, isDemo }: { meal: any; isDemo: boolean }) => (
  <div className="bg-white group rounded-[2.5rem] p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 relative overflow-hidden">
    <div className="h-48 bg-gray-100 rounded-[2rem] mb-4 overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center text-gray-300">
        <Utensils size={48} />
      </div>
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-orange-600">
        {meal.category || "General"}
      </div>
    </div>

    <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors">
      {meal.name}
    </h3>

    <div className="flex justify-between items-center mt-4">
      <p className="text-2xl font-black text-gray-900 flex items-center">
        <span className="text-sm mr-1 font-normal text-gray-500">৳</span>{" "}
        {meal.price}
      </p>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-orange-50 hover:text-orange-600"
        >
          <Edit3 size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>

    {isDemo && (
      <div className="absolute inset-0 bg-white/10 pointer-events-none" />
    )}
  </div>
);

export default MealCard;
