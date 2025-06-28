import { useState } from "react";
import { AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import { FiX } from "react-icons/fi";

// Default units data
const DEFAULT_UNITS = [
  { shortName: "BAG", unitName: "BAGS" },
  { shortName: "BAL", unitName: "BALE" },
  { shortName: "BDL", unitName: "BUNDLES" },
  { shortName: "BKL", unitName: "BUCKLES" },
  { shortName: "BOU", unitName: "BILLION OF UNITS" },
  { shortName: "BOX", unitName: "BOX" },
  { shortName: "BTL", unitName: "BOTTLES" },
  { shortName: "BUN", unitName: "BUNCHES" },
  { shortName: "CAN", unitName: "CANS" },
  { shortName: "CBM", unitName: "CUBIC METERS" },
  { shortName: "CCM", unitName: "CUBIC CENTIMETERS" },
  { shortName: "CMS", unitName: "CENTIMETERS" },
  { shortName: "CTN", unitName: "CARTONS" },
  { shortName: "DOZ", unitName: "DOZENS" },
  { shortName: "DRM", unitName: "DRUMS" },
  { shortName: "GGK", unitName: "GREAT GROSS" },
  { shortName: "GMS", unitName: "GRAMMES" },
  { shortName: "GRS", unitName: "GROSS" },
  { shortName: "GYD", unitName: "GROSS YARDS" },
  { shortName: "KGS", unitName: "KILOGRAMS" },
  { shortName: "KLR", unitName: "KILOLITRE" },
  { shortName: "KME", unitName: "KILOMETRE" },
  { shortName: "LTR", unitName: "LITRES" },
  { shortName: "MLT", unitName: "MILILITRE" },
  { shortName: "MTR", unitName: "METERS" },
  { shortName: "MTS", unitName: "METRIC TON" },
  { shortName: "NOS", unitName: "NUMBERS" },
  { shortName: "PAC", unitName: "PACKS" },
  { shortName: "PCS", unitName: "PIECES" },
  { shortName: "PRS", unitName: "PAIRS" },
  { shortName: "QTL", unitName: "QUINTAL" },
  { shortName: "ROL", unitName: "ROLLS" },
  { shortName: "SET", unitName: "SETS" },
  { shortName: "SQF", unitName: "SQUARE FEET" },
  { shortName: "SQM", unitName: "SQUARE METERS" },
  { shortName: "SQY", unitName: "SQUARE YARDS" },
  { shortName: "TBS", unitName: "TABLETS" },
  { shortName: "TGM", unitName: "TEN GROSS" },
  { shortName: "THD", unitName: "THOUSANDS" },
  { shortName: "TON", unitName: "TONNES" },
  { shortName: "TUB", unitName: "TUBES" },
  { shortName: "UGS", unitName: "US GALLONS" },
  { shortName: "UNT", unitName: "UNITS" },
  { shortName: "YDS", unitName: "YARDS" },
  { shortName: "OTH", unitName: "OTHERS" },
];

// Custom units data (initially empty, would be populated from user input)
const CUSTOM_UNITS = [
  { shortName: "YR", gstShortName: "OTH", unitName: "OTHERS", actions: "Edit" },
  {
    shortName: "D/N",
    gstShortName: "OTH",
    unitName: "OTHERS",
    actions: "Edit",
  },
  {
    shortName: "MTH",
    gstShortName: "OTH",
    unitName: "OTHERS",
    actions: "Edit",
  },
  {
    shortName: "DAY",
    gstShortName: "OTH",
    unitName: "OTHERS",
    actions: "Edit",
  },
  { shortName: "WK", gstShortName: "OTH", unitName: "OTHERS", actions: "Edit" },
  {
    shortName: "HRS",
    gstShortName: "OTH",
    unitName: "OTHERS",
    actions: "Edit",
  },
];

export default function Unit({ collapsed }) {
  const [activeTab, setActiveTab] = useState("custom");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    shortName: "",
    unitName: "",
  });

  const wrapperStyle = {
    marginLeft: collapsed ? "1.5rem" : "10.5rem",
    paddingTop: "2.5rem",
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving unit:", formData);
    setShowCreateForm(false);
    // Add save logic here
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setFormData({
      shortName: "",
      unitName: "",
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
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <h1 className="text-2xl font-semibold flex items-center">
            Unit
            <AiOutlineStar className="ml-2 text-gray-400 hover:text-yellow-500 cursor-pointer" />
          </h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <AiOutlinePlus className="mr-2" /> Create Unit
          </button>
        </div>

        {/* Tab Navigation with Action Buttons */}
        <div className="px-6 border-b bg-white flex items-center justify-between">
          <nav>
            <ul className="flex space-x-4">
              {["custom", "default"].map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-4 text-sm font-medium ${
                      activeTab === tab
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 text-gray-600">
            <button className="p-1 hover:text-gray-800 cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </button>
            <button className="p-1 hover:text-gray-800 cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </button>
            <button className="p-1 hover:text-gray-800 cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
            <button className="p-1 hover:text-gray-800 cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <span className="text-sm text-gray-500">More Filter</span>
          </div>
        </div>

        {/* Table Content */}
        <div className="bg-white">
          {activeTab === "custom" ? (
            <CustomUnitsTable />
          ) : (
            <DefaultUnitsTable />
          )}
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
              Create unit
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
            {/* Short Name and Unit Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.shortName}
                  onChange={(e) =>
                    handleInputChange("shortName", e.target.value)
                  }
                  placeholder="BAG"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit Name
                </label>
                <select
                  value={formData.unitName}
                  onChange={(e) =>
                    handleInputChange("unitName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">BAGS</option>
                  <option value="BAGS">BAGS</option>
                  <option value="PIECES">PIECES</option>
                  <option value="KILOGRAMS">KILOGRAMS</option>
                  <option value="OTHERS">OTHERS</option>
                </select>
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

// Custom Units Table Component
function CustomUnitsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-sm font-medium text-gray-700 border-r">
              <div className="flex items-center">
                Short Name
                <svg
                  className="w-3 h-3 ml-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700 border-r">
              <div className="flex items-center">
                GST Short Name
                <svg
                  className="w-3 h-3 ml-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700 border-r">
              <div className="flex items-center">
                Unit Name
                <svg
                  className="w-3 h-3 ml-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {CUSTOM_UNITS.map((unit, idx) => (
            <tr
              key={idx}
              className={`border-b hover:bg-gray-50 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
              }`}
            >
              <td className="px-4 py-3 text-sm text-blue-600 border-r">
                {unit.shortName}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 border-r">
                {unit.gstShortName}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 border-r">
                {unit.unitName}
              </td>
              <td className="px-4 py-3 text-sm">
                <button className="text-blue-600 hover:text-blue-800">
                  {unit.actions}
                </button>
                <button className="ml-2 text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-3 bg-gray-50 border-t text-sm text-gray-600">
        <span>1 - 6 of 6 Records</span>
      </div>
      <div className="px-4 py-2 border-t text-xs text-gray-600">
        <span className="font-medium">SHORTCUTS:</span>{" "}
        <kbd className="px-1 bg-gray-200 rounded">ALT</kbd> +{" "}
        <kbd className="px-1 bg-gray-200 rounded">N</kbd> Create Units
      </div>
    </div>
  );
}

// Default Units Table Component
function DefaultUnitsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-sm font-medium text-gray-700 border-r">
              <div className="flex items-center">
                GST Short Name
                <svg
                  className="w-3 h-3 ml-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">
              <div className="flex items-center">
                Unit Name
                <svg
                  className="w-3 h-3 ml-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {DEFAULT_UNITS.map((unit, idx) => (
            <tr
              key={idx}
              className={`border-b hover:bg-gray-50 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
              }`}
            >
              <td className="px-4 py-3 text-sm text-gray-700 border-r">
                {unit.shortName}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {unit.unitName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-3 bg-gray-50 border-t text-sm text-gray-600">
        <span>1 - 45 of 45 Records</span>
      </div>
    </div>
  );
}
