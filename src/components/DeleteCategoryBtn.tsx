"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const DeleteCategoryBtn = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/meals/delete/category/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (res.ok) {
        toast.success("Deleted");
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <Button
      onClick={handleDelete}
      variant="ghost"
      size="icon"
      className="hover:text-red-600 hover:bg-red-50"
    >
      <Trash2 size={18} />
    </Button>
  );
};
