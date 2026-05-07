"use client";

import Image from "next/image";
import { useState } from "react";

export const MealImage = ({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      {src && !imageError ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${className}`}
          priority={priority}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <span className="text-6xl mb-2">🍱</span>
          <p>No Image Available</p>
        </div>
      )}
    </>
  );
};

export const GalleryImage = ({ src, alt, index }: { src: string; alt: string; index: number }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      {src && !imageError ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <span className="text-2xl">🍽️</span>
        </div>
      )}
    </>
  );
};