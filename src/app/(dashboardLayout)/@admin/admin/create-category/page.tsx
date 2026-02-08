"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast, Toaster } from "sonner";
import { FolderPlus, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Category name is required");

    setIsLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/user/admin/create-category`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim() }),
          credentials: "include",
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data?.message || "Category created successfully!");
        setName("");
      } else {
        toast.error(data?.message || "Failed to create category");
      }
    } catch (error) {
      toast.error("Network error, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50/50">
      <Card className="w-full max-w-md border-none sm:border shadow-sm sm:shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
        <div className="p-6 pb-0">
          <Link
            href="/admin/categories"
            className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-orange-600 transition-colors uppercase tracking-tighter"
          >
            <ArrowLeft size={14} /> Back to list
          </Link>
        </div>

        <CardHeader className="text-center space-y-2 pt-4">
          <div className="mx-auto bg-orange-100 text-orange-600 p-4 rounded-[1.5rem] w-fit mb-2 shadow-inner">
            <FolderPlus size={32} />
          </div>
          <CardTitle className="text-2xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase">
            Create <span className="text-orange-600">Category</span>
          </CardTitle>
          <CardDescription className="font-medium text-gray-500 max-w-[250px] mx-auto leading-tight">
            Organize your meals with a clear and distinct category name.
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-[10px] uppercase tracking-widest font-black text-gray-400 ml-1"
              >
                Category Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="e.g. Sea Food, Dessert"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 px-5 font-bold text-gray-800 placeholder:text-gray-300 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-orange-500/30 active:scale-95 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Save Category"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCategory;
