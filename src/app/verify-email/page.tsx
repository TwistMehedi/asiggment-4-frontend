"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [message, setMessage] = useState<string>("Please wait, verifying...");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  if (!token) {
    return <p className="text-red-500">Token not found in the URL</p>;
  }

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/auth/verify-email?token=${token}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully");
          toast.success(data.message || "Email verified successfully");

          router.push("/");
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
    <>
      <Toaster position="top-right" richColors />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-md shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
          {status === "loading" && (
            <p className="text-gray-700 flex items-center justify-center gap-2">
              <span className="animate-spin">⌛</span> {message}
            </p>
          )}
          {status === "success" && (
            <p className="text-green-600 font-semibold">{message}</p>
          )}
          {status === "error" && (
            <p className="text-red-500 font-semibold">{message}</p>
          )}
          {status === "success" && (
            <p className="mt-2 text-sm text-gray-500">
              Redirecting to home page...
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmailPage;
