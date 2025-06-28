import { useState } from "react"
import { AiOutlineStar, AiOutlinePlus } from "react-icons/ai"
import { BiImport } from "react-icons/bi"
import { BsQuestionCircle } from "react-icons/bs"

// Tab keys
const TABS = ["general", "default", "customers", "vendors"]

export default function Account({ collapsed }) {
  const [activeTab, setActiveTab] = useState("general")

  const wrapperStyle = {
    marginLeft: collapsed ? "1.5rem" : "10.5rem",
    paddingTop: "2.5rem",
  }

  return (
    <div style={wrapperStyle} className="min-h-screen bg-gray-100 w-full transition-all duration-300">
      <Header
        onImport={() => {
          /* your import logic */
        }}
        onCreate={() => {
          /* your create logic */
        }}
      />

      <TabNav activeTab={activeTab} onChange={setActiveTab} />

      <section className="pb-6">
        {activeTab === "general" ? (
          <GeneralView
            onCreate={() => {
              /* create logic */
            }}
            onImport={() => {
              /* import logic */
            }}
          />
        ) : (
          <DataTableView tab={activeTab} />
        )}
      </section>
    </div>
  )
}

// Header with Import and Create Account buttons only
function Header({ onImport, onCreate }) {
  return (
    <div className="flex items-center justify-between px-6 mb-2">
      <h1 className="text-2xl font-semibold flex items-center">
        Account
        <AiOutlineStar className="ml-2 text-gray-400 hover:text-yellow-500 cursor-pointer" />
        <BsQuestionCircle className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer" />
      </h1>

      <div className="flex items-center space-x-3">
        <button onClick={onImport} className="flex items-center px-4 py-2 border rounded bg-white hover:bg-gray-50">
          <BiImport className="mr-2 text-lg" /> Import
        </button>

        <button
          onClick={onCreate}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <AiOutlinePlus className="mr-2" /> Create Account
        </button>
      </div>
    </div>
  )
}

// Tab navigation
function TabNav({ activeTab, onChange }) {
  return (
    <nav className="px-6 border-b bg-white">
      <ul className="flex space-x-4">
        {TABS.map((t) => (
          <li key={t}>
            <button
              onClick={() => onChange(t)}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === t ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// General view with video and empty state
function GeneralView({ onCreate, onImport }) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 w-full">
      <div className="w-full max-w-lg aspect-video bg-black/5 rounded overflow-hidden">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
          title="How to manage accounts"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <h2 className="text-xl font-semibold">Manage bookkeeping entries!</h2>
      <p className="text-gray-500">Create account master for bookkeeping.</p>
      <div className="flex space-x-4">
        <button
          onClick={onCreate}
          className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <AiOutlinePlus className="mr-2" /> Create Account
        </button>
        <button onClick={onImport} className="inline-flex items-center border px-4 py-2 rounded-md hover:bg-gray-50">
          <BiImport className="mr-2" /> Import
        </button>
      </div>
    </div>
  )
}

// Updated table view that matches the screenshot for default tab
function DataTableView({ tab }) {
  // Different headers and data based on the tab
  if (tab === "default") {
    const DEFAULT_HEADERS = ["Account", "Under Group", "Opening Balance", "Balance (₹)", "Actions"]

    const DEFAULT_ROWS = [
      {
        Account: "Profit & Loss (A/C)",
        "Under Group": "Reserves & Surplus",
        "Opening Balance": "0.00 Cr",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
      {
        Account: "Cash Purchase",
        "Under Group": "Sundry Creditors",
        "Opening Balance": "0.00",
        "Balance (₹)": "0.00 Cr",
        Actions: "View",
      },
      {
        Account: "SGST Payable",
        "Under Group": "GST payable",
        "Opening Balance": "0.00 Cr",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
      {
        Account: "IGST Payable",
        "Under Group": "GST payable",
        "Opening Balance": "0.00 Cr",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
      {
        Account: "CGST Payable",
        "Under Group": "GST payable",
        "Opening Balance": "0.00 Cr",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
      {
        Account: "CESS Payable",
        "Under Group": "Other Duties & Taxes",
        "Opening Balance": "0.00 Cr",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
      {
        Account: "TCS Payable",
        "Under Group": "Other Duties & Taxes",
        "Opening Balance": "0.00 Cr",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
      {
        Account: "Other tax payable",
        "Under Group": "Other Duties & Taxes",
        "Opening Balance": "0.00 Cr",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
      {
        Account: "Tds Payable",
        "Under Group": "Other Duties & Taxes",
        "Opening Balance": "0.00 Cr",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
      {
        Account: "Income Tax",
        "Under Group": "Other Payable",
        "Opening Balance": "0.00 Cr",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
      {
        Account: "Closing Stock",
        "Under Group": "Stock-in-Hand",
        "Opening Balance": "0.00 Cr",
        "Balance (₹)": "0.00 Cr",
        Actions: "View",
      },
      {
        Account: "Opening Stock",
        "Under Group": "Stock-in-Hand",
        "Opening Balance": "0.00 Dr",
        "Balance (₹)": "0.00 Dr",
        Actions: "View",
      },
      {
        Account: "Cash Sales",
        "Under Group": "Sundry Debtors",
        "Opening Balance": "0.00",
        "Balance (₹)": "0.00 Dr",
        Actions: "View",
      },
      {
        Account: "Cash-in-Hand",
        "Under Group": "Cash-in-Hand",
        "Opening Balance": "0.00 Dr",
        "Balance (₹)": "0.00 Dr",
        Actions: "Edit",
      },
      {
        Account: "CGST Receivable",
        "Under Group": "GST Receivable",
        "Opening Balance": "0.00 Dr",
        "Balance (₹)": "0.00 Dr",
        Actions: "Edit",
      },
      {
        Account: "Reverse charge Tax input but not due",
        "Under Group": "GST Receivable",
        "Opening Balance": "0.00 Dr",
        "Balance (₹)": "0.00 Dr",
        Actions: "Edit",
      },
      {
        Account: "SGST Receivable",
        "Under Group": "GST Receivable",
        "Opening Balance": "0.00 Dr",
        "Balance (₹)": "0.00 Dr",
        Actions: "Edit",
      },
      {
        Account: "IGST Receivable",
        "Under Group": "GST Receivable",
        "Opening Balance": "0.00 Dr",
        "Balance (₹)": "0.00 Dr",
        Actions: "Edit",
      },
      {
        Account: "TDS Recieivable",
        "Under Group": "Other Current Assets",
        "Opening Balance": "0.00 Dr",
        "Balance (₹)": "0.00 Dr",
        Actions: "Edit",
      },
      {
        Account: "Sales Taxable",
        "Under Group": "Sales Accounts",
        "Opening Balance": "0.00",
        "Balance (₹)": "0.00 Cr",
        Actions: "View",
      },
      {
        Account: "Export Sales",
        "Under Group": "Sales Accounts",
        "Opening Balance": "0.00",
        "Balance (₹)": "0.00 Cr",
        Actions: "View",
      },
      {
        Account: "Discount received",
        "Under Group": "Indirect Incomes",
        "Opening Balance": "0.00",
        "Balance (₹)": "0.00 Cr",
        Actions: "View",
      },
      {
        Account: "Import Purchase",
        "Under Group": "Purchase Accounts",
        "Opening Balance": "0.00",
        "Balance (₹)": "0.00 Cr",
        Actions: "View",
      },
      {
        Account: "Purchase Taxable",
        "Under Group": "Purchase Accounts",
        "Opening Balance": "0.00",
        "Balance (₹)": "0.00 Cr",
        Actions: "View",
      },
      {
        Account: "Direct Expenses",
        "Under Group": "Direct Expenses",
        "Opening Balance": "0.00",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
      {
        Account: "Indirect Expenses",
        "Under Group": "Indirect Expenses",
        "Opening Balance": "0.00",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
      {
        Account: "Wastage value",
        "Under Group": "Indirect Expenses",
        "Opening Balance": "0.00",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
      {
        Account: "Consumption value",
        "Under Group": "Indirect Expenses",
        "Opening Balance": "0.00",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
      {
        Account: "Discount allowed",
        "Under Group": "Indirect Expenses",
        "Opening Balance": "0.00",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
      {
        Account: "Adjustment value",
        "Under Group": "Indirect Expenses",
        "Opening Balance": "0.00",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
      {
        Account: "Round Off (A/C)",
        "Under Group": "Indirect Expenses",
        "Opening Balance": "0.00",
        "Balance (₹)": "0.00 Cr",
        Actions: "Edit",
      },
    ]

    return (
      <div className="bg-white rounded shadow overflow-x-auto w-full">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              {DEFAULT_HEADERS.map((header) => (
                <th key={header} className="px-4 py-3 text-sm font-medium text-gray-700 border-r last:border-r-0">
                  <div className="flex items-center">
                    {header}
                    <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEFAULT_ROWS.map((row, idx) => (
              <tr key={idx} className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                <td className="px-4 py-3 text-sm border-r">
                  <span
                    className={`${
                      row.Account.includes("Payable") || row.Account.includes("Tax") ? "text-blue-600" : "text-gray-900"
                    }`}
                  >
                    {row.Account}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">{row["Under Group"]}</td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r text-right">{row["Opening Balance"]}</td>
                <td className="px-4 py-3 text-sm border-r text-right">
                  <span className={`${row["Balance (₹)"].includes("Dr") ? "text-blue-600" : "text-gray-700"}`}>
                    {row["Balance (₹)"]}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    className={`${
                      row.Actions === "Edit" ? "text-blue-600 hover:text-blue-800" : "text-blue-600 hover:text-blue-800"
                    }`}
                  >
                    {row.Actions}
                  </button>
                  <button className="ml-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 bg-gray-50 border-t text-sm text-gray-600 flex justify-between items-center">
          <span>1 - 31 of 31 Records</span>
          <div className="flex items-center space-x-4">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                />
              </svg>
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
            </button>
            <span className="text-gray-500">More Filter</span>
          </div>
        </div>
        <div className="px-4 py-2 border-t text-xs text-gray-600">
          <span className="font-medium">SHORTCUTS:</span> <kbd className="px-1 bg-gray-200 rounded">ALT</kbd> +{" "}
          <kbd className="px-1 bg-gray-200 rounded">N</kbd> Create Accounts
        </div>
      </div>
    )
  }

  // Add specific handling for customers tab
  if (tab === "customers") {
    const CUSTOMER_HEADERS = ["Account", "Mobile No.", "Under Group", "City", "State", "Opening Balance", "Actions"]

    const CUSTOMER_ROWS = [
      {
        Account: "Cash Sales",
        "Mobile No.": "",
        "Under Group": "Sundry Debtors",
        City: "",
        State: "MADHYA PRADESH",
        "Opening Balance": "0.00",
        Actions: "View",
      },
      {
        Account: "ABC Enterprises",
        "Mobile No.": "9876543210",
        "Under Group": "Sundry Debtors",
        City: "Mumbai",
        State: "MAHARASHTRA",
        "Opening Balance": "15,000.00",
        Actions: "Edit",
      },
      {
        Account: "XYZ Trading Co.",
        "Mobile No.": "9123456789",
        "Under Group": "Sundry Debtors",
        City: "Delhi",
        State: "DELHI",
        "Opening Balance": "8,500.00",
        Actions: "Edit",
      },
      {
        Account: "Retail Customer - A",
        "Mobile No.": "9988776655",
        "Under Group": "Sundry Debtors",
        City: "Bangalore",
        State: "KARNATAKA",
        "Opening Balance": "2,300.00",
        Actions: "View",
      },
      {
        Account: "Corporate Client Ltd",
        "Mobile No.": "9445566778",
        "Under Group": "Sundry Debtors",
        City: "Chennai",
        State: "TAMIL NADU",
        "Opening Balance": "25,000.00",
        Actions: "Edit",
      },
      {
        Account: "Local Store",
        "Mobile No.": "9334455667",
        "Under Group": "Sundry Debtors",
        City: "Pune",
        State: "MAHARASHTRA",
        "Opening Balance": "5,750.00",
        Actions: "View",
      },
      {
        Account: "Online Customer",
        "Mobile No.": "9223344556",
        "Under Group": "Sundry Debtors",
        City: "Hyderabad",
        State: "TELANGANA",
        "Opening Balance": "1,200.00",
        Actions: "Edit",
      },
      {
        Account: "Wholesale Buyer",
        "Mobile No.": "9112233445",
        "Under Group": "Sundry Debtors",
        City: "Kolkata",
        State: "WEST BENGAL",
        "Opening Balance": "18,900.00",
        Actions: "Edit",
      },
    ]

    // Add empty rows to match the image
    const EMPTY_ROWS = Array(2).fill({
      Account: "",
      "Mobile No.": "",
      "Under Group": "",
      City: "",
      State: "",
      "Opening Balance": "",
      Actions: "",
    })

    const ALL_CUSTOMER_ROWS = [...CUSTOMER_ROWS, ...EMPTY_ROWS]

    return (
      <div className="bg-white rounded shadow overflow-x-auto w-full">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              {CUSTOMER_HEADERS.map((header) => (
                <th key={header} className="px-4 py-3 text-sm font-medium text-gray-700 border-r last:border-r-0">
                  <div className="flex items-center">
                    {header}
                    <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_CUSTOMER_ROWS.map((row, idx) => (
              <tr key={idx} className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                <td className="px-4 py-3 text-sm border-r text-gray-900">{row.Account}</td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">{row["Mobile No."]}</td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">{row["Under Group"]}</td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">{row.City}</td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">{row.State}</td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r text-right">{row["Opening Balance"]}</td>
                <td className="px-4 py-3 text-sm">
                  {row.Actions && <button className="text-blue-600 hover:text-blue-800">{row.Actions}</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 bg-gray-50 border-t text-sm text-gray-600">
          <span>1 - 8 of 8 Records</span>
        </div>
        <div className="px-4 py-2 border-t text-xs text-gray-600">
          <span className="font-medium">SHORTCUTS:</span> <kbd className="px-1 bg-gray-200 rounded">ALT</kbd> +{" "}
          <kbd className="px-1 bg-gray-200 rounded">N</kbd> Create Accounts
        </div>
      </div>
    )
  }

  // Add specific handling for vendors tab
  if (tab === "vendors") {
    const VENDOR_HEADERS = ["Account", "Mobile No.", "Under Group", "City", "State", "Opening Balance", "Actions"]

    const VENDOR_ROWS = [
      {
        Account: "Cash Purchase",
        "Mobile No.": "",
        "Under Group": "Sundry Creditors",
        City: "",
        State: "MADHYA PRADESH",
        "Opening Balance": "0.00",
        Actions: "View",
      },
      {
        Account: "Raw Material Supplier",
        "Mobile No.": "9876543210",
        "Under Group": "Sundry Creditors",
        City: "Mumbai",
        State: "MAHARASHTRA",
        "Opening Balance": "12,500.00",
        Actions: "Edit",
      },
      {
        Account: "Office Supplies Co.",
        "Mobile No.": "9123456789",
        "Under Group": "Sundry Creditors",
        City: "Delhi",
        State: "DELHI",
        "Opening Balance": "3,200.00",
        Actions: "Edit",
      },
      {
        Account: "Equipment Vendor",
        "Mobile No.": "9988776655",
        "Under Group": "Sundry Creditors",
        City: "Bangalore",
        State: "KARNATAKA",
        "Opening Balance": "45,000.00",
        Actions: "View",
      },
      {
        Account: "Transport Services",
        "Mobile No.": "9445566778",
        "Under Group": "Sundry Creditors",
        City: "Chennai",
        State: "TAMIL NADU",
        "Opening Balance": "8,750.00",
        Actions: "Edit",
      },
      {
        Account: "Utility Provider",
        "Mobile No.": "9334455667",
        "Under Group": "Sundry Creditors",
        City: "Pune",
        State: "MAHARASHTRA",
        "Opening Balance": "2,100.00",
        Actions: "View",
      },
      {
        Account: "Maintenance Contractor",
        "Mobile No.": "9223344556",
        "Under Group": "Sundry Creditors",
        City: "Hyderabad",
        State: "TELANGANA",
        "Opening Balance": "6,800.00",
        Actions: "Edit",
      },
      {
        Account: "Technology Solutions",
        "Mobile No.": "9112233445",
        "Under Group": "Sundry Creditors",
        City: "Kolkata",
        State: "WEST BENGAL",
        "Opening Balance": "22,300.00",
        Actions: "Edit",
      },
    ]

    // Add empty rows to match the image
    const EMPTY_ROWS = Array(2).fill({
      Account: "",
      "Mobile No.": "",
      "Under Group": "",
      City: "",
      State: "",
      "Opening Balance": "",
      Actions: "",
    })

    const ALL_VENDOR_ROWS = [...VENDOR_ROWS, ...EMPTY_ROWS]

    return (
      <div className="bg-white rounded shadow overflow-x-auto w-full  ">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              {VENDOR_HEADERS.map((header) => (
                <th key={header} className="px-4 py-3 text-sm font-medium text-gray-700 border-r last:border-r-0">
                  <div className="flex items-center">
                    {header}
                    <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_VENDOR_ROWS.map((row, idx) => (
              <tr key={idx} className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                <td className="px-4 py-3 text-sm border-r text-gray-900">{row.Account}</td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">{row["Mobile No."]}</td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">{row["Under Group"]}</td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">{row.City}</td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r">{row.State}</td>
                <td className="px-4 py-3 text-sm text-gray-700 border-r text-right">{row["Opening Balance"]}</td>
                <td className="px-4 py-3 text-sm">
                  {row.Actions && <button className="text-blue-600 hover:text-blue-800">{row.Actions}</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 bg-gray-50 border-t text-sm text-gray-600">
          <span>1 - 8 of 8 Records</span>
        </div>
        <div className="px-4 py-2 border-t text-xs text-gray-600">
          <span className="font-medium">SHORTCUTS:</span> <kbd className="px-1 bg-gray-200 rounded">ALT</kbd> +{" "}
          <kbd className="px-1 bg-gray-200 rounded">N</kbd> Create Accounts
        </div>
      </div>
    )
  }

  // This should be the fallback return (remove the old vendors implementation)
  return (
    <div className="bg-white rounded shadow overflow-x-auto w-full">
      <div className="p-8 text-center text-gray-500">No data available for this tab.</div>
    </div>
  )
}
