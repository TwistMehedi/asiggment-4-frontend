"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const UserEditModal = ({ user }: { user: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/user/profile-update`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            targetUserId: user.id,
            name: data.name,
            email: data.email,
            role: data.role,
            status: data.status,
            isVerified: data.isVerified === "true",
            emailVerified: data.emailVerified === "true",
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Updated successfully");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to update user");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border border-green-100 shadow-sm shadow-green-100 hover:bg-green-600 hover:text-white transition-colors cursor-pointer">
          <Edit size={14} /> Edit
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Edit User: {user.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              defaultValue={user.name}
              className="w-full p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              defaultValue={user.email}
              className="w-full p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Role
              </label>
              <select
                name="role"
                defaultValue={user.role}
                className="w-full p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-200 outline-none"
              >
                <option value="ADMIN">Admin</option>
                <option value="CUSTOMER">Customer</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Status
              </label>
              <select
                name="status"
                defaultValue={user.status}
                className="w-full p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-200 outline-none"
              >
                <option value="ACTIVE">Active</option>
                <option value="SUSPENDED">Suspended</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Is Verified
              </label>
              <select
                name="isVerified"
                defaultValue={String(user.isVerified)}
                className="w-full p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-200 outline-none"
              >
                <option value="true">Verified</option>
                <option value="false">Not Verified</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Email Verified
              </label>
              <select
                name="emailVerified"
                defaultValue={String(user.emailVerified)}
                className="w-full p-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-200 outline-none"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4 border-t pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100 rounded-xl transition-all"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-md transition-all disabled:opacity-50"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
