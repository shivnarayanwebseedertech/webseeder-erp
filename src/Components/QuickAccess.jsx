/*
File: src/components/QuickAccess.jsx
*/
import React, { useState } from "react";
import {
  FiUserPlus,
  FiBox,
  FiFilePlus,
  FiClipboard,
  FiCreditCard,
  FiDollarSign,
  FiMinus,
  FiPlus,
  FiBook
} from "react-icons/fi";
import { MdOutlineAccountBalance, MdSwapHoriz } from "react-icons/md";

const initialActions = [
  { label: "Create Account", icon: FiUserPlus },
  { label: "Create Item", icon: FiBox },
  { label: "Create Sales Invoice", icon: FiFilePlus },
  { label: "Create Purchase Bill", icon: FiClipboard },
  { label: "Create Receipt", icon: FiCreditCard },
  { label: "Create Payment", icon: FiDollarSign },
];

const additionalActions = [
  { label: "Create Expense", icon: FiCreditCard },
  { label: "Create Contra", icon: MdSwapHoriz },
  { label: "Create Journal", icon: FiBook },
];

export default function QuickAccess() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const actionsToShow = [
    ...initialActions,
    ...(isExpanded ? additionalActions : [])
  ];
  
  return (
    <div className="mb-1 space-y-2 bg-white rounded-md border border-gray-200 px-3 py-2">
      <div className="sm:flex-row sm:justify-between sm:items-center gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-medium text-gray-800">Quick Access</h2>
          <button 
            className="flex items-center text-xs bg-gray-200  px-1 border text-red-700 border-gray-300 rounded"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                View Less
              </>
            ) : (
              <>
                View More
              </>
            )}
          </button>
        </div>
        
        <div className="mt-2 grid grid-cols-2 md:grid-cols-6 gap-2 mb- text-xs">
          {actionsToShow.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex flex-col items-center p-2 bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-50 transition-transform hover:scale-105"
            >
              <Icon className="text-3xl mb-1 p-1.5 rounded shadow-sm border border-gray-200 text-indigo-600" />
              <span className="text-xs text-gray-700 text-center">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}