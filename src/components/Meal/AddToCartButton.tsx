"use client";

import currentUser from "@/actions/user";
import { ICartItem, IMeal } from "@/types/meal.type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const AddToCartButton = ({ meal }: { meal: IMeal }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await currentUser();
      if (user) {
        setUser(user);
      }
    };
    fetchUser();
  }, []);

  // console.log(user);

  const handleAddToCart = () => {
    try {
      setLoading(true);
      if (!user) {
        toast.error("Please login first to add items!");
        return;
      }

      const cartData = localStorage.getItem("cart");
      let cart: ICartItem[] = cartData ? JSON.parse(cartData) : [];

      const existingItemIndex = cart.findIndex(
        (item) => item.mealId === meal.id && item.userId === user.id,
      );

      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({
          mealId: meal.id,
          providerId: meal.providerId,
          price: meal.price,
          name: meal.name,
          quantity: 1,
          userId: user?.id,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success(`${meal.name} added to cart!`);
    } catch (error) {
      console.log(error);
      toast.error(`Add to cart problme${error}`);
      setLoading(false);
    }
  };

  return (
    <div className="flex-[4] flex items-center justify-center bg-orange-500 cursor-pointer text-white py-4 md:py-5 rounded-2xl font-bold transition-all shadow-lg active:scale-95 text-sm md:text-base">
      <Toaster richColors position="top-center" />

      {user ? (
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="hover:cursor-pointer disabled:bg-gray-400"
        >
          {loading ? "Adding to cart..." : "Add to Cart"}
        </button>
      ) : (
        <Link href="/login">
          <button className="cursor-pointer">Add to Cart</button>
        </Link>
      )}
    </div>
  );
};

export default AddToCartButton;
