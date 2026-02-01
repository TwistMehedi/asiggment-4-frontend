"use client";

import React, { useEffect, useState } from "react";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import currentUser from "@/actions/user";
import CheckoutModal from "@/components/Meal/CheckoutModal";

interface ICartItem {
  mealId: string;
  providerId: string;
  price: number;
  name: string;
  quantity: number;
  userId: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log(cartItems);
  useEffect(() => {
    const loadCart = async () => {
      setMounted(true);

      const userData = await currentUser();
      const userId = userData?.user?.id;

      if (userId) {
        const data = localStorage.getItem("cart");
        if (data) {
          const allItems: ICartItem[] = JSON.parse(data);

          const userSpecificCart = allItems.filter(
            (item) => item.userId === userId,
          );
          setCartItems(userSpecificCart);
        }
      }
    };

    loadCart();
  }, []);

  const removeItem = (id: string) => {
    const updatedStateCart = cartItems.filter((item) => item.mealId !== id);
    setCartItems(updatedStateCart);
    const allData = JSON.parse(localStorage.getItem("cart") || "[]");
    const currentUserId = cartItems.length > 0 ? cartItems[0].userId : null;

    if (currentUserId) {
      const updatedLocalStorage = allData.filter(
        (item: ICartItem) =>
          !(item.mealId === id && item.userId === currentUserId),
      );
      localStorage.setItem("cart", JSON.stringify(updatedLocalStorage));
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <ShoppingBag className="text-orange-600" /> Your Cart
          </h1>
          <Link
            href="/meals"
            className="text-sm text-orange-600 font-medium flex items-center gap-1"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.mealId}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 p-3 rounded-xl text-2xl">
                      🍱
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.price} ৳ x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-gray-900">
                      {item.price * item.quantity} ৳
                    </span>
                    <button
                      onClick={() => removeItem(item.mealId)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Summary</h3>
              <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span>{totalPrice} ৳</span>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
            <CheckoutModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              cartItems={cartItems}
              totalPrice={totalPrice}
            />
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              Your cart is empty
            </h2>
            <Link
              href="/meals"
              className="inline-block mt-4 bg-gray-900 text-white px-8 py-3 rounded-full"
            >
              Explore Meals
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
