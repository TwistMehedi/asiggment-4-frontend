"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Utensils,
  ImagePlus,
  Loader2,
  X,
  Tag,
  AlignLeft,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CreateMeal = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

    if (imagePreview) {
      formData.append("image", imagePreview);
    }
    const data = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [
        key,
        value === null ? "" : value,
      ]),
    );

    console.log("Meal Data:", data);

    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-white sm:rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh]">
      <div className="p-6 md:p-8 border-b border-gray-50 flex justify-between items-center sticky top-0 bg-white z-10 sm:rounded-t-[2.5rem]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
            <Utensils size={24} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-none">
              Add New Menu
            </h2>
            <p className="text-xs text-gray-500 mt-1.5">
              Enter your meal details
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
        <form id="meal-form" onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="font-bold text-sm ml-1 text-gray-700"
            >
              Meal Name
            </Label>
            <div className="relative">
              <Type
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                id="name"
                name="name"
                placeholder="e.g. Special Grilled Chicken"
                className="pl-12 rounded-xl py-6 border-gray-200 focus:ring-orange-200"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="price"
                className="font-bold text-sm ml-1 text-gray-700"
              >
                Price
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                  ৳
                </span>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="0.00"
                  className="pl-10 rounded-xl py-6 border-gray-200 focus:ring-orange-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="categoryName"
                className="font-bold text-sm ml-1 text-gray-700"
              >
                Category Name
              </Label>
              <div className="relative">
                <Tag
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="categoryName"
                  name="categoryName"
                  placeholder="e.g. Lunch"
                  className="pl-12 rounded-xl py-6 border-gray-200 focus:ring-orange-200"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="font-bold text-sm ml-1 text-gray-700"
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
                placeholder="Describe the taste, ingredients, or serving size..."
                className="pl-12 rounded-xl min-h-[120px] border-gray-200 pt-3 focus:ring-orange-200"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-sm ml-1 text-gray-700">
              Meal Image
            </Label>

            {imagePreview ? (
              <div className="relative w-full h-52 rounded-2xl overflow-hidden border-2 border-orange-100 group">
                <img
                  src={imagePreview}
                  alt="Meal Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors"
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
                <span className="text-xs text-gray-500 font-medium group-hover:text-orange-600">
                  Click to upload high-quality meal photo
                </span>
              </label>
            )}
          </div>
        </form>
      </div>

      <div className="p-6 border-t border-gray-50 bg-gray-50/50 sm:rounded-b-[2.5rem]">
        <Button
          form="meal-form"
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-7 rounded-xl font-bold text-lg shadow-lg shadow-orange-100 transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Adding to Menu...
            </>
          ) : (
            "Add Menu"
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateMeal;
