"use client";

import React, { useEffect, useState } from "react";
import { Plus, MapPin, Store } from "lucide-react";
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
import Image from "next/image";
import { EditRestaurantBtn } from "@/components/Meal/EditResturants";

const Resturant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState<any>(null);

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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-orange-600 font-bold flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-600 rounded-full animate-bounce"></div>
          Loading My Restaurant...
        </div>
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            My Restaurant
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your shop details and presence.
          </p>
        </div>

        {!restaurant && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-6 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95">
                <Plus className="mr-2" size={20} /> Add Restaurant
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px] p-0 border-none bg-transparent overflow-hidden">
              <DialogHeader className="sr-only">
                <DialogTitle>Add Restaurant</DialogTitle>
              </DialogHeader>
              <CreateRestaurant onClose={() => setIsOpen(false)} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Restaurant Card */}
      {restaurant ? (
        <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-100/50 max-w-3xl">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="w-full md:w-64 h-64 md:h-auto relative overflow-hidden p-4">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-gray-50">
                <Image
                  src={restaurant?.image}
                  alt="shop"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex-1 flex flex-col justify-between relative">
              {/* Edit Button Positioned Top Right */}
              <div className="absolute top-6 right-6">
                <EditRestaurantBtn restaurant={restaurant} />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-black text-gray-900 uppercase">
                    {restaurant.shopName}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      restaurant.isOpen
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {restaurant.isOpen ? "● Open" : "○ Closed"}
                  </span>
                </div>

                <p className="text-gray-400 text-sm flex items-start gap-1.5 mb-4">
                  <MapPin
                    size={16}
                    className="text-orange-500 shrink-0 mt-0.5"
                  />
                  {restaurant.address}
                </p>

                <div className="bg-gray-50 p-4 rounded-2xl mb-4">
                  <p className="text-gray-500 text-xs font-semibold uppercase mb-1">
                    About
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 italic">
                    "{restaurant.description}"
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase font-bold">
                    Status
                  </span>
                  <span className="text-sm font-bold text-gray-700">
                    Verified Partner
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-24 border-4 border-dashed border-gray-100 rounded-[3rem] text-gray-400 flex flex-col items-center gap-4 bg-gray-50/50">
          <div className="bg-white p-6 rounded-full shadow-sm">
            <Store size={48} className="text-gray-200" />
          </div>
          <div className="max-w-xs">
            <p className="font-bold text-gray-500">No restaurant found</p>
            <p className="text-sm">
              Please add your restaurant to start managing your orders and menu.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resturant;
