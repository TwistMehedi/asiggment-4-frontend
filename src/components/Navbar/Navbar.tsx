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
import ThemeToggle from "@/components/ThemeToggle";

import { User } from "@/types/user.types";
import LogOut from "../User/LogOut";

const Navbar = async () => {
  const user = ((await currentUser()) as User) || null;

  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-orange-600">Food</span>Hub
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-center">
          <div className="flex items-center gap-8 font-medium text-sm md:text-base">
            <Link href="/" className="hover:text-orange-600 transition-colors">
              Home
            </Link>
            <Link href="/meals" className="hover:text-orange-600 transition-colors">
              Meals
            </Link>
            <Link href="/about" className="hover:text-orange-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-orange-600 transition-colors">
              Contact
            </Link>
            <Link href="/help" className="hover:text-orange-600 transition-colors">
              Help
            </Link>
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          {user?.role === Roles.admin && (
            <Link href="/admin" className="hover:text-orange-600 transition-colors">
              Dashboard
            </Link>
          )}

          {user?.role === Roles.customer && (
            <Link href="/customer" className="hover:text-orange-600 transition-colors">
              Dashboard
            </Link>
          )}

          {user?.role === Roles.provider && (
            <Link href="/provider" className="hover:text-orange-600 transition-colors">
              Dashboard
            </Link>
          )}

          {!user && (
            <>
              <Link href="/login" className="text-sm hover:text-orange-600 transition-colors">
                Login
              </Link>
              <Link href="/signup" className="text-sm hover:text-orange-600 transition-colors">
                Sign Up
              </Link>
            </>
          )}

          {user && <LogOut />}
          <ThemeToggle />
        </div>

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

              <div className="ml-5 mt-8 flex flex-col gap-5 font-medium">
                <Link href="/" className="hover:text-orange-600 transition-colors text-sm">
                  Home
                </Link>
                <Link href="/meals" className="hover:text-orange-600 transition-colors text-sm">
                  Meals
                </Link>
                <Link href="/about" className="hover:text-orange-600 transition-colors text-sm">
                  About
                </Link>
                <Link href="/contact" className="hover:text-orange-600 transition-colors text-sm">
                  Contact
                </Link>
                <Link href="/help" className="hover:text-orange-600 transition-colors text-sm">
                  Help
                </Link>

                {user?.role === Roles.admin && (
                  <Link href="/admin" className="hover:text-orange-600 transition-colors text-sm">
                    Dashboard
                  </Link>
                )}
                {user?.role === Roles.customer && (
                  <Link href="/customer" className="hover:text-orange-600 transition-colors text-sm">
                    Dashboard
                  </Link>
                )}
                {user?.role === Roles.provider && (
                  <Link href="/provider" className="hover:text-orange-600 transition-colors text-sm">
                    Dashboard
                  </Link>
                )}

                {!user && (
                  <>
                    <Link href="/login" className="text-sm hover:text-orange-600 transition-colors">
                      Login
                    </Link>
                    <Link href="/signup" className="text-sm hover:text-orange-600 transition-colors">
                      Sign Up
                    </Link>
                  </>
                )}

                {user && <LogOut />}

                <div className="flex justify-end pt-2">
                  <ThemeToggle />
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
