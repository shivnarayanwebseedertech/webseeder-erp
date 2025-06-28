// File: src/components/RevenueManagement.jsx
import React, { useState, useEffect, useRef } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { FiFileText, FiBookmark, FiCalendar } from "react-icons/fi";
import { IoCashOutline } from "react-icons/io5";

const manageRanges = [
  "Today",
  "Last 7 days",
  "Last 30 days",
  "Current month",
  "Custom date",
];

// Mock data generator based on selected time range
const generateMockData = (timeRange) => {
  const rangeIndex = manageRanges.indexOf(timeRange) + 1;

  return {
    invoiceReceivable: Math.floor(Math.random() * 100) * rangeIndex,
    expectedReceivable: (Math.random() * 10000 * rangeIndex).toFixed(2),
    billsPayable: Math.floor(Math.random() * 50) * rangeIndex,
    expectedPayable: (Math.random() * 8000 * rangeIndex).toFixed(2),
  };
};

const AmountWithLoader = ({ value, isCurrency = false, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center h-7 items-center">
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="font-semibold text-gray-800 truncate h-7 flex items-center">
      {isCurrency
        ? `₹${parseFloat(value).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
          })}`
        : value.toLocaleString("en-IN")}
    </div>
  );
};

export function RevenueManagement() {
  const [selected, setSelected] = useState("Today");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    invoiceReceivable: 0,
    expectedReceivable: "0.00",
    billsPayable: 0,
    expectedPayable: "0.00",
  });
  const [loadingStates, setLoadingStates] = useState({
    invoiceReceivable: true,
    expectedReceivable: true,
    billsPayable: true,
    expectedPayable: true,
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
      setIsLoading(true);
      setLoadingStates({
        invoiceReceivable: true,
        expectedReceivable: true,
        billsPayable: true,
        expectedPayable: true,
      });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Get mock data based on selected range
      const mockData = generateMockData(selected);

      setMetrics({
        invoiceReceivable: mockData.invoiceReceivable,
        expectedReceivable: mockData.expectedReceivable,
        billsPayable: mockData.billsPayable,
        expectedPayable: mockData.expectedPayable,
      });

      // Simulate individual loading completion
      setTimeout(() => {
        setLoadingStates({
          invoiceReceivable: false,
          expectedReceivable: false,
          billsPayable: false,
          expectedPayable: false,
        });
        setIsLoading(false);
      }, 200);
    };

    fetchData();
  }, [selected]);

  const metricCards = [
    {
      id: 1,
      value: metrics.invoiceReceivable,
      icon: <FiFileText className="w-6 h-6 text-amber-600" />,
      label: "Invoice Receivable",
      bgColor: "bg-amber-50",
      iconBg: "bg-amber-100",
      isCurrency: false,
      loading: loadingStates.invoiceReceivable,
    },
    {
      id: 2,
      value: metrics.expectedReceivable,
      icon: <IoCashOutline className="w-6 h-6 text-green-600" />,
      label: "Expected Receivable",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      isCurrency: true,
      loading: loadingStates.expectedReceivable,
    },
    {
      id: 3,
      value: metrics.billsPayable,
      icon: <FiBookmark className="w-6 h-6 text-amber-600" />,
      label: "Bills Payable",
      bgColor: "bg-amber-50",
      iconBg: "bg-amber-100",
      isCurrency: false,
      loading: loadingStates.billsPayable,
    },
    {
      id: 4,
      value: metrics.expectedPayable,
      icon: <FiCalendar className="w-6 h-6 text-pink-600" />,
      label: "Expected Payable",
      bgColor: "bg-pink-50",
      iconBg: "bg-pink-100",
      isCurrency: true,
      loading: loadingStates.expectedPayable,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-medium text-gray-800">
          Revenue Management
        </h2>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center space-x-1 px-2 py-1 bg-white border border-gray-200 rounded hover:shadow-sm transition"
            aria-label="Time range filter"
          >
            <IoFilterSharp className="text-gray-600 w-5 h-5" />
            <span className="text-gray-800 text-sm font-medium">
              {selected}
            </span>
          </button>
          {open && (
            <ul className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-10 text-sm">
              {manageRanges.map((range) => (
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
            <div className={`p-3 ${card.iconBg} rounded-full`}>{card.icon}</div>
            <div className="ml-4 min-w-0 flex-1">
              <AmountWithLoader
                value={card.value}
                isCurrency={card.isCurrency}
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
