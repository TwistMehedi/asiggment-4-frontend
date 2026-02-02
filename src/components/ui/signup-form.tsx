"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const SignupForm = ({ ...props }: React.ComponentProps<typeof Card>) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data?.message || "Registration successful!");
        setFormData({ name: "", email: "", password: "", role: "" });
        router.push("/check-inbox");
      } else {
        toast.error(data?.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Network error unable to register");
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <>
      <Card
        className="w-full max-w-lg mx-auto border-none sm:border shadow-none sm:shadow-sm"
        {...props}
      >
        <CardHeader className="text-center sm:text-left">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <FieldGroup className="space-y-5">
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
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
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                />
                <FieldDescription className="text-[12px] mt-1 leading-tight">
                  We'll use this to contact you. We will not share your email
                  with anyone else.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1"
                />
                <FieldDescription className="text-[12px] mt-1">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="role">Role</FieldLabel>
                <select
                  id="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select a role</option>
                  <option value="CUSTOMER">Customer</option>
                  <option value="PROVIDER">Provider</option>
                </select>
                <FieldDescription className="text-[12px] mt-1">
                  Choose your role to continue registration.
                </FieldDescription>
              </Field>

              <div className="flex flex-col gap-3 mt-6">
                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Create Account
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
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
