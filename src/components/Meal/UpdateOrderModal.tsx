"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // অথবা react-hot-toast ব্যবহার করতে পারেন

export const UpdateOrderModal = ({ order }: { order: any }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(order.status);
  const router = useRouter();

  const orderId = order?.id;

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/order/admin/order/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status, orderId }),
        },
      );

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Order status updated successfully!");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-xl hover:bg-white hover:text-orange-600 shadow-sm border border-transparent hover:border-gray-100"
        >
          <Edit size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tighter">
            Update Order Status
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdateStatus} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase text-gray-400">
              Order ID
            </Label>
            <Input
              value={order.id}
              disabled
              className="bg-gray-50 border-none font-mono text-xs"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-black uppercase text-gray-400">
              Payment Method
            </Label>
            <Input
              value={order.payment}
              disabled
              className="bg-gray-50 border-none font-bold"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-black uppercase text-gray-400">
              Update Status
            </Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-gray-100 font-bold text-sm focus:outline-orange-500 bg-white"
            >
              <option value="PLACED">PLACED</option>
              <option value="PROCESSING">PROCESSING</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest rounded-xl py-6 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Order"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
