"use client";

import { useState } from "react";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditCategoryProps {
  category: {
    id: string;
    name: string;
  };
}

export function EditCategoryBtn({ category }: EditCategoryProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category.name);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const id = category?.id as string;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/meals/edit/category`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, id }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      setOpen(false);
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all"
        >
          <Edit2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tighter">
            Edit Category
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-[10px] font-black uppercase tracking-widest text-gray-400"
            >
              Category Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border-gray-100 focus:ring-orange-500"
              placeholder="e.g. Italian"
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-orange-600 hover:bg-orange-700 rounded-xl px-8 font-bold w-full sm:w-auto"
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
