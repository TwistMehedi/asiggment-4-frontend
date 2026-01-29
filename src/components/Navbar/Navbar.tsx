import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          FoodHub
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>About</Link>
          <Link href={"/"}>Contact</Link>
          <Button size="sm">Login</Button>
          <Link href={"/signup"}>
            <Button size="sm">Sing Up</Button>
          </Link>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              {/* Accessibility requirement */}
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold">Menu</span>
              </div>

              <nav className="flex flex-col gap-4">
                <Link href={"/"}>Home</Link>
                <Link href={"/"}>About</Link>
                <Link href={"/contact"}>Contact</Link>
                <Button size="sm">Login</Button>
                <Link href={"/signup"}>
                  <Button size="sm">Register</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
