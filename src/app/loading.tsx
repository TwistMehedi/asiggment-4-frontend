import React from "react";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 border-8 border-gray-100 rounded-full"></div>
        <div className="absolute w-20 h-20 border-8 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute text-[10px] font-black text-orange-600 uppercase tracking-widest">
          Loading
        </div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-xl font-black text-gray-800 tracking-tighter">
          Please Wait...
        </h2>
        <p className="text-gray-400 text-sm font-medium animate-pulse mt-1">
          Preparing your delicious experience
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default GlobalLoading;
