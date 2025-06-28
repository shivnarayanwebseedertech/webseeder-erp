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
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

export default function SalesReturnForm() {
  const [formData, setFormData] = useState({
    customer: "",
    creditNoteNo: "CN0001",
    creditNoteDate: "28-06-2025",
    specialNotes: "",
    autoRoundOff: true,
  })

  const [charCount, setCharCount] = useState(1000)

  const handleNotesChange = (e) => {
    const value = e.target.value
    const remaining = 1000 - value.length
    setCharCount(remaining)
    setFormData({ ...formData, specialNotes: value })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-800">
            <ChevronLeftIcon />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Create Sales Return (Cr. Note)</h1>
          <span className="text-gray-500">(CN0001)</span>
          <button className="text-gray-400 hover:text-gray-600">
            <StarIcon />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Customer Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Info.</h2>
          <div className="grid grid-cols-3 gap-6">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Credit Note No.</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.creditNoteNo}
                onChange={(e) => setFormData({ ...formData, creditNoteNo: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credit Note Date<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.creditNoteDate}
                  onChange={(e) => setFormData({ ...formData, creditNoteDate: e.target.value })}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <CalendarIcon />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Left Side - Table and Special Notes */}
          <div className="flex-1">
            {/* Items Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
              <div className="bg-blue-50 px-2 py-3 overflow-x-auto">
                <table className="w-full min-w-max">
                  <thead>
                    <tr className="text-xs font-medium text-gray-700">
                      <th className="px-1 py-1 text-center w-16">SR.NO.</th>
                      <th className="px-1 py-1 text-center w-32">GOODS/SERVICE</th>
                      <th className="px-1 py-1 text-center w-24">BATCH/LOT NO.</th>
                      <th className="px-1 py-1 text-center w-20">EXP. DATE</th>
                      <th className="px-1 py-1 text-center w-16">MRP</th>
                      <th className="px-1 py-1 text-center w-24">INVOICE NO.</th>
                      <th className="px-1 py-1 text-center w-24">INVOICE DATE</th>
                      <th className="px-1 py-1 text-center w-20">INVOICE QTY</th>
                      <th className="px-1 py-1 text-center w-16">QTY</th>
                      <th className="px-1 py-1 text-center w-28">RATE (₹) (EXCL. GST)</th>
                      <th className="px-1 py-1 text-center w-20">GST RATE(%)</th>
                      <th className="px-1 py-1 text-center w-16">CESS(%)</th>
                      <th className="px-1 py-1 text-center w-24">AMOUNT (₹)</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="p-8">
                <div className="text-center text-gray-500 py-8">You have not selected any customer!</div>
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <div className="flex justify-end items-center gap-8 text-sm">
                    <span className="font-medium">0.000</span>
                    <span className="font-medium">0.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Notes */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Special Notes</h3>
              <div className="relative">
                <textarea
                  placeholder="Write your special notes for this sales return."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={4}
                  value={formData.specialNotes}
                  onChange={handleNotesChange}
                />
                <div className="absolute bottom-2 right-2 text-sm text-blue-600 font-medium">{charCount}</div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-72">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Taxable Amt.</span>
                  <span className="text-sm font-medium">₹0.00</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">SGST</span>
                  <span className="text-sm font-medium">₹0.00</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">CGST</span>
                  <span className="text-sm font-medium">₹0.00</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-900">Sub Total</span>
                  <span className="text-sm font-medium">₹0.00</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="autoRoundOff"
                      checked={formData.autoRoundOff}
                      onChange={(e) => setFormData({ ...formData, autoRoundOff: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="autoRoundOff" className="text-sm text-gray-900">
                      Auto Round Off
                    </label>
                  </div>
                  <span className="text-sm font-medium">₹0.00</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-900">Total Amt.</span>
                  <span className="text-lg font-semibold">₹0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
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
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">C</kbd> Cancel
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
