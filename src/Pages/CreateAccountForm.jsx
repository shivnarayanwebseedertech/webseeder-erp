import React, { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';

const CreateAccount = ({ initialData = {}, onSave, onCancel, onDiscard }) => {
  const [underGroup, setUnderGroup] = useState(initialData.underGroup || '');
  const [accountName, setAccountName] = useState(initialData.accountName || '');
  const [aliasName, setAliasName] = useState(initialData.aliasName || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [mobile, setMobile] = useState(initialData.mobile || '');

  const [bankHolder, setBankHolder] = useState(initialData.bankHolder || '');
  const [accountNumber, setAccountNumber] = useState(initialData.accountNumber || '');
  const [ifsc, setIfsc] = useState(initialData.ifsc || '');
  const [bankName, setBankName] = useState(initialData.bankName || '');

  const [openingBalance, setOpeningBalance] = useState(initialData.openingBalance || '0.00');
  const [balanceType, setBalanceType] = useState(initialData.balanceType || 'Dr');

  const [status, setStatus] = useState(initialData.status || 'Active');

  // keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault(); onSave && onSave(getFormData());
      }
      if (e.altKey && e.key.toLowerCase() === 'c') {
        e.preventDefault(); onCancel && onCancel();
      }
      if (e.altKey && e.key.toLowerCase() === 'd') {
        e.preventDefault(); onDiscard && onDiscard(getFormData());
      }
      if (!e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        // handle prev/next navigation
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [underGroup, accountName, aliasName, email, mobile, bankHolder, accountNumber, ifsc, bankName, openingBalance, balanceType, status]);

  const getFormData = () => ({ underGroup, accountName, aliasName, email, mobile, bankHolder, accountNumber, ifsc, bankName, openingBalance, balanceType, status });

  return (
    <div className="w-full lg:w-[64rem] ml-10 p-4 space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onCancel} className="text-xl"><IoArrowBack /></button>
        <h2 className="text-xl font-semibold">Create Account</h2>
      </div>
      <div className="bg-white border rounded-lg p-6 space-y-6">
        {/* Under group */}
        <div>
          <label className="block text-sm font-medium">Under group</label>
          <select value={underGroup} onChange={e => setUnderGroup(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
            <option value="">Select group</option>
            {/* TODO: populate from backend */}
            <option value="Bank Accounts">Bank Accounts</option>
            <option value="Sundry Debtors">Sundry Debtors</option>
          </select>
        </div>
        {/* Name fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Account Name<span className="text-red-500">*</span></label>
            <input type="text" value={accountName} onChange={e => setAccountName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Short/Alias Name</label>
            <input type="text" value={aliasName} onChange={e => setAliasName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
        </div>
        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@domain.com"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Mobile No.</label>
            <input type="text" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="99XXXXXX01"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-medium">Bank Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Account Holder's Name<span className="text-red-500">*</span></label>
              <input type="text" value={bankHolder} onChange={e => setBankHolder(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">A/C No.<span className="text-red-500">*</span></label>
              <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="32XXXXXXXX01" />
            </div>
            <div>
              <label className="block text-sm font-medium">IFSC Code<span className="text-red-500">*</span></label>
              <input type="text" value={ifsc} onChange={e => setIfsc(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="AAXXXXXXX01" />
            </div>
            <div>
              <label className="block text-sm font-medium">Bank Name<span className="text-red-500">*</span></label>
              <input type="text" value={bankName} onChange={e => setBankName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter your bank name" />
            </div>
          </div>
        </div>

        {/* Opening Balance */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
          <div>
            <label className="block text-sm font-medium">Opening Balance</label>
            <div className="flex items-center mt-1 border border-gray-300 rounded-md overflow-hidden">
              <span className="px-3">₹</span>
              <input type="number" step="0.01" value={openingBalance} onChange={e => setOpeningBalance(e.target.value)}
                className="flex-1 border-none px-2 py-2 focus:ring-0 focus:outline-none" />
            </div>
          </div>
          <div>
            <select value={balanceType} onChange={e => setBalanceType(e.target.value)}
              className="mt-6 block border border-gray-300 rounded-md px-3 py-2">
              <option>Dr</option>
              <option>Cr</option>
            </select>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Status</span>
          <label className="inline-flex items-center">
            <input type="radio" name="status" value="Active" checked={status === 'Active'} onChange={e => setStatus(e.target.value)}
              className="form-radio" />
            <span className="ml-2">Active</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="status" value="Inactive" checked={status === 'Inactive'} onChange={e => setStatus(e.target.value)}
              className="form-radio" />
            <span className="ml-2">Inactive</span>
          </label>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <button onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={() => onSave(getFormData())} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="mt-4 text-xs text-gray-500">
        <p>SHORTCUTS:</p>
        <ul className="flex flex-wrap gap-4 items-center">
          <li>ALT + S: Save</li>
          <li>ALT + C: Cancel</li>
          <li>ALT + D: Discard</li>
          <li>&larr; &rarr;: Navigate</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateAccount;
