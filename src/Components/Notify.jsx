// Notify.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FiBell, FiMoreHorizontal, FiX, FiTrash2 } from 'react-icons/fi';

const DUMMY_NOTIFICATIONS = [
  {
    id: 1,
    title: "New features & updates",
    message: "We have introduced new features and updates this February to meet your accounting needs. Click to read what's new in Munim ERP.",
  },
  {
    id: 2,
    title: "E-way/E-invoice API",
    message: "How to create E-way/E-invoice Portal API user credentials?",
  },
];

export default function Notify() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);
  const panelRef = useRef();

  // close panel & menus on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setMenuOpenId(null);
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setMenuOpenId(null);
  };

  const clearNotification = (id) => {
    console.log(`Cleared notification ${id}`);
    setMenuOpenId(null);
  };

  return (
    <div className="relative inline-block" ref={panelRef}>
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <FiBell className="w-4 h-4 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-100 font-semibold">
            Notifications
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.map((note) => (
              <div key={note.id} className="relative group hover:bg-gray-50">
                <div className="p-4 pr-10">
                  <div className="font-medium text-gray-800">{note.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{note.message}</div>
                </div>
                {/* three-dots button */}
                <button
                  onClick={() =>
                    setMenuOpenId((openId) => (openId === note.id ? null : note.id))
                  }
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                >
                  <FiMoreHorizontal className="w-5 h-5 text-gray-500" />
                </button>

                {/* per-item dropdown */}
                {menuOpenId === note.id && (
                  <div className="absolute top-10 right-4 w-32 bg-white border border-gray-200 rounded-md shadow-md z-50">
                    <button
                      onClick={() => clearNotification(note.id)}
                      className="w-full flex items-center px-3 py-2 hover:bg-gray-100"
                    >
                      <FiX className="w-4 h-4 mr-2" />
                      Clear
                    </button>
                    <button
                      onClick={() => removeNotification(note.id)}
                      className="w-full flex items-center px-3 py-2 hover:bg-gray-100"
                    >
                      <FiTrash2 className="w-4 h-4 mr-2" />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
            {notifications.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
