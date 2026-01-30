import Catagory from "@/components/Home/Catagory";
import Hero from "@/components/Home/Hero";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Catagory />

      <section className="px-6 py-16 bg-gray-50">
        <h3 className="text-3xl font-semibold text-center mb-10">
          Popular Meals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3, 4].map((meal) => (
            <div
              key={meal}
              className="border rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              <div className="h-32 bg-gray-200" />
              <div className="p-4">
                <h4 className="font-semibold">Chicken Biriyani</h4>
                <p className="text-sm text-gray-500">৳250</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16">
        <h3 className="text-3xl font-semibold text-center mb-10">
          Why Choose FoodHub
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {["Fast Delivery", "Trusted Providers", "Cash on Delivery"].map(
            (reason) => (
              <div key={reason} className="p-6 border rounded-2xl text-center">
                <h4 className="font-semibold text-lg mb-2">{reason}</h4>
                <p className="text-gray-600 text-sm">
                  Quality service guaranteed for every order.
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      <footer className="mt-auto bg-gray-900 text-gray-300 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
          <p>© 2026 FoodHub. All rights reserved.</p>
          <div className="space-x-4">
            <Link href="#">Facebook</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
