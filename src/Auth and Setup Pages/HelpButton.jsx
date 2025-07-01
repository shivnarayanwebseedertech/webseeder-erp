import React from 'react'; 
import { FiCalendar, FiMessageSquare, FiFileText } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

// default list of 4 options
const defaultHelpOptions = [
  { Icon: FiCalendar, iconColor: 'text-blue-500', label: 'Book Demo' },
  { Icon: FiMessageSquare, iconColor: 'text-purple-500', label: 'Live Chat' },
  { Icon: FaWhatsapp, iconColor: 'text-green-500', label: 'Whatsapp Chat' },
  { Icon: FiFileText, iconColor: 'text-gray-600', label: 'Documentation' },
];

// single button sub‑component
const HelpButtonItem = ({ Icon, iconColor, label }) => (
  <button className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow">
    <div className="mb-3">
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <span className="text-gray-800 font-medium">{label}</span>
  </button>
);

export default function HelpButton({ options = defaultHelpOptions }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2">
      {options.map((opt, idx) => (
        <HelpButtonItem
          key={idx}
          Icon={opt.Icon}
          iconColor={opt.iconColor}
          label={opt.label}
        />
      ))}
    </div>
  );
}
