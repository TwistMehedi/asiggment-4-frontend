"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const DeleteCategoryBtn = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      // /category/delete/:id
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/meals/category/delete/${id}`,
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
