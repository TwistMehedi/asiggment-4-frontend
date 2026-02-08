"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { Plus, Utensils, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import MealCard from "@/components/Meal/MealCard";
import CreateMeal from "@/components/Meal/CreateMeal";

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to fetch");
  return result.meals || [];
};

const Menu = ({ initialData }: { initialData: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: meals,
    error,
    isLoading,
    mutate,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/meals/provider/me`,
    fetcher,
    {
      fallbackData: initialData?.meals || [],
      revalidateOnFocus: false,
    },
  );

  const handleMealCreated = () => {
    setIsOpen(false);
    mutate();
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-2">
              <Utensils className="text-orange-600" />
              My Kitchen Menu
            </h1>
            <p className="text-gray-500 mt-1">
              Manage and update your available meals
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-2xl px-6 py-6 shadow-lg shadow-orange-200 transition-all">
                <Plus className="mr-2" size={20} /> Add New Menu
              </Button>
            </DialogTrigger>

            <DialogHeader className="sr-only">
              <DialogTitle>Add New Dish Form</DialogTitle>
            </DialogHeader>

            <DialogContent className="max-w-2xl p-0 border-none bg-transparent shadow-none overflow-hidden">
              <CreateMeal onClose={handleMealCreated} />
            </DialogContent>
          </Dialog>
        </div>

        {isLoading && meals.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-orange-600" size={40} />
          </div>
        ) : meals && meals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal: any) => (
              <MealCard key={meal.id} meal={meal} mutate={mutate} />
            ))}
          </div>
        ) : (
          <div>
            <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl mb-8 text-orange-700 text-sm font-medium">
              ⚠️ No meals found in your kitchen. Start adding some!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
