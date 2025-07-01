import { useState, useEffect, useRef } from "react";

// Custom Icons
const ChevronLeftIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const StarIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const SearchIcon = () => (
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
);

const CalendarIcon = () => (
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
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

export default function SalesReturnForm() {
  // Form state
  const [formData, setFormData] = useState({
    customer: "",
    creditNoteNo: "CN0001",
    creditNoteDate: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
    specialNotes: "",
    autoRoundOff: true,
    items: [
      {
        id: 1,
        product: "",
        batch: "",
        expiry: "",
        mrp: "",
        invoiceNo: "",
        invoiceDate: "",
        invoiceQty: "",
        qty: "",
        rate: "",
        gstRate: "",
        cess: "",
        amount: 0,
      },
    ],
    taxableAmount: 0,
    sgst: 0,
    cgst: 0,
    subTotal: 0,
    roundOff: 0,
    totalAmount: 0,
  });

  const [charCount, setCharCount] = useState(1000);
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Acme Corporation" },
  ]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const tableContainerRef = useRef(null);

  // Initialize with today's date in DD-MM-YYYY format
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB").replace(/\//g, "-");
    setFormData((prev) => ({
      ...prev,
      creditNoteDate: formattedDate,
    }));
  }, []);

  // Update header when credit note number changes
  useEffect(() => {
    document.title = `Create Sales Return (${formData.creditNoteNo})`;
  }, [formData.creditNoteNo]);

  // Handle special notes change
  const handleNotesChange = (e) => {
    const value = e.target.value;
    const remaining = 1000 - value.length;
    setCharCount(remaining);
    setFormData({ ...formData, specialNotes: value });
  };

  // Handle customer search
  const handleCustomerSearch = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, customer: value });

    if (value) {
      const filtered = customers.filter((customer) =>
        customer.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCustomers(filtered);
      setShowCustomerDropdown(true);
    } else {
      setShowCustomerDropdown(false);
    }
  };

  // Select customer from dropdown
  const selectCustomer = (customer) => {
    setFormData({ ...formData, customer: customer.name });
    setShowCustomerDropdown(false);
  };

  // Handle item field change
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    // Calculate amount if quantity or rate changes
    if (field === "qty" || field === "rate") {
      const qty = parseFloat(updatedItems[index].qty) || 0;
      const rate = parseFloat(updatedItems[index].rate) || 0;
      updatedItems[index].amount = (qty * rate).toFixed(2);
    }

    setFormData({ ...formData, items: updatedItems });
  };

  // Add new item row
  const addItem = () => {
    const newItem = {
      id: formData.items.length + 1,
      product: "",
      batch: "",
      expiry: "",
      mrp: "",
      invoiceNo: "",
      invoiceDate: "",
      invoiceQty: "",
      qty: "",
      rate: "",
      gstRate: "",
      cess: "",
      amount: 0,
    };
    setFormData({ ...formData, items: [...formData.items, newItem] });
  };

  // Remove item row
  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const updatedItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: updatedItems });
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    let taxable = 0;
    let sgstTotal = 0;
    let cgstTotal = 0;

    formData.items.forEach((item) => {
      const amount = parseFloat(item.amount) || 0;
      const gstRate = parseFloat(item.gstRate) || 0;

      taxable += amount;

      // Split GST equally between SGST and CGST
      const gstAmount = amount * (gstRate / 100);
      sgstTotal += gstAmount / 2;
      cgstTotal += gstAmount / 2;
    });

    const subTotal = taxable + sgstTotal + cgstTotal;
    const roundOff = formData.autoRoundOff
      ? Math.round(subTotal) - subTotal
      : 0;
    const totalAmount = formData.autoRoundOff ? Math.round(subTotal) : subTotal;

    setFormData((prev) => ({
      ...prev,
      taxableAmount: taxable.toFixed(2),
      sgst: sgstTotal.toFixed(2),
      cgst: cgstTotal.toFixed(2),
      subTotal: subTotal.toFixed(2),
      roundOff: roundOff.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    }));
  };

  // Recalculate totals when items or autoRoundOff changes
  useEffect(() => {
    calculateTotals();
  }, [formData.items, formData.autoRoundOff]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-800">
            <ChevronLeftIcon />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            Create Sales Return (Cr. Note)
          </h1>
          <span className="text-gray-500">({formData.creditNoteNo})</span>
          <button className="text-gray-400 hover:text-gray-600">
            <StarIcon />
          </button>
        </div>
      </div>

      <div className="mt-[-1.5rem] p-4 sm:p-6">
        {/* Customer Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Customer Info.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search customer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.customer}
                  onChange={handleCustomerSearch}
                  onFocus={() => setShowCustomerDropdown(!!formData.customer)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                {showCustomerDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                        <div
                          key={customer.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => selectCustomer(customer)}
                        >
                          {customer.name}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">
                        No customers found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credit Note No.
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.creditNoteNo}
                onChange={(e) =>
                  setFormData({ ...formData, creditNoteNo: e.target.value })
                }
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
                  onChange={(e) =>
                    setFormData({ ...formData, creditNoteDate: e.target.value })
                  }
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <CalendarIcon />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Table and Special Notes */}
          <div className="flex-1">
            {/* Items Table */}
            <div className="bg-white rounded-lg border border-gray-200 mb-6">
              <div
                className="max-w-full overflow-x-auto"
                ref={tableContainerRef}
              >
                <table className="min-w-[200px] w-full">
                  <thead>
                    <tr className="text-xs font-medium text-gray-700">
                      <th className="px-1 py-1 text-center w-16 sticky left-0 bg-blue-50 z-10">
                        SR.NO.
                      </th>
                      <th className="px-1 py-1 text-center min-w-[150px]">
                        GOODS/SERVICE
                      </th>
                      <th className="px-1 py-1 text-center min-w-[120px]">
                        BATCH/LOT NO.
                      </th>
                      <th className="px-1 py-1 text-center min-w-[100px]">
                        EXP. DATE
                      </th>
                      <th className="px-1 py-1 text-center min-w-[80px]">
                        MRP
                      </th>
                      <th className="px-1 py-1 text-center min-w-[120px]">
                        INVOICE NO.
                      </th>
                      <th className="px-1 py-1 text-center min-w-[120px]">
                        INVOICE DATE
                      </th>
                      <th className="px-1 py-1 text-center min-w-[100px]">
                        INVOICE QTY
                      </th>
                      <th className="px-1 py-1 text-center min-w-[80px]">
                        QTY
                      </th>
                      <th className="px-1 py-1 text-center min-w-[150px]">
                        RATE (₹) (EXCL. GST)
                      </th>
                      <th className="px-1 py-1 text-center min-w-[100px]">
                        GST RATE(%)
                      </th>
                      <th className="px-1 py-1 text-center min-w-[80px]">
                        CESS(%)
                      </th>
                      <th className="px-1 py-1 text-center min-w-[120px]">
                        AMOUNT (₹)
                      </th>
                      <th className="px-1 py-1 text-center min-w-[60px] sticky right-0 bg-white z-10">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, index) => (
                      <tr key={item.id} className="border-t border-gray-200">
                        <td className="px-1 py-2 text-center sticky left-0 bg-white z-10">
                          {index + 1}
                        </td>
                        <td className="px-1 py-2">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            value={item.product}
                            onChange={(e) =>
                              handleItemChange(index, "product", e.target.value)
                            }
                          />
                        </td>
                        <td className="px-1 py-2">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            value={item.batch}
                            onChange={(e) =>
                              handleItemChange(index, "batch", e.target.value)
                            }
                          />
                        </td>
                        <td className="px-1 py-2">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            value={item.expiry}
                            onChange={(e) =>
                              handleItemChange(index, "expiry", e.target.value)
                            }
                          />
                        </td>
                        <td className="px-1 py-2">
                          <input
                            type="number"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            value={item.mrp}
                            onChange={(e) =>
                              handleItemChange(index, "mrp", e.target.value)
                            }
                          />
                        </td>
                        <td className="px-1 py-2">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            value={item.invoiceNo}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "invoiceNo",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="px-1 py-2">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            value={item.invoiceDate}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "invoiceDate",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="px-1 py-2">
                          <input
                            type="number"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            value={item.invoiceQty}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "invoiceQty",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="px-1 py-2">
                          <input
                            type="number"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            value={item.qty}
                            onChange={(e) =>
                              handleItemChange(index, "qty", e.target.value)
                            }
                          />
                        </td>
                        <td className="px-1 py-2">
                          <input
                            type="number"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            value={item.rate}
                            onChange={(e) =>
                              handleItemChange(index, "rate", e.target.value)
                            }
                            step="0.01"
                          />
                        </td>
                        <td className="px-1 py-2">
                          <input
                            type="number"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            value={item.gstRate}
                            onChange={(e) =>
                              handleItemChange(index, "gstRate", e.target.value)
                            }
                          />
                        </td>
                        <td className="px-1 py-2">
                          <input
                            type="number"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            value={item.cess}
                            onChange={(e) =>
                              handleItemChange(index, "cess", e.target.value)
                            }
                          />
                        </td>
                        <td className="px-1 py-2 text-center font-medium">
                          ₹{item.amount || "0.00"}
                        </td>
                        <td className="px-1 py-2 text-center sticky right-0 bg-white z-10">
                          <button
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700 disabled:opacity-50"
                            disabled={formData.items.length === 1}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4">
                <button
                  onClick={addItem}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-blue-600 hover:bg-gray-50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Item
                </button>
              </div>
            </div>

            {/* Special Notes */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Special Notes
              </h3>
              <div className="relative">
                <textarea
                  placeholder="Write your special notes for this sales return."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={4}
                  value={formData.specialNotes}
                  onChange={handleNotesChange}
                />
                <div className="absolute bottom-2 right-2 text-sm text-blue-600 font-medium">
                  {charCount}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-72">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    Taxable Amt.
                  </span>
                  <span className="text-sm font-medium">
                    ₹{formData.taxableAmount}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    SGST
                  </span>
                  <span className="text-sm font-medium">₹{formData.sgst}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    CGST
                  </span>
                  <span className="text-sm font-medium">₹{formData.cgst}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-900">
                    Sub Total
                  </span>
                  <span className="text-sm font-medium">
                    ₹{formData.subTotal}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="autoRoundOff"
                      checked={formData.autoRoundOff}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          autoRoundOff: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="autoRoundOff"
                      className="text-sm text-gray-900"
                    >
                      Auto Round Off
                    </label>
                  </div>
                  <span className="text-sm font-medium">
                    ₹{formData.roundOff}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-900">
                    Total Amt.
                  </span>
                  <span className="text-lg font-semibold">
                    ₹{formData.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between mt-8 pt-6 border-t border-gray-200 gap-4">
          <button className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto">
            Cancel
          </button>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button className="px-6 py-2 text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto">
              Save
            </button>
            <button className="px-6 py-2 text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto">
              Save & Next
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
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">N</kbd> Save &
              Next
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">ALT</kbd> +{" "}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">P</kbd> Save &
              Print
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">ALT</kbd> +{" "}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">D</kbd> Discard
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">ALT</kbd> +{" "}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">C</kbd> Cancel
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">ALT</kbd> +{" "}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">A</kbd> Add Item
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
