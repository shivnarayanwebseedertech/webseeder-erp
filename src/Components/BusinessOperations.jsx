// File: src/components/BusinessOperations.jsx
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FiShoppingCart, FiCreditCard } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";

// Default configuration (can be overridden by props)
const defaultStats = [
  {
    type: "sale",
    label: "Total Sale",
    value: "₹0.00",
    icon: FiShoppingCart,
    bg: "bg-white",
    iconBg: "bg-blue-100",
    iconText: "text-blue-500",
  },
  {
    type: "purchase",
    label: "Total Purchase",
    value: "₹0.00",
    icon: MdOutlineShoppingBag,
    bg: "bg-white",
    iconBg: "bg-blue-100",
    iconText: "text-blue-500",
  },
  {
    type: "expense",
    label: "Total Expenses",
    value: "₹0.00",
    icon: FiCreditCard,
    bg: "bg-red-50",
    iconBg: "bg-red-100",
    iconText: "text-red-500",
  },
];

const defaultFilterOptions = [
  "Today",
  "Last 7 days",
  "Last 30 days",
  "Current month",
  "Custom date",
];

const AmountWithLoader = ({ value, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="text-base font-semibold text-gray-800">
      {value}
    </div>
  );
};

const BusinessOperations = ({
  stats = defaultStats,
  filterOptions = defaultFilterOptions,
  onFilterChange,
  initialFilter = "Current month",
  isLoading = false,
  externalFilter = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const [selectedOption, setSelectedOption] = useState(initialFilter);
  const [localStats, setLocalStats] = useState(stats);
  const [localLoading, setLocalLoading] = useState(false);

  // Sync with external filter changes
  useEffect(() => {
    if (externalFilter && externalFilter !== selectedOption) {
      setSelectedOption(externalFilter);
      
      // Simulate loading when external filter changes
      setLocalLoading(true);
      setTimeout(() => {
        // Generate dummy data based on filter
        const multiplier = filterOptions.indexOf(externalFilter) + 1;
        
        setLocalStats([
          {
            ...stats[0],
            value: `₹${(Math.random() * 10000 * multiplier).toFixed(2)}`
          },
          {
            ...stats[1],
            value: `₹${(Math.random() * 8000 * multiplier).toFixed(2)}`
          },
          {
            ...stats[2],
            value: `₹${(Math.random() * 3000 * multiplier).toFixed(2)}`
          }
        ]);
        setLocalLoading(false);
      }, 1000);
    }
  }, [externalFilter]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleOptionSelect = (option) => {
    // Simulate loading when filter changes locally
    setLocalLoading(true);
    setTimeout(() => {
      const multiplier = filterOptions.indexOf(option) + 1;
      
      setLocalStats([
        {
          ...stats[0],
          value: `₹${(Math.random() * 10000 * multiplier).toFixed(2)}`
        },
        {
          ...stats[1],
          value: `₹${(Math.random() * 8000 * multiplier).toFixed(2)}`
        },
        {
          ...stats[2],
          value: `₹${(Math.random() * 3000 * multiplier).toFixed(2)}`
        }
      ]);
      
      setSelectedOption(option);
      setIsOpen(false);
      setLocalLoading(false);
      
      if (onFilterChange) {
        onFilterChange(option);
      }
    }, 1000);
  };

  return (
    <div className="mb-0.5 space-y-2 bg-white rounded-md border border-gray-200 px-3 py-2">
      {/* Header + dropdown */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-medium text-gray-800">
          Business operations
        </h2>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-2 py-1 text-xs bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            disabled={localLoading || isLoading}
          >
            <IoFilterSharp className="mr-2 text-md" />
            {selectedOption}
          </button>
          {isOpen && (
            <ul
              className="absolute right-0 z-10 w-40 mt-1 bg-white border border-gray-200 rounded-md shadow-lg text-sm"
              role="listbox"
            >
              {filterOptions.map((option) => (
                <li
                  key={option}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionSelect(option)}
                  role="option"
                  aria-selected={option === selectedOption}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Stat cards - With loading skeletons */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {localStats.map(
          ({ label, value, icon: Icon, bg, iconBg, iconText }, index) => (
            <div
              key={`${label}-${index}`}
              className={`flex items-center px-4 py-2 ${bg} border border-gray-200 rounded shadow-sm`}
            >
              <Icon
                className={`p-1 mr-2 text-2xl rounded shadow-sm ${iconBg} ${iconText}`}
              />
              <div className="w-full">
                {/* Amount with loader */}
                <AmountWithLoader 
                  value={value} 
                  isLoading={localLoading || isLoading} 
                />
                
                {/* Label - Always visible */}
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

BusinessOperations.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      bg: PropTypes.string,
      iconBg: PropTypes.string,
      iconText: PropTypes.string,
    })
  ),
  filterOptions: PropTypes.arrayOf(PropTypes.string),
  onFilterChange: PropTypes.func,
  initialFilter: PropTypes.string,
  isLoading: PropTypes.bool,
  externalFilter: PropTypes.string,
};

BusinessOperations.defaultProps = {
  stats: defaultStats,
  filterOptions: defaultFilterOptions,
  initialFilter: "Current month",
  isLoading: false,
};

export default BusinessOperations;