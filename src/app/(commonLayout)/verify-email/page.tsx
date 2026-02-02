"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { Loader2, CheckCircle2, XCircle } from "lucide-react"; // আইকন যোগ করা হয়েছে
import { envConfig } from "@/config/envConfig";

const VerifyEmailContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [message, setMessage] = useState<string>("Please wait, verifying...");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token not found in the URL");
      return;
    }
    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/auth/verify-email?token=${token}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        );

        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully");
          toast.success(data.message || "Email verified successfully");

          setTimeout(() => {
            router.push("/");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed");
          toast.error(data.message || "Verification failed");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Network error unable to verify your email");
        console.error(error);
        toast.error("Network error unable to verify your email");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Email Verification
        </h1>

        <div className="flex flex-col items-center gap-4">
          {status === "loading" && (
            <div className="space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto" />
              <p className="text-gray-600 font-medium">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
              <p className="text-green-600 font-semibold text-lg">{message}</p>
              <p className="text-sm text-gray-500 animate-pulse">
                Redirecting to login page...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <XCircle className="h-12 w-12 text-red-500 mx-auto" />
              <p className="text-red-500 font-semibold text-lg">{message}</p>
              <button
                onClick={() => router.push("/signup")}
                className="mt-4 text-sm text-orange-600 font-medium hover:underline"
              >
                Back to Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const VerifyEmailPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </>
  );
};

export default VerifyEmailPage;
