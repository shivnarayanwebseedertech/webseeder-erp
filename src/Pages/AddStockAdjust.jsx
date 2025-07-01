import React, { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';

const AddStockAdjust = ({ onBack, onSave }) => {
  const [docNo, setDocNo] = useState('ADJ0001');
  const [entryDate, setEntryDate] = useState(new Date().toISOString().slice(0, 10));
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]); // Each item = { id, itemName, unit, compuStk, ... }

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault(); onSave && onSave({ docNo, entryDate, items });
      }
      if (e.altKey && e.key.toLowerCase() === 'c') {
        e.preventDefault(); onBack && onBack();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [docNo, entryDate, items]);

  return (
    <div className="w-full lg:w-[64rem] ml-10 p-4 space-y-4">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="text-xl"><IoArrowBack /></button>
        <h2 className="text-xl font-semibold">Add Stock Adjust</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium">Doc No.</label>
          <input type="text" value={docNo} readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100" />
        </div>
        <div>
          <label className="block text-sm font-medium">Entry Date<span className="text-red-500">*</span></label>
          <input type="date" value={entryDate} onChange={e => setEntryDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium invisible">Search</label>
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search item"
            className="block w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-50 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">ITEM NAME</th>
              <th className="px-4 py-2">UNIT</th>
              <th className="px-4 py-2">COMPU. STK.</th>
              <th className="px-4 py-2">BATCH/LOT NO.</th>
              <th className="px-4 py-2">PHYSICAL STK.</th>
              <th className="px-4 py-2">VARIATION <span title="Difference">?</span></th>
              <th className="px-4 py-2">ADJ. QTY <span title="Adjusted quantity">?</span></th>
              <th className="px-4 py-2">ADJUST COMMENT</th>
              <th className="px-4 py-2">WASTAGE QTY <span title="Damaged quantity">?</span></th>
              <th className="px-4 py-2">WASTAGE COMMENT</th>
              <th className="px-4 py-2">CONSUME QTY <span title="Used quantity">?</span></th>
              <th className="px-4 py-2">CONSUME COMMENT</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center py-6 text-gray-500">No item created yet</td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.itemName}</td>
                  <td className="px-4 py-2 text-center">{item.unit}</td>
                  <td className="px-4 py-2 text-center">{item.compuStk}</td>
                  <td className="px-4 py-2 text-center">{item.batchNo}</td>
                  <td className="px-4 py-2 text-center">{item.physicalStk}</td>
                  <td className="px-4 py-2 text-center">{item.variation}</td>
                  <td className="px-4 py-2 text-center">{item.adjQty}</td>
                  <td className="px-4 py-2">{item.adjComment}</td>
                  <td className="px-4 py-2 text-center">{item.wastageQty}</td>
                  <td className="px-4 py-2">{item.wastageComment}</td>
                  <td className="px-4 py-2 text-center">{item.consumeQty}</td>
                  <td className="px-4 py-2">{item.consumeComment}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-gray-500 mt-4">
        <p>SHORTCUTS:</p>
        <div className="flex gap-4 flex-wrap">
          <span>ALT + S: Save</span>
          <span>ALT + C: Cancel</span>
        </div>
      </div>
    </div>
  );
};

export default AddStockAdjust;
