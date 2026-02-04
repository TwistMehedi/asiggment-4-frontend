"use client";

import { useState } from "react";
import { User } from "@/types/user.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, User as UserIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditProfileModalProps {
  user: User;
}

export const EditProfileModal = ({ user }: EditProfileModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user.name || "");

  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name === user.name) {
      setOpen(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/user/profile-update`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
          credentials: "include",
        },
      );

      const data = await response.json();

      console.log(data);

      if (response.ok && data.success) {
        toast.success(data?.message || "Update successful");
        setOpen(false);

        router.refresh();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-4 md:p-6 bg-white border border-gray-100 rounded-[2rem] font-bold text-gray-700 hover:border-orange-200 hover:bg-orange-50/30 transition-all flex flex-col items-center justify-center gap-2 group">
          <Settings className="text-gray-400 group-hover:rotate-45 transition-transform" />
          <span className="text-xs">Edit Profile</span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] p-8 border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-gray-800">
            Edit Profile
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Update your account information below.
          </p>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-xs font-bold uppercase text-gray-400 ml-1"
              >
                Full Name
              </Label>
              <div className="relative">
                <UserIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-gray-100 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-gray-400 ml-1">
                Email (Non-editable)
              </Label>
              <Input
                disabled
                value={user.email}
                className="h-12 rounded-xl bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-200"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
