"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { LogOut as LogOutIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Logged out!");

        router.push("/login");
        router.refresh();
      } else {
        throw new Error(result.message || "Logout failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      variant="ghost"
      className="group flex items-center gap-2 text-gray-500 hover:text-red-600 hover:bg-red-50 font-black rounded-2xl transition-all duration-300 px-4 py-2"
    >
      {loading ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <LogOutIcon
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
      )}
      <span className="uppercase tracking-tighter text-[11px]">Sign Out</span>
    </Button>
  );
};

export default LogOut;
