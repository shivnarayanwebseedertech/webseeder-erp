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

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

export default function QuotationForm() {
  const [formData, setFormData] = useState({
    customer: "",
    mobile: "99XXXXXX01",
    email: "example@domain.com",
    quotationPrefix: "Q",
    quotationNumber: "0001",
    quotationSuffix: "",
    quotationDate: "27-06-2025",
    validTill: "",
    specialNotes: "",
    autoRoundOff: true,
  })

  const [charCount, setCharCount] = useState(1000)
  const [items, setItems] = useState([
    { id: 1, goods: "", quantity: 1, rate: 0, amount: 0 }
  ])
  const [charges, setCharges] = useState([])
  const [discountType, setDiscountType] = useState('%')
  const [discountValue, setDiscountValue] = useState(0)

  const handleNotesChange = (e) => {
    const value = e.target.value
    const remaining = 1000 - value.length
    setCharCount(remaining)
    setFormData({ ...formData, specialNotes: value })
  }

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      goods: "",
      quantity: 1,
      rate: 0,
      amount: 0
    }
    setItems([...items, newItem])
  }

  const removeItem = (id) => {
    if (items.length <= 1) return
    setItems(items.filter(item => item.id !== id))
  }

  const updateItem = (id, field, value) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }
        
        // Calculate amount if rate or quantity changes
        if (field === 'rate' || field === 'quantity') {
          updatedItem.amount = Number(updatedItem.rate) * Number(updatedItem.quantity)
        }
        
        return updatedItem
      }
      return item
    })
    setItems(updatedItems)
  }

  const addCharge = () => {
    const newCharge = {
      id: Date.now(),
      type: "",
      value: 0
    }
    setCharges([...charges, newCharge])
  }

  const removeCharge = (id) => {
    setCharges(charges.filter(charge => charge.id !== id))
  }

  const updateCharge = (id, value) => {
    setCharges(charges.map(charge => 
      charge.id === id ? { ...charge, value: Number(value) } : charge
    ))
  }

  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  
  // Calculate charges total
  const chargesTotal = charges.reduce((sum, charge) => sum + charge.value, 0)
  
  // Calculate discount amount
  const discountAmount = discountType === '%' 
    ? subtotal * (discountValue / 100)
    : Number(discountValue)
  
  // Calculate total
  const total = subtotal + chargesTotal - discountAmount

  return (
    <div className="min-h-screen mt-[-1rem] bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex ml-4 items-center gap-4">
          <button className="text-gray-600  hover:text-gray-800">
            <ChevronLeftIcon />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Create Quotation</h1>
          <span className="text-gray-500">(Q0001)</span>
          <button className="text-gray-400 hover:text-gray-600">
            <StarIcon />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow ml-6 p-2 md:p-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-8xl">
          {/* Main Form - Left Side */}
          <div className="lg:col-span-2 ">
            {/* Customer Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
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

              {/* Quotation Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quotation No.<span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      className="w-16 px-2 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.quotationPrefix}
                      onChange={(e) => setFormData({ ...formData, quotationPrefix: e.target.value })}
                    />
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.quotationNumber}
                      onChange={(e) => setFormData({ ...formData, quotationNumber: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Suffix"
                      className="w-20 px-2 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.quotationSuffix}
                      onChange={(e) => setFormData({ ...formData, quotationSuffix: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quotation Date<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.quotationDate}
                      onChange={(e) => setFormData({ ...formData, quotationDate: e.target.value })}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <CalendarIcon />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid Till</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="DD-MM-YYYY"
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.validTill}
                      onChange={(e) => setFormData({ ...formData, validTill: e.target.value })}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <CalendarIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-blue-50 px-4 py-3">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                  <div className="col-span-1">SR. NO.</div>
                  <div className="col-span-5">GOODS/SERVICE</div>
                  <div className="col-span-1">QTY</div>
                  <div className="col-span-2">RATE (₹) (EXCL. GST)</div>
                  <div className="col-span-2">AMOUNT (₹)</div>
                  <div className="col-span-1"></div>
                </div>
              </div>
              <div className="p-4">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-center mb-4">
                    <div className="col-span-1">
                      <span className="text-sm text-gray-600">{item.id}</span>
                    </div>
                    <div className="col-span-5">
                      <div className="relative">
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                          value={item.goods}
                          onChange={(e) => updateItem(item.id, 'goods', e.target.value)}
                        >
                          <option value="">Please select goods/service</option>
                          <option value="Product A">Product A</option>
                          <option value="Product B">Product B</option>
                          <option value="Service X">Service X</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ChevronDownIcon />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <input
                        type="number"
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={item.amount.toFixed(2)}
                      />
                    </div>
                    <div className="col-span-1">
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeItem(item.id)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <button 
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                    onClick={addItem}
                  >
                    <PlusIcon />
                    Add Row
                  </button>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-12 gap-4 text-sm">
                    <div className="col-span-6"></div>
                    <div className="col-span-2 font-medium">Subtotal</div>
                    <div className="col-span-2 text-right">₹{subtotal.toFixed(2)}</div>
                    <div className="col-span-2 text-right">₹{subtotal.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Notes */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Special Notes</h3>
              <div className="relative">
                <textarea
                  placeholder="Write your special notes for this quotation."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={4}
                  value={formData.specialNotes}
                  onChange={handleNotesChange}
                  maxLength={1000}
                />
                <div className="absolute bottom-2 right-2 text-sm text-blue-600 font-medium">{charCount}</div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Taxable Amt.</h3>
                  <button 
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                    onClick={addCharge}
                  >
                    <PlusIcon />
                    Add service charge with tax
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Sub Total</span>
                    <span className="text-sm font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {charges.map(charge => (
                    <div key={charge.id} className="flex items-center gap-2 mb-2">
                      <div className="relative flex-1">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none text-sm">
                          <option>Service Charge</option>
                          <option>Tax</option>
                          <option>Shipping</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <ChevronDownIcon />
                        </div>
                      </div>
                      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        <PlusIcon />
                      </button>
                      <div className="flex items-center">
                        <span className="text-sm">₹</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={charge.value}
                          onChange={(e) => updateCharge(charge.id, e.target.value)}
                          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none"
                        />
                      </div>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeCharge(charge.id)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                  
                  <button 
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mt-2"
                    onClick={addCharge}
                  >
                    <PlusIcon />
                    Add Another Charge
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Discount</span>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <select 
                          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none text-sm"
                          value={discountType}
                          onChange={(e) => setDiscountType(e.target.value)}
                        >
                          <option value="%">%</option>
                          <option value="₹">₹</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                          <ChevronDownIcon />
                        </div>
                      </div>
                      <input
                        type="number"
                        min="0"
                        step={discountType === '%' ? "1" : "0.01"}
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    Disc. amt: ₹{discountAmount.toFixed(2)}
                  </div>
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
                  <span className="text-lg font-semibold">₹{total.toFixed(2)}</span>
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