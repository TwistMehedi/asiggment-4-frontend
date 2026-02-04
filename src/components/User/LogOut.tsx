"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { LogOut as LogOutIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { client } from "@/lib/auth-client";

const LogOut = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await client.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            router.push("/login");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Logout failed");
            setLoading(false);
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={handleLogout}
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
      <span className="uppercase tracking-tighter text-[11px]">
        {loading ? "Signing Out..." : "Sign Out"}
      </span>
    </Button>
  );
};

export default LogOut;
