"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const DeleteMeal = ({
  mealId,
  onSuccess,
}: {
  mealId: string;
  onSuccess: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/meals/${mealId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Meal deleted successfully");
        onSuccess();
      } else {
        toast.error("Failed to delete meal");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={loading}
      onClick={handleDelete}
      className="rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Trash2 size={18} />
      )}
    </Button>
  );
};

export default DeleteMeal;
