// src/layouts/FullscreenLayout.jsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function FullscreenLayout({ onCancel }) {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (typeof onCancel === "function") {
      onCancel();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Icon-only sidebar placeholder: keep width = 3rem */}
      <div className="w-12 flex flex-col bg-white border-r">
        {/* Optionally, you could render the collapsed SideNavbar here to show icons */}
      </div>

      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-6 bg-white">
          <button
            onClick={handleCancel}
            className="mb-4 px-3 py-1 bg-gray-200 rounded"
          >
            ← Back
          </button>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
