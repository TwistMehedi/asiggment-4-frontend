"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface EditRestaurantProps {
  restaurant: {
    id: string;
    shopName: string;
    isOpen: boolean;
  };
  onSuccess?: () => void;
}

export function EditRestaurantBtn({
  restaurant,
  onSuccess,
}: EditRestaurantProps) {
  const [open, setOpen] = useState(false);
  const [shopName, setShopName] = useState(restaurant.shopName);
  const [isOpen, setIsOpen] = useState(restaurant.isOpen);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const id = restaurant?.id;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/meals/edit/resturant`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ shopName, isOpen, id }),
        },
      );

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setOpen(false);
        router.refresh();
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Update failed!");
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
          className="h-9 w-9 rounded-xl hover:text-orange-600 hover:bg-orange-50 transition-all"
        >
          <Edit size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tighter">
            Edit Restaurant
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdate} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Shop Name
            </Label>
            <Input
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="rounded-xl border-gray-100"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase">Shop Status</span>
              <span className="text-[10px] text-gray-500">
                {isOpen ? "Open Now" : "Currently Closed"}
              </span>
            </div>
            <Switch checked={isOpen} onCheckedChange={setIsOpen} />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-orange-600 hover:bg-orange-700 rounded-xl px-8 font-bold w-full"
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
