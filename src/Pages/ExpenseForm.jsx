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

export default function ExpenseForm() {
  const [formData, setFormData] = useState({
    vendor: "",
    voucherNo: "EXP0001",
    date: "28-06-2025",
    gstin: "24XXXXXXXXXXXXXXJ",
    mobileNo: "99XXXXXX01",
    email: "example@domain.com",
    billNo: "EB00",
    billDate: "28-06-2025",
    paymentMethod: "N/A",
    specialNotes: "",
    autoRoundOff: true,
  })

  const [expenseRows, setExpenseRows] = useState([
    {
      id: 1,
      natureOfExpense: "",
      description: "",
      taxableAmount: "0.00",
      amount: "",
    },
  ])

  const [notesCharCount, setNotesCharCount] = useState(1000)
  const [descriptionCharCounts, setDescriptionCharCounts] = useState({ 1: 3000 })

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleNotesChange = (e) => {
    const value = e.target.value
    const remaining = 1000 - value.length
    setNotesCharCount(remaining)
    setFormData({ ...formData, specialNotes: value })
  }

  const handleExpenseRowChange = (id, field, value) => {
    setExpenseRows(expenseRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)))

    if (field === "description") {
      const remaining = 3000 - value.length
      setDescriptionCharCounts({ ...descriptionCharCounts, [id]: remaining })
    }
  }

  const addExpenseRow = () => {
    const newId = Math.max(...expenseRows.map((row) => row.id)) + 1
    setExpenseRows([
      ...expenseRows,
      {
        id: newId,
        natureOfExpense: "",
        description: "",
        taxableAmount: "0.00",
        amount: "",
      },
    ])
    setDescriptionCharCounts({ ...descriptionCharCounts, [newId]: 3000 })
  }

  const calculateSubtotal = () => {
    return expenseRows.reduce((sum, row) => sum + (Number.parseFloat(row.amount) || 0), 0).toFixed(2)
  }

  return (
    <div className="min-h-screen mt-[-1rem] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-800">
            <ChevronLeftIcon />
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Create Expense</h1>
          <span className="text-gray-500">(EXP0001)</span>
          <button className="text-gray-400 hover:text-gray-600">
            <StarIcon />
          </button>
        </div>
      </div>

      <div className="max-w-8xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Form - Left Side */}
          <div className="flex-1 space-y-6">
            {/* Vendor Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Vendor info.</h2>

              {/* First Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vendor<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      value={formData.vendor}
                      onChange={(e) => handleFormChange("vendor", e.target.value)}
                    >
                      <option value="">Please select vendor</option>
                      <option value="vendor1">Vendor 1</option>
                      <option value="vendor2">Vendor 2</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ChevronDownIcon />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Voucher No.</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.voucherNo}
                    onChange={(e) => handleFormChange("voucherNo", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.date}
                      onChange={(e) => handleFormChange("date", e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <CalendarIcon />
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GSTIN</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.gstin}
                    onChange={(e) => handleFormChange("gstin", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No.</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.mobileNo}
                    onChange={(e) => handleFormChange("mobileNo", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                  />
                </div>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill No.</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.billNo}
                    onChange={(e) => handleFormChange("billNo", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.billDate}
                      onChange={(e) => handleFormChange("billDate", e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <CalendarIcon />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <div className="relative">
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      value={formData.paymentMethod}
                      onChange={(e) => handleFormChange("paymentMethod", e.target.value)}
                    >
                      <option value="N/A">N/A</option>
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                      <option value="bank">Bank Transfer</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ChevronDownIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expense Items Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 overflow-x-auto">
                <div className="min-w-full">
                  <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-700">
                    <div className="col-span-1">SR.NO.</div>
                    <div className="col-span-3">NATURE OF EXPENSE</div>
                    <div className="col-span-4">DESCRIPTION</div>
                    <div className="col-span-2">TAXABLE AMT. (₹)</div>
                    <div className="col-span-2">AMOUNT (₹)</div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                {expenseRows.map((row, index) => (
                  <div key={row.id} className="grid grid-cols-12 gap-2 items-start mb-4">
                    <div className="col-span-1">
                      <span className="text-sm text-gray-600 mt-2 block">{index + 1}</span>
                    </div>
                    <div className="col-span-3">
                      <div className="relative">
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none text-sm"
                          value={row.natureOfExpense}
                          onChange={(e) => handleExpenseRowChange(row.id, "natureOfExpense", e.target.value)}
                        >
                          <option value="">Please select nature of expense</option>
                          <option value="travel">Travel</option>
                          <option value="office">Office Supplies</option>
                          <option value="meals">Meals</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ChevronDownIcon />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="relative">
                        <textarea
                          placeholder="What did you pay for?"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                          rows={2}
                          value={row.description}
                          onChange={(e) => handleExpenseRowChange(row.id, "description", e.target.value)}
                        />
                        <div className="absolute bottom-1 right-2 text-xs text-blue-600 font-medium">
                          {descriptionCharCounts[row.id] || 3000}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        value={row.taxableAmount}
                        onChange={(e) => handleExpenseRowChange(row.id, "taxableAmount", e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        value={row.amount}
                        onChange={(e) => handleExpenseRowChange(row.id, "amount", e.target.value)}
                      />
                    </div>
                  </div>
                ))}

                <div className="mt-4">
                  <button
                    onClick={addExpenseRow}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <PlusIcon />
                    Add Row
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-12 gap-2 text-sm">
                    <div className="col-span-8"></div>
                    <div className="col-span-2 font-medium">Subtotal</div>
                    <div className="col-span-2 text-right">{calculateSubtotal()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Notes */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Special Notes</h3>
              <div className="relative">
                <textarea
                  placeholder="Write your special notes for this expense."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={4}
                  value={formData.specialNotes}
                  onChange={handleNotesChange}
                />
                <div className="absolute bottom-2 right-2 text-sm text-blue-600 font-medium">{notesCharCount}</div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-80">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Taxable Amt.</span>
                  <span className="text-sm font-medium">₹{calculateSubtotal()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Sub Total</span>
                  <span className="text-sm font-medium">₹{calculateSubtotal()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="autoRoundOff"
                      checked={formData.autoRoundOff}
                      onChange={(e) => handleFormChange("autoRoundOff", e.target.checked)}
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
                  <span className="text-lg font-semibold">₹{calculateSubtotal()}</span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <PaperclipIcon />
                    <span>No File Chosen</span>
                  </div>
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
