import React, { useState, useEffect, useRef } from "react";
import { BiCalendarAlt } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { FiMessageCircle, FiPhone } from "react-icons/fi";
import { RiHeadphoneFill } from "react-icons/ri";

export default function Needhelp() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside); // Changed to 'click'
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const items = [
    { icon: <BiCalendarAlt size={18} />, label: "Schedule meeting" },
    { icon: <HiOutlineMail size={18} />, label: "Send email" },
    { icon: <FaWhatsapp size={18} />, label: "Whatsapp" },
    { icon: <FiMessageCircle size={18} />, label: "Live chat" },
    { icon: <FiPhone size={18} />, label: "Contact Us" },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent event from bubbling to document
          setOpen(!open);
        }}
        className="flex items-center gap-1 px-2 py-1 bg-sky-100 text-gray-800 rounded-lg shadow hover:bg-gray-100 focus:outline-none"
      >
        <RiHeadphoneFill size={20} />
        <span>Need help?</span>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg z-10"
          onClick={(e) => e.stopPropagation()} // Prevent click inside dropdown from closing it
        >
          <div className="py-2">
            {items.map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {icon}
                <span className="text-sm text-gray-700">{label}</span>
              </div>
            ))}
          </div>
          <div className="border-t px-4 py-3">
            <span className="text-xs text-gray-500 block">Support :</span>
            <a
              href="tel:+919898665536"
              className="text-sm text-gray-800 font-medium"
            >
              (+91) 9898665536
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
