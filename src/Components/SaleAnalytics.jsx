// File: src/components/SaleAnalytics.jsx
import React, { useState, useEffect, useRef } from "react";
import { IoFilterSharp } from "react-icons/io5";

const itemOptions = ["All", "Item A", "Item B", "Item C", "Item D"];
const dateRanges = ["Today", "Last 7 days", "Last 30 days", "Current month", "Custom date"];

// Mock data generator
const generateMockData = (item, dateRange, activeTab) => {
  const items = item === "All" ? ["Item A", "Item B", "Item C", "Item D"] : [item];
  const rangeMultiplier = dateRanges.indexOf(dateRange) + 1;
  
  return items.map(itemName => ({
    name: itemName,
    sales: Math.floor(Math.random() * 10000 * rangeMultiplier),
    quantity: Math.floor(Math.random() * 100 * rangeMultiplier),
    growth: (Math.random() * 20 - 5).toFixed(1) // Random growth between -5% to +15%
  }));
};

export default function SaleAnalytics() {
  const [item, setItem] = useState(itemOptions[0]);
  const [dateRange, setDateRange] = useState("Current month");
  const [openItem, setOpenItem] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [activeTab, setActiveTab] = useState("Top Sales Item");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemRef = useRef(null);
  const dateRef = useRef(null);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (itemRef.current && !itemRef.current.contains(e.target)) {
        setOpenItem(false);
      }
      if (dateRef.current && !dateRef.current.contains(e.target)) {
        setOpenDate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch data when filters change
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const mockData = generateMockData(item, dateRange, activeTab);
      setData(mockData);
      setIsLoading(false);
    };

    fetchData();
  }, [item, dateRange, activeTab]);

  // Determine growth color
  const getGrowthColor = (growth) => {
    return parseFloat(growth) >= 0 ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="bg-white w-1/2 rounded-lg border border-gray-200 p-6">
      <div className="flex  flex-col sm:flex-row justify-between items-center gap-3 mb-4">
        <h2 className="text-base font-medium text-gray-800">Sale Analytics</h2>
        <div className="flex flex-wrap gap-2">
          {/* Item dropdown */}
          <div className="relative" ref={itemRef}>
            <button
              onClick={() => setOpenItem(!openItem)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-200 rounded hover:shadow-sm transition text-sm"
            >
              <span>Item: {item}</span>
              <IoFilterSharp className="w-4 h-4 text-gray-600" />
            </button>
            {openItem && (
              <ul className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow-lg z-10 text-sm">
                {itemOptions.map((opt) => (
                  <li
                    key={opt}
                    onClick={() => { setItem(opt); setOpenItem(false); }}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Date range dropdown */}
          <div className="relative" ref={dateRef}>
            <button
              onClick={() => setOpenDate(!openDate)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-200 rounded hover:shadow-sm transition text-sm"
            >
              <span>{dateRange}</span>
              <IoFilterSharp className="w-4 h-4 text-gray-600" />
            </button>
            {openDate && (
              <ul className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-10 text-sm">
                {dateRanges.map((r) => (
                  <li
                    key={r}
                    onClick={() => { setDateRange(r); setOpenDate(false); }}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <ul className="flex space-x-6 text-sm font-medium text-gray-600">
          {["Top Sales Item", "Top Sold Quantity"].map((tab) => (
            <li 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 cursor-pointer ${
                activeTab === tab 
                  ? "border-b-2 border-blue-600 text-blue-600" 
                  : "hover:text-gray-800"
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="py-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : data.length === 0 ? (
          <div className="py-8 text-center text-gray-500 text-sm">
            No sales record found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {activeTab.includes("Sales") ? "Sales (₹)" : "Quantity"}
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                      {activeTab.includes("Sales") 
                        ? `₹${row.sales.toLocaleString('en-IN')}` 
                        : row.quantity.toLocaleString('en-IN')}
                    </td>
                    <td className={`px-4 py-3 whitespace-nowrap text-sm text-right font-medium ${getGrowthColor(row.growth)}`}>
                      {parseFloat(row.growth) >= 0 ? `↑ ${row.growth}%` : `↓ ${row.growth}%`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}