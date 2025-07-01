import React, { useState, useEffect, useRef } from 'react';
import { IoAdd, IoTrash } from 'react-icons/io5';

const ContraEntryForm = ({ initialContraNo = 'CTR0001', onSave, onSaveNext, onSavePrint, onCancel }) => {
  const [contraNo, setContraNo] = useState(initialContraNo);
  const [entryDate, setEntryDate] = useState(new Date().toISOString().slice(0,10));
  const [mode, setMode] = useState('');
  const [referenceNo, setReferenceNo] = useState('');

  const [rows, setRows] = useState([
    { id: Date.now(), selected: false, account: '', description: '', debit: '', credit: '' }
  ]);
  const [specialNotes, setSpecialNotes] = useState('');

  const tableRef = useRef(null);

  const totalDebit = rows.reduce((sum, r) => sum + (parseFloat(r.debit) || 0), 0);
  const totalCredit = rows.reduce((sum, r) => sum + (parseFloat(r.credit) || 0), 0);

  useEffect(() => {
    const handler = e => {
      if (e.altKey && e.key.toLowerCase()==='s') { e.preventDefault(); onSave && onSave(formData()); }
      if (e.altKey && e.key.toLowerCase()==='n') { e.preventDefault(); onSaveNext && onSaveNext(formData()); }
      if (e.altKey && e.key.toLowerCase()==='p') { e.preventDefault(); onSavePrint && onSavePrint(formData()); }
      if (e.altKey && e.key.toLowerCase()==='d') { e.preventDefault(); /* Discard logic if any */ }
      if (e.altKey && e.key.toLowerCase()==='c') { e.preventDefault(); onCancel && onCancel(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [contraNo, entryDate, mode, referenceNo, rows, specialNotes]);

  const formData = () => ({ contraNo, entryDate, mode, referenceNo, rows, specialNotes });

  const addRow = () => setRows(r => [...r, { id: Date.now(), selected:false, account:'', description:'', debit:'', credit:'' }]);
  const removeRow = () => setRows(r => (r.length>1 ? r.slice(0,-1) : r));

  const updateRow = (id, field, value) => {
    setRows(r => r.map(row => row.id===id ? {...row, [field]: value } : row));
  };
  const selectRow = (id) => {
    setRows(r => r.map(row => ({ ...row, selected: row.id===id })));  
  };

  return (
    <div className="w-full lg:w-8xl ml-10 p-4 space-y-4">
      <h2 className="text-xl font-semibold">Create Contra Entry</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium">Contra No.</label>
          <input value={contraNo} onChange={e=>setContraNo(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded px-2 py-1"/>
        </div>
        <div>
          <label className="block text-sm font-medium">Contra Entry Date<span className="text-red-500">*</span></label>
          <input type="date" value={entryDate} onChange={e=>setEntryDate(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded px-2 py-1"/>
        </div>
        <div>
          <label className="block text-sm font-medium">Mode<span className="text-red-500">*</span></label>
          <select value={mode} onChange={e=>setMode(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded px-2 py-1">
            <option value="">Select mode</option>
            <option>Cash</option>
            <option>Cheque</option>
            <option>Online</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Reference No.</label>
          <input value={referenceNo} onChange={e=>setReferenceNo(e.target.value)} placeholder="AD/0102"
            className="mt-1 w-full border border-gray-300 rounded px-2 py-1"/>
        </div>
      </div>

      <div ref={tableRef} className="overflow-x-auto bg-white rounded border">
        <table className="min-w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">ACCOUNT</th>
              <th className="px-4 py-2">DESCRIPTION</th>
              <th className="px-4 py-2 text-right">DEBIT (₹)</th>
              <th className="px-4 py-2 text-right">CREDIT (₹)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id} className="border-t">
                <td className="px-4 py-2 text-center">
                  <input type="radio" name="selectedRow" checked={row.selected} onChange={()=>selectRow(row.id)} />
                </td>
                <td className="px-4 py-2">
                  <select value={row.account} onChange={e=>updateRow(row.id,'account',e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1">
                    <option value="">Please select account</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <textarea value={row.description} onChange={e=>updateRow(row.id,'description',e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1 resize-none h-10" />
                </td>
                <td className="px-4 py-2">
                  <input type="number" value={row.debit} onChange={e=>updateRow(row.id,'debit',e.target.value)}
                    className="w-full text-right border border-gray-300 rounded px-2 py-1"/>
                </td>
                <td className="px-4 py-2">
                  <input type="number" value={row.credit} onChange={e=>updateRow(row.id,'credit',e.target.value)}
                    className="w-full text-right border border-gray-300 rounded px-2 py-1"/>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={2} className="px-4 py-2 font-semibold text-right">Subtotal</td>
              <td />
              <td className="px-4 py-2 text-right">{totalDebit.toFixed(2)}</td>
              <td className="px-4 py-2 text-right">{totalCredit.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex justify-between items-start space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium">Special Notes</label>
          <textarea value={specialNotes} onChange={e=>setSpecialNotes(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded px-2 py-1 resize-none h-24" />
        </div>
        <div className="w-64 bg-gray-50 border rounded p-4">
          <div className="flex justify-between mb-2 text-sm">
            <span>Total Amt.</span>
            <span>₹{(totalDebit - totalCredit).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
        <button onClick={()=>onSaveNext(formData())} className="px-4 py-2 bg-blue-500 text-white rounded">Save & Next</button>
        <button onClick={()=>onSave(formData())} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
      </div>

      <div className="mt-6 text-xs text-gray-500">
        <p>SHORTCUTS:</p>
        <ul className="flex flex-wrap gap-4">
          <li>ALT + S: Save</li>
          <li>ALT + N: Save & Next</li>
          <li>ALT + P: Save & Print</li>
          <li>ALT + D: Discard</li>
          <li>ALT + C: Cancel</li>
        </ul>
      </div>
    </div>
  );
};

export default ContraEntryForm;
