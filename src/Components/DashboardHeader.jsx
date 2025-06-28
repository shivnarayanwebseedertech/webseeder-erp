// File: src/components/DashboardHeader.jsx
import React, { useState, useRef, useEffect } from 'react';
import { IoFilterSharp } from "react-icons/io5";

export default function DashboardHeader({ onFilterChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const options = ['Today', 'Last 7 days', 'Last 30 days', 'Current month', 'Custom date'];
  const [selected, setSelected] = useState('Current month');

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleFilterChange = (opt) => {
    setSelected(opt);
    setOpen(false);
    if (onFilterChange) {
      onFilterChange(opt);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white px-4 py-2 border-b border-gray-200 mb-1">
      <h1 className="text-base font-medium text-gray-800">Dashboard</h1>
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 text-xs text-gray-700"
        >
          <IoFilterSharp className="mr-2 text-md" />
          <span>{selected}</span>
        </button>
        {open && (
          <ul className="absolute z-10 right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg text-sm">
            {options.map(opt => (
              <li
                key={opt}
                className="px-3 py-2  hover:bg-gray-100 cursor-pointer"
                onClick={() => handleFilterChange(opt)}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}