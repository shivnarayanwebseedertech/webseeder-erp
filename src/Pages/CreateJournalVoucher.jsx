import React, { useState, useEffect, useRef } from "react";
import { IoAdd, IoTrash } from "react-icons/io5";

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

const CreateJournalVoucher = ({
  initialJV = "JV0001",
  onSave,
  onSaveNext,
  onCancel,
}) => {
  const [jvNo, setJvNo] = useState(initialJV);
  const [jvDate, setJvDate] = useState(new Date().toISOString().slice(0, 10));
  const [referenceNo, setReferenceNo] = useState("");
  const [rows, setRows] = useState([
    { id: Date.now(), account: "", description: "", debit: "", credit: "" },
  ]);
  const [specialNotes, setSpecialNotes] = useState("");

  const tableRef = useRef(null);

  // compute totals
  const totalDebit = rows.reduce(
    (sum, r) => sum + (parseFloat(r.debit) || 0),
    0
  );
  const totalCredit = rows.reduce(
    (sum, r) => sum + (parseFloat(r.credit) || 0),
    0
  );

  // keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.altKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        onSave && onSave({ jvNo, jvDate, referenceNo, rows, specialNotes });
      }
      if (e.altKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        onSaveNext &&
          onSaveNext({ jvNo, jvDate, referenceNo, rows, specialNotes });
      }
      if (e.altKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        addRow();
      }
      if (e.altKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        removeRow();
      }
      if (e.altKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        onCancel && onCancel();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [jvNo, jvDate, referenceNo, rows, specialNotes]);

  const addRow = () => {
    setRows((r) => [
      ...r,
      { id: Date.now(), account: "", description: "", debit: "", credit: "" },
    ]);
  };

  const removeRow = () => {
    setRows((r) => (r.length > 1 ? r.slice(0, -1) : r));
  };

  const updateRow = (id, field, value) => {
    setRows((r) =>
      r.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  // update JV No on initial change
  const handleJvNoChange = (e) => {
    setJvNo(e.target.value);
  };

  return (
    <div className="w-full p-4 ml-4 space-y-6">
      {/* Header with wrap */}
      <div className="flex flex-wrap items-center gap-4">
        <button className="text-gray-600 hover:text-gray-800">
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 flex-grow">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
            Create Receipt
          </h1>
          <span className="text-gray-500">(JV0001)</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <StarIcon className="h-5 w-5" />
        </button>
      </div>

      <h2 className="text-xl font-semibold">Create Journal Voucher</h2>

      {/* Form fields grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* ... inputs ... */}
        <div>
          <label className="block text-sm font-medium">JV No.</label>
          <input
            type="text"
            value={jvNo}
            onChange={handleJvNoChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">JV Date</label>
          <input
            type="date"
            value={jvDate}
            onChange={(e) => setJvDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Reference No.</label>
          <input
            type="text"
            value={referenceNo}
            onChange={(e) => setReferenceNo(e.target.value)}
            placeholder="AD/0102"
            className="mt-1 block w-full border border-gray-300 rounded-md px-2 py-1"
          />
        </div>
      </div>

      {/* Table container */}
      <div
        ref={tableRef}
        className="overflow-x-auto bg-white rounded-lg border"
      >
        <table className="min-w-full table-auto">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-2 sm:px-4 py-2">SR.NO.</th>
              <th className="px-2 sm:px-4 py-2">ACCOUNT</th>
              <th className="px-2 sm:px-4 py-2">DESCRIPTION</th>
              <th className="px-2 sm:px-4 py-2 text-right">DEBIT (₹)</th>
              <th className="px-2 sm:px-4 py-2 text-right">CREDIT (₹)</th>
              <th className="px-2 sm:px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.id} className="border-t">
                <td className="px-2 sm:px-4 py-2 text-center">{idx + 1}</td>
                <td className="px-2 sm:px-4 py-2">
                  <select
                    value={row.account}
                    onChange={(e) =>
                      updateRow(row.id, "account", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="">Please select account</option>
                  </select>
                </td>
                <td className="px-2 sm:px-4 py-2">
                  <textarea
                    value={row.description}
                    onChange={(e) =>
                      updateRow(row.id, "description", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-2 py-1 resize-none h-8 sm:h-10 text-sm"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2">
                  <input
                    type="number"
                    value={row.debit}
                    onChange={(e) => updateRow(row.id, "debit", e.target.value)}
                    className="w-full text-right border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2">
                  <input
                    type="number"
                    value={row.credit}
                    onChange={(e) =>
                      updateRow(row.id, "credit", e.target.value)
                    }
                    className="w-full text-right border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2 text-center">
                  <button onClick={() => removeRow(row.id)} className="p-1">
                    <IoTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td
                colSpan={3}
                className="px-2 sm:px-4 py-2 font-semibold text-right"
              >
                Subtotal
              </td>
              <td className="px-2 sm:px-4 py-2 text-right">
                {totalDebit.toFixed(2)}
              </td>
              <td className="px-2 sm:px-4 py-2 text-right">
                {totalCredit.toFixed(2)}
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Notes and summary stack responsively */}
      <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:flex-1">
          <label className="block text-sm font-medium">Special Notes</label>
          <textarea
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded px-2 py-1 resize-none h-24"
          />
        </div>
        <div className="w-full md:w-64 bg-gray-50 border rounded-lg p-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Total Amt.</span>
            <span>₹{(totalDebit - totalCredit).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Action buttons wrap */}
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded w-full sm:w-auto"
        >
          Cancel
        </button>
        <button
          onClick={() =>
            onSaveNext({ jvNo, jvDate, referenceNo, rows, specialNotes })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded w-full sm:w-auto"
        >
          Save & Next
        </button>
        <button
          onClick={() =>
            onSave({ jvNo, jvDate, referenceNo, rows, specialNotes })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded w-full sm:w-auto"
        >
          Save
        </button>
      </div>

      {/* Shortcuts info */}
      <div className="mt-6 text-xs text-gray-500">
        <p>SHORTCUTS:</p>
        <ul className="flex flex-wrap gap-4">
          <li>ALT + S: Save</li>
          <li>ALT + N: Save & Next</li>
          <li>ALT + A: Add New Row</li>
          <li>ALT + R: Remove Row</li>
          <li>ALT + C: Cancel</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateJournalVoucher;
