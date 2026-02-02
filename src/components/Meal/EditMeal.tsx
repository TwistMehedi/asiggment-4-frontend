"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ImagePlus } from "lucide-react";

const EditMeal = ({ meal, onClose, onUpdateSuccess }: any) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    meal.image || null,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const isAvailable = formData.get("isAvailable") === "on";
    formData.set("isAvailable", String(isAvailable));

    if (imageFile) {
      formData.set("image", imageFile);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/meals/${meal.id}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        },
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Meal updated successfully");
        onUpdateSuccess();
        onClose();
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Network error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      id="edit-meal-form"
      onSubmit={handleUpdate}
      className="p-6 space-y-4 bg-white rounded-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
    >
      <div className="border-b pb-3">
        <h2 className="text-xl font-bold text-gray-800">Edit Meal</h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Meal Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={meal.name}
          placeholder="Enter meal name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={meal.description}
          placeholder="Describe your meal..."
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (৳)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            defaultValue={meal.price}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="isAvailable">Availability</Label>
          <div className="flex items-center gap-3 h-10">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              defaultChecked={meal.isAvailable}
              className="w-5 h-5 accent-orange-600 cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-600">In Stock</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image-upload">Meal Image</Label>
        <div className="relative h-44 w-full border-2 border-dashed border-gray-200 rounded-2xl overflow-hidden group hover:border-orange-300 transition-colors">
          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                className="w-full h-full object-cover"
                alt="Meal"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <p className="text-white text-sm font-medium">Change Photo</p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ImagePlus size={32} />
              <span className="text-xs mt-2">Click to upload photo</span>
            </div>
          )}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg font-bold shadow-md transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Updating...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
};

export default EditMeal;
