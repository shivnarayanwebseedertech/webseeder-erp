import { useState } from "react";
import { AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import { BiImport } from "react-icons/bi";
import HelpSupportCards from "../Components/HelpSupportCards";

export default function ItemGroup({ collapsed }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    groupName: "",
    remarks: "",
  });

  const wrapperStyle = {
    marginLeft: collapsed ? "1.5rem" : "10.5rem",
    paddingTop: "2.5rem",
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving item group:", formData);
    setShowCreateForm(false);
    // Add save logic here
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setFormData({
      groupName: "",
      remarks: "",
    });
  };

  return (
    <div
      style={wrapperStyle}
      className="min-h-screen bg-gray-100 w-full transition-all duration-300 relative"
    >
      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          showCreateForm ? "opacity-30" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 w-full">
          <div className="w-full max-w-lg aspect-video bg-black/5 rounded overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="How to create item groups"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <h2 className="text-xl font-semibold">Manage your Groups.</h2>
          <p className="text-gray-500">
            Configure your groups for product & service management.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <AiOutlinePlus className="mr-2" /> Create Group
            </button>
            <button className="inline-flex items-center border px-4 py-2 rounded-md hover:bg-gray-50">
              <BiImport className="mr-2" /> Import
            </button>
          </div>
          <div className="mt-10">
            <HelpSupportCards />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showCreateForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={handleCancel}
        />
      )}

      {/* Slide-in Form Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-2/5 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 rounded-l-2xl ${
          showCreateForm ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b bg-white rounded-tl-2xl">
            <h1 className="text-xl font-semibold flex items-center">
              New Group
              <AiOutlineStar className="ml-2 text-gray-400 hover:text-yellow-500 cursor-pointer" />
            </h1>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-6 space-y-6">
            {/* Group Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.groupName}
                  onChange={(e) =>
                    handleInputChange("groupName", e.target.value)
                  }
                  placeholder="Group Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks
                </label>
                <input
                  type="text"
                  value={formData.remarks}
                  onChange={(e) => handleInputChange("remarks", e.target.value)}
                  placeholder="Remarks"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Shortcuts */}
            <div className="bg-gray-50 p-4 rounded-md mt-8">
              <div className="text-sm text-gray-700">
                <span className="font-medium">SHORTCUTS:</span>
                <div className="flex items-center space-x-6 mt-2">
                  <span className="flex items-center space-x-1">
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">
                      CTRL
                    </kbd>
                    <span className="text-xs">+</span>
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">
                      ALT
                    </kbd>
                    <span className="text-xs">+</span>
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">
                      S
                    </kbd>
                    <span className="text-xs ml-2">Save</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">
                      CTRL
                    </kbd>
                    <span className="text-xs">+</span>
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">
                      ALT
                    </kbd>
                    <span className="text-xs">+</span>
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">
                      C
                    </kbd>
                    <span className="text-xs ml-2">Cancel</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
