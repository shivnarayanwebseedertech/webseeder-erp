import React, { useState, useEffect } from "react";
import {
  FiEye,
  FiEyeOff,
  FiSearch,
  FiX,
  FiSettings,
  FiChevronDown,
} from "react-icons/fi";
import { GoSidebarCollapse } from "react-icons/go";
import { AiOutlineFile, AiOutlineBell } from "react-icons/ai";
import ProfileDropdown from "../Components/ProfileDropdown";
import MissingFeature from "../Components/MissingFeature";
import KeyboardShortcuts from "../Components/KeyboardShortcuts";
import Notify from "../Components/Notify";

const TopNavbar = ({
  collapsed,
  onToggleSidebar,
  companyName = "My Company",
  onSwitchCompany,
  ownerNumber, // pass these down from parent
  supportPin, // pass these down from parent
}) => {
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hidden, setHidden] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(30);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const FIRST_KEY = "firstVisit";
    let first = localStorage.getItem(FIRST_KEY);
    if (!first) {
      localStorage.setItem(FIRST_KEY, new Date().toISOString());
      first = new Date().toISOString();
    }
    const diffDays = Math.floor(
      (new Date() - new Date(first)) / (1000 * 60 * 60 * 24)
    );
    setDaysRemaining(Math.max(0, 30 - diffDays));
  }, []);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const startFY = month >= 4 ? year : year - 1;
  const endFY = startFY + 1;
  const fyLabel = `${startFY}-${String(endFY).slice(-2)}`;

  return (
    <header
      className="fixed top-0 left-0 right-0 h-12 bg-white border-b z-40 flex items-center px-3 text-xs transition-all duration-300"
      style={{ marginLeft: collapsed ? "3rem" : "12rem" }}
    >
      {searchMode ? (
        <div className="flex items-center w-full">
          <FiSearch className="h-4 w-4 mr-2 text-gray-600" />
          <input
            type="text"
            className="flex-1 h-8 text-xs border rounded px-2 focus:outline-none"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiX
            className="h-4 w-4 ml-2 text-gray-600 cursor-pointer"
            onClick={() => setSearchMode(false)}
          />
        </div>
      ) : (
        <div className="flex items-center w-full justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-3">
            <GoSidebarCollapse
              className="h-4 w-4 cursor-pointer"
              onClick={onToggleSidebar}
            />
            <AiOutlineFile className="h-4 w-4 text-gray-600" />
            <div
              onClick={() => setHidden((h) => !h)}
              className="cursor-pointer"
            >
              {hidden ? (
                <FiEyeOff className="h-4 w-4 text-gray-600" />
              ) : (
                <FiEye className="h-4 w-4 text-gray-600" />
              )}
            </div>
            <span className="bg-white border border-gray-200 px-2 py-1 rounded text-2xs text-gray-700">
              {fyLabel}
            </span>
            <button className="bg-white border border-gray-200 px-2 py-1 rounded text-2xs text-gray-700">
              {companyName}
            </button>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center bg-white border border-gray-200 px-2 py-1 rounded text-2xs text-gray-700 focus:outline-none"
              >
                <FiChevronDown className="h-3 w-3" />
              </button>
              {dropdownOpen && (
                <ul className="absolute mt-1 right-0 w-40 bg-white border border-gray-200 rounded shadow-md text-xs">
                  <li
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setDropdownOpen(false);
                      onSwitchCompany?.();
                    }}
                  >
                    Switch Company
                  </li>
                </ul>
              )}
            </div>
            <span className="bg-white border border-red-200 px-2 py-1 rounded text-2xs text-red-600">
              {daysRemaining} days remaining
            </span>
            <button className="bg-blue-600 text-white px-2 py-1 rounded text-2xs">
              Buy Now
            </button>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-3">
            <FiSearch
              className="h-4 w-4 cursor-pointer"
              onClick={() => setSearchMode(true)}
            />
            <button className="flex items-center bg-purple-50 text-purple-600 px-2 py-1 rounded text-2xs">
              Need help? <FiSettings className="ml-1 h-3 w-3" />
            </button>
            <MissingFeature />
            <KeyboardShortcuts />
            <Notify />
            <ProfileDropdown
              ownerNumber={ownerNumber}
              supportPin={supportPin}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export { TopNavbar };
