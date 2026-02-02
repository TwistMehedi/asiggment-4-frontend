"use client";

import React, { useState, ChangeEvent } from "react";
import { Store, MapPin, AlignLeft, ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";

const CreateRestaurant = ({ onClose }: { onClose?: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    if (imageFile) {
      formData.set("image", imageFile);
    } else {
      toast.error("Please select an image");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/create-resturant",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      const result = await response.json();
      // console.log(result);
      if (response.ok) {
        toast.success(result.message || "Restaurant created successfully!");
        if (onClose) onClose();
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.error("Error creating restaurant:", error);
      toast.error("Network error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-white sm:rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh]">
      <div className="p-6 md:p-8 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10 sm:rounded-t-[2.5rem]">
        <Toaster position="top-center" richColors />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
            <Store size={24} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-none">
              Setup Your Shop
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Fill in the details below
            </p>
          </div>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </Button>
        )}
      </div>

      <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
        <form
          id="restaurant-form"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label
              htmlFor="shopName"
              className="text-gray-700 font-bold ml-1 text-sm"
            >
              Shop Name
            </Label>
            <div className="relative">
              <Store
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                id="shopName"
                name="shopName"
                placeholder="e.g. FoodHub Kitchen"
                className="pl-12 rounded-xl border-gray-200 py-6 focus:ring-orange-200"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-gray-700 font-bold ml-1 text-sm"
            >
              Location Address
            </Label>
            <div className="relative">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                id="address"
                name="address"
                placeholder="e.g. 123 Street, Dhaka"
                className="pl-12 rounded-xl border-gray-200 py-6 focus:ring-orange-200"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-gray-700 font-bold ml-1 text-sm"
            >
              Description
            </Label>
            <div className="relative">
              <AlignLeft
                className="absolute left-4 top-4 text-gray-400"
                size={18}
              />
              <Textarea
                id="description"
                name="description"
                placeholder="Write a short bio..."
                className="pl-12 rounded-xl min-h-[100px] border-gray-200 pt-3 focus:ring-orange-200"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700 font-bold ml-1 text-sm">
              Shop Cover Image
            </Label>

            {imagePreview ? (
              <div className="relative w-full h-48 rounded-[2rem] overflow-hidden border-2 border-orange-100 group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="image"
                className="border-2 border-dashed border-gray-100 rounded-2xl p-8 text-center hover:border-orange-300 hover:bg-orange-50 transition-all cursor-pointer group block"
              >
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <ImagePlus
                  className="mx-auto text-gray-300 group-hover:text-orange-500 mb-2"
                  size={32}
                />
                <span className="text-xs text-gray-500 font-medium">
                  Click to upload shop banner
                </span>
              </label>
            )}
          </div>
        </form>
      </div>

      <div className="p-6 border-t border-gray-50 bg-gray-50/50 sm:rounded-b-[2.5rem]">
        <Button
          form="restaurant-form"
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-6 text-base font-bold shadow-lg shadow-orange-200"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
            </>
          ) : (
            "Create Restaurant"
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateRestaurant;
