"use client";

import React, { useState } from "react";
import { X, Loader2, Star } from "lucide-react";
import { toast, Toaster } from "sonner";
import { createOrder } from "@/service/Order/order.service";
import ShowReviewModal from "../Review/ShowReviewModal";

const CheckoutModal = ({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
}: {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  totalPrice: number;
}) => {
  const [isPending, setIsPending] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [address, setAddress] = useState({
    roadNumber: "",
    postCode: "",
    phone: "",
    house: "",
    areaName: "",
  });

  if (!isOpen && !showReviewModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    const toastId = toast.loading("Processing your order...");

    try {
      const orderData = {
        providerId: cartItems[0]?.providerId,
        deliveryAddress: {
          ...address,
        },
        items: cartItems.map((item) => ({
          mealId: item.mealId,
          quantity: item.quantity,
          price: item.price,
          customerId: item.userId,
        })),
      };

      const result = await createOrder(orderData);

      if (result && result.success === true) {
        toast.success(result.message || "Order placed successfully!", {
          id: toastId,
          duration: 3000,
        });

        localStorage.removeItem("cart");

        setTimeout(() => {
          setShowReviewModal(true);
        }, 1500);
      } else {
        toast.error(result?.message || "Failed to place order", {
          id: toastId,
        });
        setIsPending(false);
      }
    } catch (error: any) {
      console.error("Order submission error:", error);
      toast.error("An unexpected error occurred", {
        id: toastId,
      });
      setIsPending(false);
    }
  };

  if (showReviewModal) {
    return (
      <ShowReviewModal
        mealId={cartItems[0]?.mealId}
        // userId={cartItems[0]?.userId}
        onClose={() => {
          setShowReviewModal(false);
          onClose();
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <Toaster position="top-center" richColors />
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!isPending ? onClose : undefined}
      ></div>

      <div className="relative bg-white w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-gray-800">
              Delivery Details
            </h2>
            <button
              onClick={onClose}
              disabled={isPending}
              className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                  Area Name
                </label>
                <input
                  required
                  disabled={isPending}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 disabled:bg-gray-50"
                  value={address.areaName}
                  onChange={(e) =>
                    setAddress({ ...address, areaName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                  Road Number
                </label>
                <input
                  required
                  disabled={isPending}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 disabled:bg-gray-50"
                  value={address.roadNumber}
                  onChange={(e) =>
                    setAddress({ ...address, roadNumber: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                  House No
                </label>
                <input
                  required
                  disabled={isPending}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 disabled:bg-gray-50"
                  value={address.house}
                  onChange={(e) =>
                    setAddress({ ...address, house: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                  Post Code
                </label>
                <input
                  required
                  disabled={isPending}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 disabled:bg-gray-50"
                  value={address.postCode}
                  onChange={(e) =>
                    setAddress({ ...address, postCode: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                Phone Number
              </label>
              <input
                required
                disabled={isPending}
                type="tel"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 disabled:bg-gray-50"
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center mt-6">
              <span className="text-gray-500 font-medium">Total Payable:</span>
              <span className="text-xl font-black text-orange-600">
                {totalPrice} ৳
              </span>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Placing Order...
                </>
              ) : (
                "Confirm & Place Order"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
