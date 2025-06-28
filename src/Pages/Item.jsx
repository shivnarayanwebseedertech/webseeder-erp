import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiImport } from "react-icons/bi";
import { BsQuestionCircle, BsInfoCircle } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import HelpSupportCards from "../Components/HelpSupportCards";

export default function Item({ collapsed }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "Goods",
    name: "",
    description: "",
    group: "",
    category: "",
    unit: "",
    manageStock: "Normal",
    sku: "",
    openingStockQty: "0.000",
    openingStockValue: "0.00",
    negativeQtyAllowed: false,
    lowStockWarning: false,
    showInPurchase: true,
    showInSales: true,
    mrp: "0.00",
    purchasePrice: "0.000",
    salesPrice: "0.000",
    cessEnable: false,
    status: "Active",
  });

  const wrapperStyle = {
    marginLeft: collapsed ? "1.5rem" : "10.5rem",
    paddingTop: "2.5rem",
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving item:", formData);
    setShowCreateForm(false);
    // Add save logic here
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setFormData({
      type: "Goods",
      name: "",
      description: "",
      group: "",
      category: "",
      unit: "",
      manageStock: "Normal",
      sku: "",
      openingStockQty: "0.000",
      openingStockValue: "0.00",
      negativeQtyAllowed: false,
      lowStockWarning: false,
      showInPurchase: true,
      showInSales: true,
      mrp: "0.00",
      purchasePrice: "0.000",
      salesPrice: "0.000",
      cessEnable: false,
      status: "Active",
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
          {/* Illustration */}
          <div className="w-64 h-64 bg-gradient-to-b from-blue-100 to-blue-600 rounded-full flex items-center justify-center relative">
            <div className="w-32 h-40 bg-white rounded-lg shadow-lg relative">
              <div className="w-full h-3 bg-blue-600 rounded-t-lg"></div>
              <div className="p-3 space-y-2">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                <div className="h-2 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            <div className="absolute -right-2 top-8 w-24 h-32 bg-white rounded-lg shadow-lg">
              <div className="w-full h-2 bg-blue-600 rounded-t-lg"></div>
              <div className="p-2 space-y-1">
                <div className="h-1 bg-gray-200 rounded"></div>
                <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                <div className="h-1 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            Manage your products/services.
          </h2>
          <p className="text-gray-500 max-w-md">
            Configure your product & service for income and expense management.
          </p>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center text-sm bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium"
            >
              <AiOutlinePlus className="mr-2" /> Create Item
            </button>
            <button className="inline-flex items-center text-sm border border-gray-300 bg-white px-6 py-3 rounded-md hover:bg-gray-50 font-medium">
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
              New Item
              <BsQuestionCircle className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </h1>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <div className="flex space-x-2">
                {["Goods", "Service", "Additional Service"].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleInputChange("type", type)}
                    className={`px-3 py-2 rounded text-sm font-medium ${
                      formData.type === type
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter Description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-right text-xs text-gray-500 mt-1">3000</div>
            </div>

            {/* Group and Category */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group
                </label>
                <select
                  value={formData.group}
                  onChange={(e) => handleInputChange("group", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">None of the list</option>
                  <option value="group1">Group 1</option>
                  <option value="group2">Group 2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">None of the list</option>
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                </select>
              </div>
            </div>

            {/* Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit<span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <select
                  value={formData.unit}
                  onChange={(e) => handleInputChange("unit", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Unit</option>
                  <option value="pcs">Pieces</option>
                  <option value="kg">Kilogram</option>
                </select>
                <button className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-sm text-blue-600 hover:bg-gray-200">
                  Multi Unit Config
                </button>
              </div>
            </div>

            {/* Manage Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manage stock <span className="text-blue-600">Config</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {["Normal", "Batch wise", "Lot wise"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleInputChange("manageStock", option)}
                    className={`px-3 py-2 rounded text-sm ${
                      formData.manageStock === option
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* SKU and Opening Stock */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU / Goods Code
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                  placeholder="Enter product or SKU here"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opening Stock Qty
                </label>
                <input
                  type="text"
                  value={formData.openingStockQty}
                  onChange={(e) =>
                    handleInputChange("openingStockQty", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Opening Stock Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opening Stock Value
              </label>
              <input
                type="text"
                value={formData.openingStockValue}
                onChange={(e) =>
                  handleInputChange("openingStockValue", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Radio Button Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Negative Qty Allowed{" "}
                  <BsQuestionCircle className="inline w-4 h-4 text-gray-400" />
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={formData.negativeQtyAllowed === true}
                      onChange={() =>
                        handleInputChange("negativeQtyAllowed", true)
                      }
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={formData.negativeQtyAllowed === false}
                      onChange={() =>
                        handleInputChange("negativeQtyAllowed", false)
                      }
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Low Stock Warning
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={formData.lowStockWarning === true}
                      onChange={() =>
                        handleInputChange("lowStockWarning", true)
                      }
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={formData.lowStockWarning === false}
                      onChange={() =>
                        handleInputChange("lowStockWarning", false)
                      }
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.showInPurchase}
                  onChange={(e) =>
                    handleInputChange("showInPurchase", e.target.checked)
                  }
                  className="mr-2"
                />
                Show Item In Purchase
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.showInSales}
                  onChange={(e) =>
                    handleInputChange("showInSales", e.target.checked)
                  }
                  className="mr-2"
                />
                Show Item In Sales
              </label>
            </div>

            {/* Price Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MRP
                </label>
                <input
                  type="text"
                  value={formData.mrp}
                  onChange={(e) => handleInputChange("mrp", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Price
                </label>
                <input
                  type="text"
                  value={formData.purchasePrice}
                  onChange={(e) =>
                    handleInputChange("purchasePrice", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sales Price
                </label>
                <input
                  type="text"
                  value={formData.salesPrice}
                  onChange={(e) =>
                    handleInputChange("salesPrice", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Cess and Status */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cess Enable
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={formData.cessEnable === true}
                      onChange={() => handleInputChange("cessEnable", true)}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={formData.cessEnable === false}
                      onChange={() => handleInputChange("cessEnable", false)}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status{" "}
                  <BsQuestionCircle className="inline w-4 h-4 text-gray-400" />
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={formData.status === "Active"}
                      onChange={() => handleInputChange("status", "Active")}
                      className="mr-2"
                    />
                    Active
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={formData.status === "Inactive"}
                      onChange={() => handleInputChange("status", "Inactive")}
                      className="mr-2"
                    />
                    Inactive
                  </label>
                </div>
              </div>
            </div>

            {/* Info Boxes */}
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start">
                <BsInfoCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-blue-900">
                    Start managing Barcode details for the products.{" "}
                  </span>
                  <button className="text-blue-600 hover:underline">
                    Click here for setting.
                  </button>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start">
                <BsInfoCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-blue-900">
                    Start managing Manufacturer details for the products.{" "}
                  </span>
                  <button className="text-blue-600 hover:underline">
                    Click here for setting.
                  </button>
                </div>
              </div>
            </div>

            {/* Shortcuts */}
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-700">
                <span className="font-medium">SHORTCUTS:</span>
                <div className="flex flex-col space-y-2 mt-2">
                  <span>
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">
                      CTRL
                    </kbd>{" "}
                    +{" "}
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">
                      ALT
                    </kbd>{" "}
                    +{" "}
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">
                      S
                    </kbd>{" "}
                    Save
                  </span>
                  <span>
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">
                      CTRL
                    </kbd>{" "}
                    +{" "}
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">
                      ALT
                    </kbd>{" "}
                    +{" "}
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">
                      C
                    </kbd>{" "}
                    Cancel
                  </span>
                  <span>
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">
                      ←
                    </kbd>{" "}
                    <kbd className="px-2 py-1 bg-white border rounded text-xs">
                      →
                    </kbd>{" "}
                    Left/Right Arrow{" "}
                    <BsQuestionCircle className="inline w-4 h-4 text-gray-400" />
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
