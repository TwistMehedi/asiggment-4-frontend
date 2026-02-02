"use client";
import { cn } from "@/lib/utils";
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
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { envConfig } from "@/config/envConfig";

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data?.message || "Login successful");
        router.push("/");
      } else {
        toast.error(data?.message || "Login failed");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Network error unable to login");
      console.error(error);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full max-w-md mx-auto px-4 sm:px-0",
        className,
      )}
      {...props}
    >
      <Toaster position="top-right" richColors />
      <Card className="border-none sm:border shadow-none sm:shadow-sm">
        <CardHeader className="space-y-1 text-center sm:text-left">
          <CardTitle className="text-2xl font-bold">
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  className="w-full"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="#"
                    className="text-sm text-orange-600 hover:underline underline-offset-4"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full"
                  required
                />
              </Field>
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  {isLoading ? "Please wait" : "Login"}
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  Login with Google
                </Button>
              </div>
              <FieldDescription className="text-center pt-2">
                Don&apos;t have an account?{" "}
                <Link
                  href={"/signup"}
                  className="text-orange-600 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
