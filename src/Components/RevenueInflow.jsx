// File: src/components/RevenueInflow.jsx
import React, { useState, useEffect, useRef } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { AiOutlineRobot, AiOutlineBank } from "react-icons/ai";
import { BsPiggyBank, BsCashStack } from "react-icons/bs";

const inflowRanges = ["Today", "Last 7 days", "Last 30 days", "Current month", "Custom date"];

// Mock data generator
const generateMockInflowData = (timeRange) => {
  const rangeIndex = inflowRanges.indexOf(timeRange) + 1;
  
  return {
    totalCashCollected: (Math.random() * 50000 * rangeIndex).toFixed(2),
    totalCashBalance: (Math.random() * 100000 * rangeIndex).toFixed(2),
    totalCollectionInBank: (Math.random() * 75000 * rangeIndex).toFixed(2),
    totalBankBalance: (Math.random() * 150000 * rangeIndex).toFixed(2)
  };
};

const AmountWithLoader = ({ value, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center h-7 items-center">
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="font-semibold text-gray-800 truncate h-7 flex items-center">
      ₹{parseFloat(value).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
    </div>
  );
};

export function RevenueInflow() {
  const [selected, setSelected] = useState("Today");
  const [open, setOpen] = useState(false);
  const [metrics, setMetrics] = useState({
    totalCashCollected: "0.00",
    totalCashBalance: "0.00",
    totalCollectionInBank: "0.00",
    totalBankBalance: "0.00"
  });
  const [loadingStates, setLoadingStates] = useState({
    totalCashCollected: true,
    totalCashBalance: true,
    totalCollectionInBank: true,
    totalBankBalance: true
  });
  const dropdownRef = useRef(null);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch data when component mounts or time range changes
  useEffect(() => {
    const fetchData = async () => {
      // Set all metrics to loading state
      setLoadingStates({
        totalCashCollected: true,
        totalCashBalance: true,
        totalCollectionInBank: true,
        totalBankBalance: true
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get mock data based on selected range
      const mockData = generateMockInflowData(selected);
      
      setMetrics({
        totalCashCollected: mockData.totalCashCollected,
        totalCashBalance: mockData.totalCashBalance,
        totalCollectionInBank: mockData.totalCollectionInBank,
        totalBankBalance: mockData.totalBankBalance
      });
      
      // Simulate individual loading completion
      setTimeout(() => {
        setLoadingStates({
          totalCashCollected: false,
          totalCashBalance: false,
          totalCollectionInBank: false,
          totalBankBalance: false
        });
      }, 200);
    };

    fetchData();
  }, [selected]);

  const metricCards = [
    { 
      id: 1,
      value: metrics.totalCashCollected,
      icon: <AiOutlineRobot className="w-6 h-6 text-blue-600" />,
      label: "Total Cash Collected",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      loading: loadingStates.totalCashCollected
    },
    { 
      id: 2,
      value: metrics.totalCashBalance,
      icon: <BsPiggyBank className="w-6 h-6 text-indigo-600" />,
      label: "Total Cash Balance (As on)",
      bgColor: "bg-indigo-50",
      iconBg: "bg-indigo-100",
      loading: loadingStates.totalCashBalance
    },
    { 
      id: 3,
      value: metrics.totalCollectionInBank,
      icon: <AiOutlineBank className="w-6 h-6 text-orange-600" />,
      label: "Total Collection In Bank",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      loading: loadingStates.totalCollectionInBank
    },
    { 
      id: 4,
      value: metrics.totalBankBalance,
      icon: <BsCashStack className="w-6 h-6 text-pink-600" />,
      label: "Total Bank Balance (As on)",
      bgColor: "bg-pink-50",
      iconBg: "bg-pink-100",
      loading: loadingStates.totalBankBalance
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-medium text-gray-800">Revenue Inflow</h2>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center space-x-1 px-3 py-1 bg-white border border-gray-200 rounded hover:shadow-sm transition"
            aria-label="Time range filter"
          >
            <IoFilterSharp className="text-gray-600 w-5 h-5" />
            <span className="text-gray-800 text-sm font-medium">{selected}</span>
          </button>
          {open && (
            <ul className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-10 text-sm">
              {inflowRanges.map((range) => (
                <li
                  key={range}
                  onClick={() => {
                    setSelected(range);
                    setOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {range}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        {metricCards.map((card) => (
          <div 
            key={card.id}
            className={`flex items-center p-4 ${card.bgColor} rounded shadow-sm transition-all hover:shadow-md min-h-[100px]`}
          >
            <div className={`p-3 ${card.iconBg} rounded-full`}>
              {card.icon}
            </div>
            <div className="ml-4 min-w-0 flex-1">
              <AmountWithLoader 
                value={card.value} 
                isLoading={card.loading} 
              />
              <div className="text-gray-500 mt-1">{card.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}