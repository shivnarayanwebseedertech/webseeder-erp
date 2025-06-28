import React, { useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiInfo, FiX } from "react-icons/fi";

const ICONS = {
  success: <FiCheckCircle className="h-5 w-5 text-green-500" />,
  error: <FiXCircle className="h-5 w-5 text-red-500" />,
  info: <FiInfo className="h-5 w-5 text-blue-500" />,
};

const COLORS = {
  success: "border-green-200 bg-green-50",
  error: "border-red-200   bg-red-50",
  info: "border-blue-200  bg-blue-50",
};

export default function Toast({
  message,
  type = "info",
  duration = 3000,
  onClose,
}) {
  useEffect(() => {
    console.log("🔔 Toast mounted, will auto-dismiss in", duration, "ms");
    const h = setTimeout(onClose, duration);
    return () => clearTimeout(h);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 max-w-xs border rounded-lg shadow flex items-start space-x-2 p-3 z-50 ${COLORS[type]}`}
    >
      {ICONS[type]}
      <div className="flex-1 text-sm text-gray-900">{message}</div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
      >
        <FiX className="h-4 w-4" />
      </button>
    </div>
  );
}
