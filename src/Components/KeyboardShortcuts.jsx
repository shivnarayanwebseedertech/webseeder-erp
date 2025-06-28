// File: src/components/KeyboardShortcuts.jsx
import React, { useState } from 'react';
import { CiKeyboard } from 'react-icons/ci';
import { IoIosArrowForward } from 'react-icons/io';

const shortcuts = [
  ['Switch Company', ['F1']],
  ['Set entry date', ['F2']],
  ['Dashboard', ['ALT', 'SHIFT', 'H']],
  ['Company', ['ALT', 'SHIFT', 'M']],
  ['Charts of account', ['ALT', 'SHIFT', 'Y']],
  ['Account', ['ALT', 'SHIFT', 'L']],
  ['Item Group', ['ALT', 'SHIFT', 'X']],
  ['Item Category', ['ALT', 'SHIFT', 'N']],
  ['Unit', ['ALT', 'SHIFT', 'U']],
  ['Item', ['ALT', 'SHIFT', 'I']],
  ['Transporter', ['ALT', 'SHIFT', 'T']],
  ['Barcode Printing', ['ALT', 'CTRL', 'L']],
  ['Sales Quotation', ['ALT', 'SHIFT', 'Q']],
  ['Delivery Challan', ['ALT', 'CTRL', 'D']],
  ['Sales Invoice', ['ALT', 'SHIFT', 'S']],
  ['Sales Return', ['ALT', 'SHIFT', 'C']],
  ['Bulk Invoice Update', ['ALT', 'CTRL', 'B']],
  ['Purchase Order', ['ALT', 'CTRL', 'P']],
  ['Purchase Bill', ['ALT', 'SHIFT', 'B']],
  ['Purchase Return', ['ALT', 'SHIFT', 'D']],
  ['Expenses', ['ALT', 'SHIFT', 'E']],
  ['Receipt', ['ALT', 'SHIFT', 'R']],
  ['Payment', ['ALT', 'SHIFT', 'P']],
  ['Contra Entry', ['ALT', 'CTRL', 'T']],
  ['Journal Voucher', ['ALT', 'SHIFT', 'V']],
  ['Stock Journal', ['ALT', 'SHIFT', 'J']],
  ['GST Journal Voucher', ['ALT', 'CTRL', 'G']],
  ['Stock Adjustment', ['ALT', 'SHIFT', 'A']],
  ['Bank Reconciliation', ['ALT', 'CTRL', 'R']],
  ['Report', ['ALT', 'SHIFT', 'O']],
  ['GST Compliance', ['ALT', 'SHIFT', 'G']],
  ['Settings', ['ALT', 'CTRL', 'U']],
  ['Global Search', ['CTRL', 'SHIFT', 'F']],
  ['Entry level shortcut', ['Create: ALT+N', 'Save: ALT+S', 'Save & Next: ALT+N', 'Save & Print: ALT+P', 'Discard: ALT+D']],
  ['Add New Row', ['ALT', 'A']],
  ['Remove Row', ['ALT', 'R']],
  ['Cancel', ['ALT', 'C']],
  ['New Master', ['Insert']],
  ['Delete Row', ['Delete']],
];

function Key({ children }) {
  return (
    <span className="inline-block border border-gray-300 rounded px-1 text-xs font-medium mx-0.5">
      {children}
    </span>
  );
}

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center p-2 bg-white border  border-gray-200 rounded-full shadow hover:bg-gray-50 focus:outline-none"
      >
        <CiKeyboard className="h-4 w-4 text-gray-800 font-bold" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Right drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 rounded-l-xl transform transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '40%' }}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="font-semibold text-sm">Keyboard Shortcuts</h2>
          <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
            <IoIosArrowForward className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-3rem)] text-sm">
          <table className="w-full table-fixed text-left">
            <tbody>
              {shortcuts.map(([label, keys], idx) => (
                <tr key={idx} className="border-b last:border-none">
                  <td className="py-2 align-top" style={{ width: '60%' }}>
                    {label}
                  </td>
                  <td className="py-2">
                    {keys.map((k, i) => (
                      <Key key={i}>{k}</Key>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
