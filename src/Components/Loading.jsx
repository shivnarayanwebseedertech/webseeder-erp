import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative flex items-center justify-center">
        {/* The W logo */}
        <img
          src="/logo.png"
          alt="Loading logo"
          width={80}
          height={80}
          className="z-10"
        />

        {/* The spinning loader arc */}
        <div className="absolute w-24 h-24 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin" />
      </div>
    </div>
  );
}
