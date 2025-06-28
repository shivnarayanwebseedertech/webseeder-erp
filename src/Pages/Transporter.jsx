import { useState, useCallback } from "react"
import { FaPlus } from "react-icons/fa"
import { FiX } from "react-icons/fi"
import { BsQuestionCircle } from "react-icons/bs"

export default function Transporter({ collapsed }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    transporterId: "",
    transporterName: "",
    vehicleNo: "",
    mode: "Road",
    vehicleType: "Regular",
    status: "Active",
  })

  const toggleForm = useCallback(() => setIsOpen((prev) => !prev), [])
  const closeForm = useCallback(() => {
    setIsOpen(false)
    // Reset form data
    setFormData({
      transporterId: "",
      transporterName: "",
      vehicleNo: "",
      mode: "Road",
      vehicleType: "Regular",
      status: "Active",
    })
  }, [])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    console.log("Saving transporter:", formData)
    closeForm()
    // Add save logic here
  }

  const drawerStyles = {
    marginLeft: collapsed ? "1.5rem" : "10.5rem",
    paddingTop: "2.5rem",
  }

  return (
    <div className="relative w-full h-screen bg-gray-100 transition-all duration-300" style={drawerStyles}>
      {/* Main Content */}
      <div className={`transition-all duration-300 ${isOpen ? "opacity-30" : "opacity-100"}`}>
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 w-full h-full">
          {/* Illustration */}
          <div className="w-64 h-64 bg-gradient-to-b from-green-100 to-green-600 rounded-full flex items-center justify-center relative">
            <div className="w-32 h-40 bg-white rounded-lg shadow-lg relative">
              <div className="w-full h-3 bg-green-600 rounded-t-lg"></div>
              <div className="p-3 space-y-2">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                <div className="h-2 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            <div className="absolute -right-2 top-8 w-24 h-32 bg-white rounded-lg shadow-lg">
              <div className="w-full h-2 bg-green-600 rounded-t-lg"></div>
              <div className="p-2 space-y-1">
                <div className="h-1 bg-gray-200 rounded"></div>
                <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                <div className="h-1 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900">Manage your transporter</h2>
          <p className="text-gray-500 max-w-md">Create transporter for delivery management.</p>

          <button
            onClick={toggleForm}
            className="inline-flex items-center bg-blue-600 text-white text-sm   px-6 py-3 rounded-md hover:bg-blue-700 font-medium"
          >
            <FaPlus className="mr-2" /> Create Transporter
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-20 z-40" onClick={closeForm} />}

      {/* Slide-in Form Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-2/5 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 rounded-l-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b bg-white rounded-tl-2xl">
            <h1 className="text-xl font-semibold flex items-center">
              New Transporter
              <BsQuestionCircle className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </h1>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSave} className="space-y-6">
              {/* Transporter ID */}
              <FormField
                label="Transporter Id (GST Number)"
                value={formData.transporterId}
                onChange={(value) => handleInputChange("transporterId", value)}
                placeholder="24XXXXXXXXXXXXZV"
              />

              {/* Transporter Name */}
              <FormField
                label="Transporter Name"
                value={formData.transporterName}
                onChange={(value) => handleInputChange("transporterName", value)}
                placeholder="Barry Tone"
                required
              />

              {/* Vehicle No and Mode */}
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  label="Vehicle No."
                  value={formData.vehicleNo}
                  onChange={(value) => handleInputChange("vehicleNo", value)}
                  placeholder="GJ XX XX 1234"
                />
                <SelectField
                  label="Mode"
                  value={formData.mode}
                  onChange={(value) => handleInputChange("mode", value)}
                  options={["Road", "Rail", "Air", "Ship"]}
                />
              </div>

              {/* Vehicle Type */}
              <SelectField
                label="Vehicle Type"
                value={formData.vehicleType}
                onChange={(value) => handleInputChange("vehicleType", value)}
                options={["Regular", "Over-dimensional"]}
              />

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="flex space-x-4">
                  {["Active", "Inactive"].map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={formData.status === status}
                        onChange={(e) => handleInputChange("status", e.target.value)}
                        className="mr-2"
                      />
                      {status}
                    </label>
                  ))}
                </div>
              </div>

              {/* Shortcuts */}
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-700">
                  <span className="font-medium">SHORTCUTS:</span>
                  <div className="flex flex-col space-y-2 mt-2">
                    <span>
                      <kbd className="px-2 py-1 bg-white border rounded text-xs">CTRL</kbd> +{" "}
                      <kbd className="px-2 py-1 bg-white border rounded text-xs">ALT</kbd> +{" "}
                      <kbd className="px-2 py-1 bg-white border rounded text-xs">S</kbd> Save
                    </span>
                    <span>
                      <kbd className="px-2 py-1 bg-white border rounded text-xs">CTRL</kbd> +{" "}
                      <kbd className="px-2 py-1 bg-white border rounded text-xs">ALT</kbd> +{" "}
                      <kbd className="px-2 py-1 bg-white border rounded text-xs">C</kbd> Cancel
                    </span>
                    <span>
                      <kbd className="px-2 py-1 bg-white border rounded text-xs">←</kbd>{" "}
                      <kbd className="px-2 py-1 bg-white border rounded text-xs">→</kbd> Left/Right Arrow{" "}
                      <BsQuestionCircle className="inline w-4 h-4 text-gray-400" />
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
            <button
              type="button"
              onClick={closeForm}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reusable form input component
function FormField({ label, required = false, placeholder = "", value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

// Reusable select input component
function SelectField({ label, options, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}
