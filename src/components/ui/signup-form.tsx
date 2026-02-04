"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import React, { useState } from "react";
import { toast, Toaster } from "sonner"; // Toaster যোগ করা হয়েছে
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "./input";
import { client } from "@/lib/auth-client";

export const SignupForm = ({ ...props }: React.ComponentProps<typeof Card>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await client.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,

        role: formData.role,
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        setIsLoading(false);
        return;
      }

      if (data) {
        toast.success("Check your mail and will verify");
        setFormData({ name: "", email: "", password: "", role: "" });

        router.push("/check-inbox");
        router.refresh();
      }
    } catch (error: any) {
      toast.error("Network error, unable to register");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Card
      className="w-full max-w-lg mx-auto border-none sm:border shadow-none sm:shadow-sm"
      {...props}
    >
      <Toaster richColors position="top-center" />
      <CardHeader className="text-center sm:text-left">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister}>
          <div className="space-y-5">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                disabled={isLoading}
                value={formData.name}
                onChange={handleChange}
                className="mt-1"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                disabled={isLoading}
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
              />
              <p className="text-[12px] mt-1 leading-tight text-gray-500">
                We'll use this to contact you. We will not share your email with
                anyone else.
              </p>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                disabled={isLoading}
                value={formData.password}
                onChange={handleChange}
                className="mt-1"
              />
              <p className="text-[12px] mt-1 text-gray-500">
                Must be at least 8 characters long.
              </p>
            </Field>

            <Field>
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <select
                id="role"
                required
                disabled={isLoading}
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
              >
                <option value="">Select a role</option>
                <option value="CUSTOMER">Customer</option>
                <option value="PROVIDER">Provider</option>
              </select>
              <p className="text-[12px] mt-1 text-gray-500">
                Choose your role to continue registration.
              </p>
            </Field>

            <div className="flex flex-col gap-3 mt-6">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-orange-600 font-medium hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
