import React, { useState } from 'react';

// NavBar Component
export function NavBar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Munim Accounting" className="h-8" />
        <span className="font-bold text-xl text-blue-600">munim</span>
        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-sm rounded-full">Accounting</span>
      </div>
      <ul className="flex items-center space-x-6">
        <li className="cursor-pointer hover:text-blue-600">Home</li>
        <li className="cursor-pointer hover:text-blue-600">Features</li>
        <li className="cursor-pointer hover:text-blue-600">Pricing</li>
        <li className="cursor-pointer hover:text-blue-600">Need help? <span className="ml-1">🔽</span></li>
      </ul>
      <div className="flex items-center space-x-4">
        <button className="relative">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405-1.405M16.995 11A5.002 5.002 0 0012 6a5.002..." />
          </svg>
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-500"></span>
        </button>
        <button className="relative">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5.121 17.804A13.937 13.937 0 0112 15c2.485..." />
          </svg>
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-500"></span>
        </button>
        <button className="flex items-center p-1 rounded-full hover:bg-gray-100">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.354a4 4 0 014 0M12 4.354v14.292..." />
          </svg>
        </button>
      </div>
    </nav>
  );
}