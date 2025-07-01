import { useState, useCallback, useEffect, useRef } from "react";
import {
  IoArrowBack,
  IoStar,
  IoAdd,
  IoTrash,
  IoCloudUpload,
  IoClose,
  IoPersonOutline,
  IoDocumentTextOutline,
  IoCalculatorOutline,
} from "react-icons/io5";

const CreateNewSalesInvoice = ({
  onSave,
  onSaveAndNext,
  onCancel,
  initialData = {},
  customers = [],
  products = [],
  bookNames = [],
}) => {
  // Form state management
  const [formData, setFormData] = useState(() => {
    const data = {
      customer: initialData.customer || "",
      seriesName: initialData.seriesName || "Sales Invoice",
      invoiceNumber: initialData.invoiceNumber || "0001",
      invoiceDate: initialData.invoiceDate || new Date().toISOString().split("T")[0],
      bookName: initialData.bookName || "",
      items: initialData.items || [{ id: 1, product: "", quantity: "", rate: "", amount: 0 }],
      specialNotes: initialData.specialNotes || "",
      attachedDocuments: initialData.attachedDocuments || [],
      isPaymentReceived: initialData.isPaymentReceived || false,
      wantAdditionalDetails: initialData.wantAdditionalDetails || false,
      serviceCharges: initialData.serviceCharges || [],
      additionalCharges: initialData.additionalCharges || [],
      discountType: initialData.discountType || "%",
      discountValue: initialData.discountValue || "0",
      autoRoundOff: initialData.autoRoundOff || false,
      ...initialData,
    };
    
    // Convert amounts to numbers
    data.items = data.items.map(item => ({
      ...item,
      amount: typeof item.amount === 'string' ? parseFloat(item.amount) || 0 : item.amount
    }));
    
    return data;
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handlersRef = useRef({});

  // Calculate totals
  const calculateTotals = useCallback(() => {
    const subtotal = formData.items.reduce((sum, item) => {
      const quantity = parseFloat(item.quantity || 0);
      const rate = parseFloat(item.rate || 0);
      return sum + (quantity * rate);
    }, 0);

    const serviceChargesTotal = formData.serviceCharges.reduce((sum, charge) => {
      return sum + (parseFloat(charge.amount || 0));
    }, 0);

    const additionalChargesTotal = formData.additionalCharges.reduce((sum, charge) => {
      return sum + (parseFloat(charge.amount || 0));
    }, 0);

    const taxableAmount = subtotal + serviceChargesTotal + additionalChargesTotal;

    const discountValue = parseFloat(formData.discountValue || 0);
    const discountAmount = formData.discountType === "%"
      ? taxableAmount * discountValue / 100
      : discountValue;

    const totalBeforeRounding = taxableAmount - discountAmount;
    const totalAmount = formData.autoRoundOff 
      ? Math.round(totalBeforeRounding) 
      : totalBeforeRounding;

    return {
      subtotal: subtotal.toFixed(2),
      taxableAmount: taxableAmount.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    };
  }, [formData]);

  const totals = calculateTotals();

  // Update form data
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Handle item changes
  const updateItem = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    if (field === "quantity" || field === "rate") {
      const quantity = parseFloat(updatedItems[index].quantity || 0);
      const rate = parseFloat(updatedItems[index].rate || 0);
      updatedItems[index].amount = quantity * rate;
    }

    updateFormData("items", updatedItems);
  };

  // Add new item row
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      product: "",
      quantity: "",
      rate: "",
      amount: 0,
    };
    updateFormData("items", [...formData.items, newItem]);
  };

  // Remove item row
  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const updatedItems = formData.items.filter((_, i) => i !== index);
      updateFormData("items", updatedItems);
    }
  };

  // Update charge
  const updateCharge = (type, index, field, value) => {
    const updatedCharges = [...formData[type]];
    updatedCharges[index] = { ...updatedCharges[index], [field]: value };
    updateFormData(type, updatedCharges);
  };

  // Add service charge
  const addServiceCharge = () => {
    const newCharge = { id: Date.now(), name: "", amount: "0", withTax: true };
    updateFormData("serviceCharges", [...formData.serviceCharges, newCharge]);
  };

  // Remove service charge
  const removeServiceCharge = (index) => {
    const updatedCharges = formData.serviceCharges.filter((_, i) => i !== index);
    updateFormData("serviceCharges", updatedCharges);
  };

  // Add additional charge
  const addAdditionalCharge = () => {
    const newCharge = { id: Date.now(), name: "", amount: "0" };
    updateFormData("additionalCharges", [...formData.additionalCharges, newCharge]);
  };

  // Remove additional charge
  const removeAdditionalCharge = (index) => {
    const updatedCharges = formData.additionalCharges.filter((_, i) => i !== index);
    updateFormData("additionalCharges", updatedCharges);
  };

  // File upload handler
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSize = 2 * 1024 * 1024; // 2MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    updateFormData("attachedDocuments", [...formData.attachedDocuments, ...validFiles]);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.customer) newErrors.customer = "Customer is required";
    if (!formData.invoiceNumber) newErrors.invoiceNumber = "Invoice number is required";
    if (!formData.invoiceDate) newErrors.invoiceDate = "Invoice date is required";

    formData.items.forEach((item, index) => {
      if (!item.product) newErrors[`item_${index}_product`] = "Product is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (action = "save") => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const invoiceData = {
        ...formData,
        totals,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (action === "saveAndNext" && onSaveAndNext) {
        await onSaveAndNext(invoiceData);
      } else if (onSave) {
        await onSave(invoiceData);
      }
    } catch (error) {
      console.error("Error saving invoice:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    handlersRef.current = { handleSubmit, onCancel, addItem };
  }, [handleSubmit, onCancel, addItem]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip if focused on input/textarea/select
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        return;
      }

      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault();
            handlersRef.current.handleSubmit('save');
            break;
          case 'n':
            e.preventDefault();
            handlersRef.current.handleSubmit('saveAndNext');
            break;
          case 'd':
            e.preventDefault();
            handlersRef.current.onCancel();
            break;
          case 'a':
            e.preventDefault();
            handlersRef.current.addItem();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-gray-50 mt-[-1.5rem] min-h-screen ml-0 lg:ml-2">
      <div className="max-w-8xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <button 
              onClick={onCancel} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <IoArrowBack className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 whitespace-nowrap">
              Create New Sales Invoice (INV{formData.invoiceNumber})
            </h1>
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Mark as favorite"
            >
              <IoStar className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <IoPersonOutline className="w-5 h-5" />
              Customer Info.
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Customer <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.customer}
                  onChange={(e) => updateFormData("customer", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.customer ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Please select customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
                {errors.customer && <p className="text-red-500 text-xs mt-1">{errors.customer}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Series Name</label>
                <select
                  value={formData.seriesName}
                  onChange={(e) => updateFormData("seriesName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Sales Invoice">Sales Invoice</option>
                  <option value="Service Invoice">Service Invoice</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    INV
                  </span>
                  <input
                    type="text"
                    value={formData.invoiceNumber}
                    onChange={(e) => updateFormData("invoiceNumber", e.target.value)}
                    className={`flex-1 min-w-0 px-3 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.invoiceNumber ? "border-red-500" : ""
                    }`}
                  />
                  <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Suffix
                  </span>
                </div>
                {errors.invoiceNumber && <p className="text-red-500 text-xs mt-1">{errors.invoiceNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.invoiceDate}
                  onChange={(e) => updateFormData("invoiceDate", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.invoiceDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.invoiceDate && <p className="text-red-500 text-xs mt-1">{errors.invoiceDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book Name</label>
                <select
                  value={formData.bookName}
                  onChange={(e) => updateFormData("bookName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select book</option>
                  {bookNames.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">SR.NO.</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">GOODS/SERVICE</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">QTY</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                    RATE (₹)
                    <br />
                    (EXCL. GST)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">AMOUNT (₹)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 min-w-[200px]">
                      <select
                        value={item.product}
                        onChange={(e) => updateItem(index, "product", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors[`item_${index}_product`] ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Please select goods/service</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                      {errors[`item_${index}_product`] && (
                        <p className="text-red-500 text-xs mt-1">Product is required</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", e.target.value)}
                        className="w-full sm:w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateItem(index, "rate", e.target.value)}
                        className="w-full sm:w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">₹{isNaN(item.amount) ? "0.00" : item.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => removeItem(index)}
                        disabled={formData.items.length === 1}
                        className="p-1 text-red-500 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Remove item"
                      >
                        <IoTrash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <button
              onClick={addItem}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <IoAdd className="w-4 h-4" />
              Add Row
            </button>
            <div className="text-right">
              <div className="text-sm text-gray-600">Subtotal</div>
              <div className="text-lg font-semibold">₹{totals.subtotal}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Special Notes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <IoDocumentTextOutline className="w-5 h-5" />
                Special Notes
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Write Notes or Instructions</label>
                <textarea
                  value={formData.specialNotes}
                  onChange={(e) => updateFormData("specialNotes", e.target.value)}
                  placeholder="Type here your special notes for this invoice."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] resize-vertical"
                  maxLength={1000}
                />
                <div className="text-right text-xs text-gray-500 mt-1">{formData.specialNotes.length}/1000</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attach Document (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-gray-400 transition-colors">
                  <IoCloudUpload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <div className="text-sm text-gray-600">
                    <label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:text-blue-500">
                      Click to upload
                    </label>
                    {" or drag and drop"}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">JPEG, PDF, DOC, DOCX, PNG, or JPG & Size up to 2MB</div>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".jpeg,.jpg,.png,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                {formData.attachedDocuments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {formData.attachedDocuments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded"
                      >
                        <span className="truncate max-w-[200px]">{file.name}</span>
                        <button
                          onClick={() => {
                            const updatedFiles = formData.attachedDocuments.filter((_, i) => i !== index)
                            updateFormData("attachedDocuments", updatedFiles)
                          }}
                          className="ml-2 text-red-500 hover:text-red-700"
                          aria-label="Remove file"
                        >
                          <IoClose className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <IoCalculatorOutline className="w-5 h-5" />
                Summary
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Taxable Amt.</span>
                <span className="font-medium">₹{totals.taxableAmount}</span>
              </div>

              {/* Service Charges */}
              {formData.serviceCharges.map((charge, index) => (
                <div key={charge.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={charge.name}
                    onChange={(e) => updateCharge("serviceCharges", index, "name", e.target.value)}
                    placeholder="Service charge name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    value={charge.amount}
                    onChange={(e) => updateCharge("serviceCharges", index, "amount", e.target.value)}
                    className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                  <button
                    onClick={() => removeServiceCharge(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                    aria-label="Remove service charge"
                  >
                    <IoTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={addServiceCharge}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-blue-200 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                <IoAdd className="w-4 h-4" />
                Add service charge with tax
              </button>

              <hr className="border-gray-200" />

              <div className="flex justify-between items-center">
                <span className="text-sm">Sub Total</span>
                <span className="font-medium">₹{totals.subtotal}</span>
              </div>

              {/* Additional Charges */}
              {formData.additionalCharges.map((charge, index) => (
                <div key={charge.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={charge.name}
                    onChange={(e) => updateCharge("additionalCharges", index, "name", e.target.value)}
                    placeholder="Additional charge name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    value={charge.amount}
                    onChange={(e) => updateCharge("additionalCharges", index, "amount", e.target.value)}
                    className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                  <button
                    onClick={() => removeAdditionalCharge(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                    aria-label="Remove additional charge"
                  >
                    <IoTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={addAdditionalCharge}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-blue-200 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                <IoAdd className="w-4 h-4" />
                Add another charge
              </button>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm">Discount</span>
                <select
                  value={formData.discountType}
                  onChange={(e) => updateFormData("discountType", e.target.value)}
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="%">%</option>
                  <option value="₹">₹</option>
                </select>
                <input
                  type="text"
                  value={formData.discountValue}
                  onChange={(e) => {
                    // Allow only numbers and decimal point
                    const value = e.target.value;
                    if (/^\d*\.?\d*$/.test(value) || value === "") {
                      updateFormData("discountValue", value);
                    }
                  }}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
                <span className="text-sm">₹{totals.discountAmount}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="autoRoundOff"
                    checked={formData.autoRoundOff}
                    onChange={(e) => updateFormData("autoRoundOff", e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="autoRoundOff" className="text-sm">
                    Auto Round Off
                  </label>
                </div>
                <span className="font-medium">₹{totals.totalAmount}</span>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Amount</span>
                <span>₹{totals.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Options */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="paymentReceived"
                checked={formData.isPaymentReceived}
                onChange={(e) => updateFormData("isPaymentReceived", e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="paymentReceived" className="text-sm">
                Is Payment Received?
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="additionalDetails"
                checked={formData.wantAdditionalDetails}
                onChange={(e) => updateFormData("wantAdditionalDetails", e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="additionalDetails" className="text-sm">
                Want to add Additional Details
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mb-8">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors w-full sm:w-auto"
          >
            Cancel
          </button>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => handleSubmit("save")}
              disabled={isLoading}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => handleSubmit("saveAndNext")}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
            >
              {isLoading ? "Saving..." : "Save & Next"}
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
          <div className="text-sm text-gray-600 flex flex-wrap gap-2">
            <span className="font-medium">SHORTCUTS:</span>
            <span>
              <kbd className="px-2 py-1 bg-white rounded text-xs font-mono">ALT + S</kbd> Save
            </span>
            <span>
              <kbd className="px-2 py-1 bg-white rounded text-xs font-mono">ALT + N</kbd> Save & Next
            </span>
            <span>
              <kbd className="px-2 py-1 bg-white rounded text-xs font-mono">ALT + D</kbd> Discard
            </span>
            <span>
              <kbd className="px-2 py-1 bg-white rounded text-xs font-mono">ALT + A</kbd> Add New Row
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewSalesInvoice;