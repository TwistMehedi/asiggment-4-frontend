"use client";

import { Star, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface ShowReviewModalProps {
  onClose?: () => void;
  // userId: string;
  mealId: string;
}

const ShowReviewModal = ({ onClose, mealId }: ShowReviewModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleReviewSubmit = async () => {
    setIsLoading(true);
    if (rating === 0) return;

    const reviewData = {
      rating: rating,
      comment: comment,
      // userId: userId,
      mealId: mealId,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/review`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        },
      );

      // console.log(res);

      if (!res.ok) return null;

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);

        if (onClose) onClose();
      } else {
        toast.error(data.message || "Failed to submit review");
        setIsLoading(false);
      }

      // console.log(data);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to submit review", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 text-center shadow-2xl animate-in zoom-in duration-300">
        <h2 className="text-3xl font-black text-gray-800 mb-2">
          How was the Food?
        </h2>
        <p className="text-gray-500 mb-6">Your feedback helps us improve!</p>

        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                size={35}
                className={`transition-all ${
                  star <= (hover || rating)
                    ? "text-yellow-400 fill-yellow-400 scale-110"
                    : "text-gray-200"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="relative mb-6">
          <textarea
            rows={3}
            placeholder="Write a comment (optional)..."
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 transition-all text-sm resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <MessageSquare
            size={16}
            className="absolute right-4 bottom-4 text-gray-300"
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleReviewSubmit}
            disabled={rating === 0}
            className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all disabled:bg-gray-100 disabled:text-gray-400"
          >
            {isLoading ? "Creating" : "Submit Review"}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-gray-400 font-bold hover:text-gray-600"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowReviewModal;
