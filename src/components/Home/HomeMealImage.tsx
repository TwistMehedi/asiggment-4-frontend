"use client";

import Image from "next/image";
import { useState } from "react";

export const HomeMealImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      {src && !imageError ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          No Image
        </div>
      )}
    </>
  );
};