"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Utensils,
  ImagePlus,
  Loader2,
  X,
  Tag,
  AlignLeft,
  Type,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getCategoriesInProvider } from "@/service/Resturant/resturant.service";
import { MealFormData, mealSchema } from "@/constants/zode/createMeal.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateMeal = ({ onClose }: { onClose: () => void }) => {
  const [isCatLoading, setIsCatLoading] = useState(true);
  const [categories, setCat] = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
  });

  useEffect(() => {
    getCategoriesInProvider()
      .then((data) => setCat(data?.data || data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load categories");
      })
      .finally(() => setIsCatLoading(false));
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: MealFormData) => {
    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }

    console.log("Eeeeeee");

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) =>
      formData.append(key, String(value)),
    );
    formData.append("image", imageFile);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/meals/create`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Meal created successfully!");
        onClose();
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch {
      toast.error("Network error");
    }
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

      <div className="p-6 md:p-8 overflow-y-auto flex-1">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                {...register("name")}
                placeholder="e.g. Special"
                className="pl-12 rounded-xl py-6 border-gray-200 focus:ring-orange-200"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.name.message}
                </p>
              )}
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
                  {...register("price", { valueAsNumber: true })}
                  id="price"
                  type="number"
                  placeholder="0.00"
                  className="pl-10 rounded-xl py-6 border-gray-200 focus:ring-orange-200"
                />
                {errors.price && (
                  <p className="text-xs text-red-500 mt-1 ml-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="categoryName"
                className="font-bold text-sm ml-1 text-gray-700"
              >
                Category
              </Label>
              <div className="relative">
                <Tag
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
                <select
                  {...register("categoryName")}
                  id="categoryName"
                  defaultValue=""
                  className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-200 focus:border-orange-600 transition-all bg-white appearance-none text-gray-700"
                >
                  <option value="" disabled>
                    {isCatLoading ? "Loading..." : "Select Category"}
                  </option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat.name || cat}>
                      {cat.name || cat}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
                {errors.categoryName && (
                  <p className="text-xs text-red-500 mt-1 ml-1">
                    {errors.categoryName.message}
                  </p>
                )}
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
                {...register("description")}
                id="description"
                placeholder="Describe the taste, ingredients, or serving size..."
                className="pl-12 rounded-xl min-h-[120px] border-gray-200 pt-3 focus:ring-orange-200"
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-sm ml-1 text-gray-700">
              Meal Image
            </Label>
            {imagePreview ? (
              <div className="relative w-full h-52 rounded-2xl overflow-hidden border-2 border-orange-100">
                <img
                  src={imagePreview}
                  alt="Meal Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setImageFile(null);
                  }}
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

          <div className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700 text-white py-7 rounded-xl font-bold text-lg shadow-lg shadow-orange-100 transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Adding to Menu...
                </>
              ) : (
                "Add Menu"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeal;
