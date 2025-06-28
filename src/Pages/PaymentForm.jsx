import { useState, useRef } from "react"

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

const PaperclipIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
    />
  </svg>
)

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    voucherNo: "P0001",
    account: "",
    email: "example@domain.com",
    amountPaid: "0.00",
    paymentDate: "28-06-2025",
    mode: "Cheque",
    referenceNo: "ADV012",
    paidFrom: "",
    amountPaidInput: "0.00",
    findBillNo: "",
    billFromDate: "",
    billToDate: "",
    narration: "",
  })

  const [narrationCharCount, setNarrationCharCount] = useState(1000)
  const [uploadedFile, setUploadedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleNarrationChange = (e) => {
    const value = e.target.value
    const remaining = 1000 - value.length
    setNarrationCharCount(remaining)
    setFormData({ ...formData, narration: value })
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleSearch = () => {
    console.log("Searching transactions...")
  }

  const handleReset = () => {
    setFormData({
      ...formData,
      findBillNo: "",
      billFromDate: "",
      billToDate: "",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-800">
            <ChevronLeftIcon />
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Create Payment</h1>
          <span className="text-gray-500">(P0001)</span>
          <button className="text-gray-400 hover:text-gray-600">
            <StarIcon />
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-4 sm:p-6">
        {/* Main Form Fields */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6">
          {/* First Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Voucher No.</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                value={formData.voucherNo}
                onChange={(e) => handleFormChange("voucherNo", e.target.value)}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  value={formData.account}
                  onChange={(e) => handleFormChange("account", e.target.value)}
                >
                  <option value="">Please select account</option>
                  <option value="account1">Account 1</option>
                  <option value="account2">Account 2</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid</label>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">₹</span>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  value={formData.amountPaid}
                  onChange={(e) => handleFormChange("amountPaid", e.target.value)}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Date<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.paymentDate}
                  onChange={(e) => handleFormChange("paymentDate", e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <CalendarIcon />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mode<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  value={formData.mode}
                  onChange={(e) => handleFormChange("mode", e.target.value)}
                >
                  <option value="Cheque">Cheque</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Card">Card</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reference No.</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.referenceNo}
                onChange={(e) => handleFormChange("referenceNo", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Paid From<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  value={formData.paidFrom}
                  onChange={(e) => handleFormChange("paidFrom", e.target.value)}
                >
                  <option value="">Please select bank</option>
                  <option value="bank1">Bank 1</option>
                  <option value="bank2">Bank 2</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount Paid (₹)<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.amountPaidInput}
                onChange={(e) => handleFormChange("amountPaidInput", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Outstanding Transactions */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Outstanding Transactions</h2>

          {/* Search Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Find Bill No.</label>
              <input
                type="text"
                placeholder="Find Bill No."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.findBillNo}
                onChange={(e) => handleFormChange("findBillNo", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bill From Date</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.billFromDate}
                  onChange={(e) => handleFormChange("billFromDate", e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <CalendarIcon />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.billToDate}
                  onChange={(e) => handleFormChange("billToDate", e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <CalendarIcon />
                </div>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <SearchIcon />
                Search
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Reset
              </button>
              <div className="ml-auto">
                <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">Overdue status</span>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Table Header */}
              <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
                <div className="grid grid-cols-7 gap-4 text-sm font-medium text-gray-700">
                  <div className="col-span-2">DESCRIPTION</div>
                  <div>BILL DATE</div>
                  <div>DUE DATE</div>
                  <div>ORIGINAL AMOUNT (₹)</div>
                  <div>DUE AMOUNT (₹)</div>
                  <div>PAYMENT (₹)</div>
                  <div>DISCOUNT AMOUNT (₹)</div>
                </div>
              </div>

              {/* Table Content */}
              <div className="p-8 text-center text-gray-500 bg-white border-b border-gray-200">
                <p>Please select vendor!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Narration */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Narration</h3>
              <div className="relative">
                <textarea
                  placeholder="Write your narration for this payment."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={6}
                  value={formData.narration}
                  onChange={handleNarrationChange}
                />
                <div className="absolute bottom-2 right-2 text-sm text-blue-600 font-medium">{narrationCharCount}</div>
              </div>
              <div className="mt-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <button
                  onClick={handleFileClick}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  <PaperclipIcon />
                  <span>{uploadedFile ? uploadedFile.name : "No File Chosen"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Summary */}
          <div className="w-full lg:w-80">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">AMOUNT TO APPLY</span>
                  <span className="text-sm font-medium">₹0.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">AMOUNT TO CREDIT</span>
                  <span className="text-sm font-medium">₹0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-gray-200 gap-4">
          <button className="w-full sm:w-auto px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Cancel
          </button>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-2 text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Save & Next
            </button>
            <button className="w-full sm:w-auto px-6 py-2 text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Save
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-gray-500">
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
