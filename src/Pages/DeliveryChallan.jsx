import { useState } from "react"

// Custom Icons
const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

export default function DeliveryChallan() {
  const [formData, setFormData] = useState({
    customer: "",
    mobile: "99XXXXXX01",
    email: "example@domain.com",
    challanPrefix: "DC",
    challanNumber: "0001",
    challanSuffix: "",
    challanDate: "28-06-2025",
    specialNotes: "",
    description: "",
  })

  const [notesCharCount, setNotesCharCount] = useState(1000)
  const [descCharCount, setDescCharCount] = useState(3000)

  const handleNotesChange = (e) => {
    const value = e.target.value
    const remaining = 1000 - value.length
    setNotesCharCount(remaining)
    setFormData({ ...formData, specialNotes: value })
  }

  const handleDescriptionChange = (e) => {
    const value = e.target.value
    const remaining = 3000 - value.length
    setDescCharCount(remaining)
    setFormData({ ...formData, description: value })
  }

  return (
    <div className="min-h-screen mt-[-1.5rem] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex ml-2 items-center gap-4">
          <button className="text-gray-600 hover:text-gray-800">
            <ChevronLeftIcon />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Create Delivery Challan</h1>
          <span className="text-gray-500">(DC0001)</span>
          <button className="text-gray-400 hover:text-gray-600">
            <StarIcon />
          </button>
        </div>
      </div>

      <div className="max-w-8xl ml-6 p-0">
        {/* Customer Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Info.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Please select customer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.customer}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No.</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Challan Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Challan No.<span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <input
                  type="text"
                  className="w-16 px-2 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.challanPrefix}
                  onChange={(e) => setFormData({ ...formData, challanPrefix: e.target.value })}
                />
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.challanNumber}
                  onChange={(e) => setFormData({ ...formData, challanNumber: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Suffix"
                  className="w-20 px-2 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.challanSuffix}
                  onChange={(e) => setFormData({ ...formData, challanSuffix: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Challan Date<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.challanDate}
                  onChange={(e) => setFormData({ ...formData, challanDate: e.target.value })}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <CalendarIcon />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
          <div className="bg-blue-50 px-4 py-3">
            <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-700">
              <div className="col-span-1">SR.NO.</div>
              <div className="col-span-1">QUOTATION NO.</div>
              <div className="col-span-2">GOODS/SERVICE</div>
              <div className="col-span-3">DESCRIPTION</div>
              <div className="col-span-1">BATCH/LOT NO.</div>
              <div className="col-span-1">EXP. DATE</div>
              <div className="col-span-1">MRP</div>
              <div className="col-span-1">QTY</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-12 gap-2 items-start">
              <div className="col-span-1">
                <span className="text-sm text-gray-600 mt-2 block">1</span>
              </div>
              <div className="col-span-1">
                <input
                  type="text"
                  className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div className="col-span-2">
                <div className="relative">
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none text-sm">
                    <option>Please select goods/service</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="relative">
                  <textarea
                    placeholder="Add a description to your item"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                    rows={2}
                    value={formData.description}
                    onChange={handleDescriptionChange}
                  />
                  <div className="absolute bottom-1 right-2 text-xs text-blue-600 font-medium">{descCharCount}</div>
                </div>
              </div>
              <div className="col-span-1">
                <input
                  type="text"
                  value="N/A"
                  className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  readOnly
                />
              </div>
              <div className="col-span-1">
                <input
                  type="text"
                  className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div className="col-span-1">
                <input
                  type="text"
                  value="0.00"
                  className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  readOnly
                />
              </div>
              <div className="col-span-1">
                <input
                  type="number"
                  className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
            <div className="mt-4">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                <PlusIcon />
                Add Row
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-12 gap-2 text-sm">
                <div className="col-span-8"></div>
                <div className="col-span-2 font-medium">Subtotal</div>
                <div className="col-span-2 text-right">0.000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Notes */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Special Notes</h3>
          <div className="relative">
            <textarea
              placeholder="Write your special notes for this delivery challan."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={4}
              value={formData.specialNotes}
              onChange={handleNotesChange}
            />
            <div className="absolute bottom-2 right-2 text-sm text-blue-600 font-medium">{notesCharCount}</div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Cancel
          </button>
          <div className="flex gap-3">
            <button className="px-6 py-2 text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Save & Next
            </button>
            <button className="px-6 py-2 text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Save
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <span>
              <strong>SHORTCUTS:</strong>
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">ALT</kbd> +{" "}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">S</kbd> Save
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">ALT</kbd> +{" "}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">N</kbd> Save & Next
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">ALT</kbd> +{" "}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">P</kbd> Save & Print
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">ALT</kbd> +{" "}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">D</kbd> Discard
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">ALT</kbd> +{" "}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">A</kbd> Add New Row
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">ALT</kbd> +{" "}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">R</kbd> Remove Row
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">ALT</kbd> +{" "}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">C</kbd> Cancel
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
