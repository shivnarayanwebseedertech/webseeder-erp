import React, { useState, useRef, useEffect } from 'react';
import {
  FiUser,
  FiChevronRight,
  FiCopy,
  FiBriefcase,
  FiCreditCard,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';
import Toast from './Toast';

export default function ProfileDropdown({ ownerNumber, supportPin }) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopy = () => {
    console.log('🔍 handleCopy fired');
    navigator.clipboard.writeText(supportPin);
    setToast(true);
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="bg-white text-blue-400 mt-1 rounded-full flex items-center p-1 text-sm focus:outline-none"
      >
        <FiUser className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 text-xs">
          {/* Owner row */}
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FiUser className="h-4 w-4 text-gray-500" />
              <span className="text-gray-800 text-sm font-medium">
                {ownerNumber}
              </span>
            </div>
            <FiChevronRight className="h-4 w-4 text-gray-400" />
          </div>

          {/* Support PIN */}
          <button
            onClick={handleCopy}
            className="w-full px-3 py-2 flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center space-x-2 text-gray-700 text-sm">
              <span>Support PIN:</span>
              <span className="font-medium">{supportPin}</span>
            </div>
            <FiCopy className="h-4 w-4 text-gray-400" />
          </button>

          {/* Menu Items */}
          <div className="mt-1 divide-y divide-gray-100">
            <MenuItem icon={<FiBriefcase />} text="My Companies" />
            <MenuItem icon={<FiCreditCard />} text="Billing & Plans" />
            <MenuItem icon={<FiSettings />} text="Account Settings" />
            <MenuItem
              icon={<FiLogOut />}
              text="Sign out"
              textClass="text-red-600"
            />
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message="Support token is copied to clipboard."
          type="success"
          onClose={() => setToast(false)}
        />
      )}
    </div>
  );
}

function MenuItem({ icon, text, onClick, textClass = 'text-gray-700' }) {
  return (
    <button
      onClick={onClick}
      className="w-full px-3 py-2 flex items-center space-x-2 text-sm hover:bg-gray-50 focus:outline-none"
    >
      <span className="h-4 w-4 text-gray-500">{icon}</span>
      <span className={`flex-1 text-left ${textClass}`}>{text}</span>
    </button>
  );
}
