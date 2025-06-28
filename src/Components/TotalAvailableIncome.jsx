import React, { useState, useEffect } from "react";
import { FiChevronDown, FiDollarSign } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { RiStockFill } from "react-icons/ri";

// Mock data simulation - Backend would provide this
const mockData = {
  "Today": {
    totalIncome: "₹12,548.00",
    totalStock: "₹8,245.00"
  },
  "Last 7 days": {
    totalIncome: "₹45,892.00",
    totalStock: "₹32,156.00"
  },
  "Last 30 days": {
    totalIncome: "₹1,82,450.00",
    totalStock: "₹1,24,780.00"
  },
  "Current month": {
    totalIncome: "₹2,15,620.00",
    totalStock: "₹1,58,340.00"
  },
  "Custom date": {
    totalIncome: "₹0.00",
    totalStock: "₹0.00"
  }
};

// Simulate API call delay
const fetchData = (range) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData[range] || {
        totalIncome: "₹0.00",
        totalStock: "₹0.00"
      });
    }, 1500);
  });
};

const TotalAvailableIncome = ({ 
  initialRange = "Today",
  onRangeChange,
  isLoading: externalLoading = false,
  data = null
}) => {
  const [selected, setSelected] = useState(initialRange);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [displayData, setDisplayData] = useState({
    totalIncome: "₹0.00",
    totalStock: "₹0.00"
  });

  // Handle data loading internally if no external data provided
  useEffect(() => {
    if (data) {
      setDisplayData(data);
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      const result = await fetchData(selected);
      setDisplayData(result);
      setIsLoading(false);
    };

    loadData();
  }, [selected, data]);

  const handleRangeChange = (range) => {
    setSelected(range);
    setOpen(false);
    
    if (onRangeChange) {
      onRangeChange(range);
    }
  };

  return (
    <div className="mb-1 space-y-2 bg-white rounded-md border border-gray-200 p-3">
      {/* Header with title and dropdown */}
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium text-gray-800">Total Available Income</h2>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center space-x-1 px-2 py-1 bg-white border border-gray-200 rounded hover:shadow-sm transition"
            disabled={isLoading || externalLoading}
          >
            <IoFilterSharp className="text-gray-600 text-xs" />
            <span className="text-gray-800 text-xs font-medium">{selected}</span>
            <FiChevronDown className="text-gray-600" />
          </button>
          {open && (
            <ul className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded shadow-lg z-10 text-sm">
              {Object.keys(mockData).map((item) => (
                <li
                  key={item}
                  onClick={() => handleRangeChange(item)}
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Stats Cards with loaders */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {/* Total Income Card */}
        <div className="flex items-center p-2 bg-green-50 border border-red-200 rounded shadow-sm w-full">
          <FiDollarSign className="text-3xl mr-2 border border-red-100 p-1 text-green-600" />
          <div>
            {isLoading || externalLoading ? (
              <div className="animate-pulse">
                <div className="h-5 w-16 bg-gray-200 rounded mb-1"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <>
                <div className="text-base font-medium">{displayData.totalIncome}</div>
                <div className="text-xs text-gray-500">Total Income</div>
              </>
            )}
          </div>
        </div>

        {/* Stock on Hand Card */}
        <div className="flex items-center p-2 border border-gray-200 rounded shadow-sm w-full">
          <RiStockFill className="text-3xl mr-2 border border-gray-200 bg-red-100 rounded text-orange-600" />
          <div>
            {isLoading || externalLoading ? (
              <div className="animate-pulse">
                <div className="h-5 w-16 bg-gray-200 rounded mb-1"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <>
                <div className="text-base font-medium">{displayData.totalStock}</div>
                <div className="text-xs text-gray-500">Total Available Stock on Hand</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalAvailableIncome;