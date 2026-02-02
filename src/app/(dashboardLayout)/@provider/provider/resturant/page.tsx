"use client";

import React, { useEffect, useState } from "react";
import { Plus, MapPin, Edit, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateRestaurant from "@/components/Meal/CreateRestaurant";
import { getRestaurant } from "@/service/Resturant/resturant.service";

const Resturant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    getRestaurant()
      .then((data) => {
        setRestaurant(data.resturant);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <div className="p-10 text-center text-orange-600 font-bold">
        Loading My Restaurant...
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Restaurant</h1>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg shadow-orange-100">
              <Plus className="mr-2" size={18} /> Add Restaurant
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[600px] p-0 border-none bg-transparent overflow-hidden">
            <DialogHeader className="sr-only">
              <DialogTitle>Add Restaurant</DialogTitle>
            </DialogHeader>

            <CreateRestaurant onClose={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {restaurant ? (
        <div className="bg-white border rounded-[2rem] overflow-hidden shadow-sm max-w-2xl">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-48 h-48">
              <img
                src={restaurant.image}
                alt="shop"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Shop Name: {restaurant.shopName}
                  </h2>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                    <MapPin size={14} className="text-orange-500" />
                    Resturant Address : {restaurant.address}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Edit size={18} />
                </Button>
              </div>
              <p className="text-gray-600 text-sm mt-4 line-clamp-2">
                Description: {restaurant.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-[2rem] text-gray-400 flex flex-col items-center gap-4">
          <Store size={40} className="opacity-20" />
          <p>No restaurant found. Please add one to get started.</p>
        </div>
      )}
    </div>
  );
};

export default Resturant;
