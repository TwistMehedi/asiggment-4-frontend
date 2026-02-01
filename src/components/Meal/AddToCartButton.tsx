"use client";

import currentUser from "@/actions/user";
import { IMeal } from "@/types/meal.type";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

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
  const [loading, setLoading] = useState(false);

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
    try {
      setLoading(true);
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
    } catch (error) {
      console.log(error);
      toast.error(`Add to cart problme${error}`);
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <button
        onClick={handleAddToCart}
        className="flex-[4] bg-orange-500 cursor-pointer text-white py-4 md:py-5 rounded-2xl font-bold transition-all shadow-lg active:scale-95 text-sm md:text-base"
      >
        {loading ? "Adding to cart" : "Add to Cart"}
      </button>
    </>
  );
};

export default AddToCartButton;
