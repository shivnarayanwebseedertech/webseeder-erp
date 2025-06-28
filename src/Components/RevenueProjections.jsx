import React, { useState, useRef, useEffect } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { TfiStatsUp } from "react-icons/tfi";

// Mock API service (replace with actual API calls)
const fetchRevenueData = async (timeRange) => {
  // Mock data based on time range
  const mockData = {
    Today: {
      startDate: "12 May",
      endDate: "12 May 2025",
      receivable: 2500.75,
      payable: 1800.25,
      receivableComparison: 12.5,
      payableComparison: 8.3,
    },
    "Last 7 days": {
      startDate: "5 May",
      endDate: "12 May 2025",
      receivable: 17500.5,
      payable: 12600.75,
      receivableComparison: 18.2,
      payableComparison: 15.7,
    },
    "Last 30 days": {
      startDate: "12 Apr",
      endDate: "12 May 2025",
      receivable: 75000.25,
      payable: 54200.5,
      receivableComparison: 22.1,
      payableComparison: 19.4,
    },
    "Current month": {
      startDate: "1 May",
      endDate: "31 May 2025",
      receivable: 0,
      payable: 0,
      receivableComparison: 100,
      payableComparison: 100,
    },
    "Custom date": {
      startDate: "1 Jan",
      endDate: "31 Jan 2025",
      receivable: 42000.35,
      payable: 38500.2,
      receivableComparison: -5.2,
      payableComparison: -2.7,
    },
  };

  // Simulate network delay
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockData[timeRange]), 500)
  );
};

export default function RevenueProjections() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedRange, setSelectedRange] = useState("Current month");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revenueData, setRevenueData] = useState({
    startDate: "",
    endDate: "",
    receivable: 0,
    payable: 0,
    receivableComparison: 0,
    payableComparison: 0,
  });

  const options = [
    "Today",
    "Last 7 days",
    "Last 30 days",
    "Current month",
    "Custom date",
  ];

  // Fetch data when selected range changes
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchRevenueData(selectedRange);
        setRevenueData(data);
      } catch (err) {
        setError("Failed to load revenue data");
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [selectedRange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Determine comparison styling and text
  const renderComparison = (value) => {
    const isPositive = value >= 0;
    const percentageText = `${isPositive ? "↑" : "↓"}${Math.abs(value)}%`;

    return (
      <div className="flex flex-col items-end">
        <span
          className={`inline-block px-2 py-0 text-[10px]  ${
            isPositive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {percentageText}
        </span>
        <p className="text-xs text-gray-500 mt-1">vs Last month</p>
      </div>
    );
  };

  return (
    <div className="mb-1 space-y-2 bg-white rounded-md border border-gray-200 px-3 py-2">
      {/* Header with title, date range and dropdown */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h2 className="text-base font-medium text-gray-800">
          Revenue Projections
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-600 gap-2">
          <span>
            Compared From{" "}
            <span className="font-semibold text-gray-800">
              {revenueData.startDate}
            </span>{" "}
            To{" "}
            <span className="font-semibold text-gray-800">
              {revenueData.endDate}
            </span>
          </span>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-2 py-1 bg-white border text-xs border-gray-300 rounded-md hover:bg-gray-50"
              disabled={isLoading}
            >
              <IoFilterSharp className="mr-2 text-xs text-gray-700" />
              {selectedRange}
            </button>
            {isOpen && (
              <ul className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg text-sm z-10">
                {options.map((option) => (
                  <li
                    key={option}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedRange(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Receivable Card */}
        <div className="p-3 bg-white rounded shadow-sm border border-gray-200">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-3"></div>
              <div className="h-5 w-28 bg-gray-200 rounded"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm">Error loading data</div>
          ) : (
            <>
              <div className="flex justify-between">
                <div>
                  <div className="text-base font-semibold text-gray-800">
                    {formatCurrency(revenueData.receivable)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Total Receivable Amount
                  </div>
                </div>
                <div>{renderComparison(revenueData.receivableComparison)}</div>
              </div>
            </>
          )}
        </div>

        {/* Payable Card */}
        <div className="p-3 bg-white rounded shadow-sm border border-gray-200">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-3"></div>
              <div className="h-5 w-28 bg-gray-200 rounded"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm">Error loading data</div>
          ) : (
            <>
              <div className="flex justify-between">
                <div>
                  <div className="text-base font-semibold text-gray-800">
                    {formatCurrency(revenueData.payable)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Total Payable Amount
                  </div>
                </div>
                {renderComparison(revenueData.payableComparison)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
