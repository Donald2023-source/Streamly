"use client";

import type React from "react";

const CardSkeleton: React.FC = () => {
  return (
    <div className="p-3 m-2 relative">
      <div className="mb-3 py-3">
        <div className="h-8 bg-gray-700 rounded-md w-48 animate-pulse" />
      </div>

      <div className="grid grid-cols-6   h-full min-w-screen-lg overflow-x-scroll scrollbar-hide space-x-8">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="min-w-[230px] h-[270px] relative rounded-xl overflow-hidden bg-gray-800 flex-shrink-0"
          >
            <div className="w-full h-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse" />

            <div className="absolute inset-0 flex flex-col justify-end p-3">
              <div className="space-y-2 mb-2">
                <div className="h-4 bg-gray-500 rounded-md w-full animate-pulse" />
                <div className="h-4 bg-gray-500 rounded-md w-3/4 animate-pulse" />
              </div>

              <div className="h-4 bg-gray-500 rounded-md w-20 animate-pulse" />
            </div>
            <div className="absolute bg-gradient-to-t from-black/60 to-black/10 w-full h-full top-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSkeleton;
