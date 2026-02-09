"use client";

import { Edit3, Trash2, Utensils } from "lucide-react";
import { Button } from "../ui/button";
import DeleteMeal from "./DeleteMeal";
// DialogHeader, DialogTitle, DialogDescription ইমপোর্ট করুন
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import EditMeal from "./EditMeal";
import { useState } from "react";

const MealCard = ({ meal, mutate }: { meal: any; mutate?: any }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="bg-white group rounded-[2.5rem] p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 relative overflow-hidden">
      <div className="h-48 bg-gray-100 rounded-[2rem] mb-4 overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
          {meal.image ? (
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Utensils size={48} />
          )}
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
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-orange-50 hover:text-orange-600"
              >
                <Edit3 size={18} />
              </Button>
            </DialogTrigger>

            <DialogContent className="p-0 border-none max-w-md bg-transparent shadow-none">
              <DialogHeader className="sr-only">
                <DialogTitle>Edit Meal: {meal.name}</DialogTitle>
                <DialogDescription>
                  Make changes to your meal details here.
                </DialogDescription>
              </DialogHeader>

              <EditMeal
                meal={meal}
                onClose={() => setIsEditOpen(false)}
                mutate={mutate}
              />
            </DialogContent>
          </Dialog>

          <DeleteMeal mealId={meal._id || meal.id} mutate={mutate} />
        </div>
      </div>
    </div>
  );
};

export default MealCard;
