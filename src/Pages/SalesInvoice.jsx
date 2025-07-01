// File: SalesInvoice.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import HelpSupportCards from "../Components/HelpSupportCards";


export default function SalesInvoice({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");

  const wrapperStyle = {
    marginLeft: collapsed ? "1.5rem" : "10.5rem",
    paddingTop: "2.5rem",
  };

  return (
    <div
      style={wrapperStyle}
      className="min-h-screen bg-gray-100 w-full transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <h1 className="text-2xl font-semibold flex items-center">
          Sales Invoice
          <AiOutlineStar className="ml-2 text-gray-400 hover:text-yellow-500 cursor-pointer" />
        </h1>
        <button
          onClick={() => navigate("/sales-invoice/create")}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <AiOutlinePlus className="mr-2" /> Create Invoice
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 border-b bg-white">
        <ul className="flex space-x-4">
          {["general", "opening"].map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="p-1.5">
        {activeTab === "general" && (
          <div className="flex flex-col items-center p-8 bg-white rounded shadow min-h-full">
            <img
              src="https://super-monitoring.com/blog/wp-content/uploads/2019/08/custom-contact-forms.png"
              alt="Invoice general"
              className="w-36 h-36 mb-6"
            />
            <h2 className="text-2xl font-semibold mb-2">Record your sales!</h2>
            <p className="text-gray-600 text-center max-w-xl mb-8">
              Quick and easy sales, sending detailed invoices and getting paid
              easier than ever. Go ahead quickly!
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/sales-invoice/create")}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <AiOutlinePlus className="mr-2" /> Create Invoice
              </button>
            </div>
            <div className="mt-10">
              <HelpSupportCards/>
            </div>
          </div>
        )}

        {activeTab === "opening" && (
          <div className="flex flex-col items-center p-8 bg-white rounded shadow min-h-[550px]">
            <img
              src="https://super-monitoring.com/blog/wp-content/uploads/2019/08/custom-contact-forms.png"
              alt="Invoice opening"
              className="w-36 h-36 mb-6"
            />
            <h2 className="text-2xl font-semibold mb-2">
              Manage Customer's opening invoices.
            </h2>
            <p className="text-gray-600 text-center max-w-xl mb-8">
              Create and manage opening invoices to collect payments.
            </p>
            <button
              onClick={() => {
                setCollapsed(true);
                navigate("/sales-invoice/create");
              }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <AiOutlinePlus className="mr-2" /> Create Invoice
            </button>
            <div className="mt-10">
              <HelpSupportCards/>
            </div>
          </div>

        )}
      </div>
    </div>
  );
}
