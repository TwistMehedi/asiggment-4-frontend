import Link from "next/link";
import { Loader, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import currentUser from "@/actions/user";
import { Roles } from "@/constants/role";
import LogOut from "./LogOut";
import { User } from "@/types/user.types";

const Navbar = async () => {
  const user = ((await currentUser()) as User) || null;

  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-orange-600">Food</span>Hub
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-medium">
          <Link href={"/"} className="hover:text-orange-600 transition-colors">
            Home
          </Link>
          <Link
            href={"/meals"}
            className="hover:text-orange-600 transition-colors"
          >
            Meals
          </Link>

          {user?.role === Roles.admin && (
            <Link
              href={"/admin"}
              className="hover:text-orange-600 transition-colors"
            >
              Dashboard
            </Link>
          )}

          {user?.role === Roles.customer && (
            <Link
              href={"/customer"}
              className="hover:text-orange-600 transition-colors"
            >
              Dashboard
            </Link>
          )}

          {user?.role === Roles.provider && (
            <Link
              href={"/provider"}
              className="hover:text-orange-600 transition-colors"
            >
              Dashboard
            </Link>
          )}

          {user && <LogOut />}

          {!user && (
            <>
              <Link href={"/login"}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-orange-600"
                >
                  Login
                </Button>
              </Link>
              <Link href={"/signup"}>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-orange-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left text-orange-600">
                  FoodHub Menu
                </SheetTitle>
              </SheetHeader>

              <div className="ml-5 mt-8 flex flex-col gap-6 font-medium">
                <Link
                  href={"/"}
                  className="hover:text-orange-600 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href={"/meals"}
                  className="hover:text-orange-600 transition-colors"
                >
                  Meals
                </Link>
                {user?.role === Roles.admin && (
                  <Link
                    href={"/admin"}
                    className="hover:text-orange-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}

                {user?.role === Roles.customer && (
                  <Link
                    href={"/customer"}
                    className="hover:text-orange-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}

                {user?.role === Roles.provider && (
                  <Link
                    href={"/provider"}
                    className="hover:text-orange-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}

                {user && <LogOut />}
                <hr className="my-2 border-orange-50" />

                <div className="flex flex-col gap-3">
                  {!user && (
                    <>
                      <Link href={"/login"}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:text-orange-600"
                        >
                          Login
                        </Button>
                      </Link>
                      <Link href={"/signup"}>
                        <Button
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
