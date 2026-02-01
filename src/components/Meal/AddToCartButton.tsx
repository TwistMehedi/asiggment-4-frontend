"use client";

import currentUser from "@/actions/user";
import { IMeal } from "@/types/meal.type";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ICartItem {
  mealId: string;
  providerId: string;
  price: number;
  name: string;
  quantity: number;
  userId: string;
}

const AddToCartButton = ({ meal }: { meal: IMeal }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await currentUser();
      if (userData?.user) {
        setUser(userData.user);
      }
    };
    fetchUser();
  }, []);

  // console.log("user:", user);

  const handleAddToCart = () => {
    // console.log("clicked", meal);

    if (!user) {
      toast.error("Please login first to add items!");
      return;
    }

    const cartData = localStorage.getItem("cart");
    let cart: ICartItem[] = cartData ? JSON.parse(cartData) : [];
    console.log("cart", cart);

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
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex-[4] bg-gray-900 text-white py-4 md:py-5 rounded-2xl font-bold hover:bg-black transition-all shadow-lg active:scale-95 text-sm md:text-base"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
