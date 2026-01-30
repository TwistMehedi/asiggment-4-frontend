import React from "react";
import { MailOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CheckInboxPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
        <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <MailOpen className="h-10 w-10 animate-bounce" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
          Check your inbox
        </h1>

        <p className="text-gray-600 leading-relaxed mb-8">
          We sent you a verification email. Please check your inbox and follow
          the instructions to complete registration.
        </p>

        <div className="space-y-4">
          <Link href="https://mail.google.com" target="_blank">
            <Button className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg rounded-xl">
              Open Mail
            </Button>
          </Link>

          <Link
            href="/login"
            className="block text-sm text-gray-500 hover:text-orange-600 font-medium transition-colors"
          >
            Back to Login
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          Didn&apos;t receive the email? Check your spam folder or try again.
        </p>
      </div>
    </div>
  );
};

export default CheckInboxPage;
