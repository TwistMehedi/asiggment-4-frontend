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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { toast, Toaster } from "sonner";
import { FolderPlus, Loader2 } from "lucide-react";
import { envConfig } from "@/config/envConfig";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/create-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
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
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 bg-gray-50/50">
      <Toaster position="top-right" richColors />

      <Card className="w-full max-w-md border-none sm:border shadow-none sm:shadow-lg rounded-[2rem]">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-orange-100 text-orange-600 p-3 rounded-2xl w-fit mb-2">
            <FolderPlus size={28} />
          </div>
          <CardTitle className="text-2xl md:text-3xl font-black text-gray-800">
            Create Category
          </CardTitle>
          <CardDescription>
            Add a new category to organize your meals efficiently.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup className="space-y-6">
              <Field>
                <FieldLabel
                  htmlFor="name"
                  className="text-sm font-bold text-gray-700"
                >
                  Category Name
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g. Sea Food, Dessert"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 h-12 rounded-xl border-gray-200 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
              </Field>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-md shadow-orange-500/20"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Category"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCategory;
