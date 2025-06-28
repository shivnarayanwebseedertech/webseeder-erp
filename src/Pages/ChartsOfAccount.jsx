import React, { useState } from "react"
import { AiOutlineStar } from "react-icons/ai"
import { BiExport } from "react-icons/bi"
import { FiCopy, FiEye, FiMaximize } from "react-icons/fi"
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io"


// Chart of accounts data structure
const chartData = [
  {
    id: 1,
    name: "Partners / Members fund",
    count: 2,
    underGroup: "Primary",
    item: "BALANCE SHEET",
    nature: "LIABILITIES",
    children: [
      {
        id: 11,
        name: "Capital Account",
        underGroup: "Partners / Members fund",
        item: "BALANCE SHEET",
        nature: "LIABILITIES",
        children: [],
      },
      {
        id: 12,
        name: "Reserves & Surplus",
        underGroup: "Partners / Members fund",
        item: "BALANCE SHEET",
        nature: "LIABILITIES",
        children: [],
      },
    ],
  },
  {
    id: 2,
    name: "Loans (Liability)",
    count: 2,
    underGroup: "Primary",
    item: "BALANCE SHEET",
    nature: "LIABILITIES",
    children: [
      {
        id: 21,
        name: "Secured Loans",
        count: 1,
        underGroup: "Loans (Liability)",
        item: "BALANCE SHEET",
        nature: "LIABILITIES",
        children: [
          {
            id: 211,
            name: "Bank OD/CC A/c",
            underGroup: "Secured Loans",
            item: "BALANCE SHEET",
            nature: "LIABILITIES",
            children: [],
          },
        ],
      },
      {
        id: 22,
        name: "Unsecured Loans",
        underGroup: "Loans (Liability)",
        item: "BALANCE SHEET",
        nature: "LIABILITIES",
        children: [],
      },
    ],
  },
  {
    id: 3,
    name: "Advances (Liability)",
    underGroup: "Primary",
    item: "BALANCE SHEET",
    nature: "LIABILITIES",
    children: [],
  },
  {
    id: 4,
    name: "Current Liabilities",
    count: 5,
    underGroup: "Primary",
    item: "BALANCE SHEET",
    nature: "LIABILITIES",
    children: [
      {
        id: 41,
        name: "Sundry Creditors",
        underGroup: "Current Liabilities",
        item: "BALANCE SHEET",
        nature: "LIABILITIES",
        children: [],
      },
      {
        id: 42,
        name: "GST payable",
        underGroup: "Current Liabilities",
        item: "BALANCE SHEET",
        nature: "LIABILITIES",
        children: [],
      },
      {
        id: 43,
        name: "Other Duties & Taxes",
        underGroup: "Current Liabilities",
        item: "BALANCE SHEET",
        nature: "LIABILITIES",
        children: [],
      },
      {
        id: 44,
        name: "Provisions",
        underGroup: "Current Liabilities",
        item: "BALANCE SHEET",
        nature: "LIABILITIES",
        children: [],
      },
      {
        id: 45,
        name: "Other Payable",
        underGroup: "Current Liabilities",
        item: "BALANCE SHEET",
        nature: "LIABILITIES",
        children: [],
      },
    ],
  },
  {
    id: 5,
    name: "Fixed Assets",
    underGroup: "Primary",
    item: "BALANCE SHEET",
    nature: "ASSETS",
    children: [],
  },
  {
    id: 6,
    name: "Investments",
    count: 2,
    underGroup: "Primary",
    item: "BALANCE SHEET",
    nature: "ASSETS",
    children: [
      {
        id: 61,
        name: "Long-term investments",
        underGroup: "Investments",
        item: "BALANCE SHEET",
        nature: "ASSETS",
        children: [],
      },
      {
        id: 62,
        name: "Short-term investments",
        underGroup: "Investments",
        item: "BALANCE SHEET",
        nature: "ASSETS",
        children: [],
      },
    ],
  },
  {
    id: 7,
    name: "Loans & Advances (Asset)",
    count: 1,
    underGroup: "Primary",
    item: "BALANCE SHEET",
    nature: "ASSETS",
    children: [
      {
        id: 71,
        name: "Deposits (Asset)",
        underGroup: "Loans & Advances (Asset)",
        item: "BALANCE SHEET",
        nature: "ASSETS",
        children: [],
      },
    ],
  },
  {
    id: 8,
    name: "Current Assets",
    count: 7,
    underGroup: "Primary",
    item: "BALANCE SHEET",
    nature: "ASSETS",
    children: [
      {
        id: 81,
        name: "Stock-in-Hand",
        underGroup: "Current Assets",
        item: "BALANCE SHEET",
        nature: "ASSETS",
        children: [],
      },
      {
        id: 82,
        name: "Sundry Debtors",
        underGroup: "Current Assets",
        item: "BALANCE SHEET",
        nature: "ASSETS",
        children: [],
      },
      {
        id: 83,
        name: "Bank Accounts",
        underGroup: "Current Assets",
        item: "BALANCE SHEET",
        nature: "ASSETS",
        children: [],
      },
      {
        id: 84,
        name: "Cash-in-Hand",
        underGroup: "Current Assets",
        item: "BALANCE SHEET",
        nature: "ASSETS",
        children: [],
      },
      {
        id: 85,
        name: "GST Receivable",
        underGroup: "Current Assets",
        item: "BALANCE SHEET",
        nature: "ASSETS",
        children: [],
      },
      {
        id: 86,
        name: "Other Current Assets",
        underGroup: "Current Assets",
        item: "BALANCE SHEET",
        nature: "ASSETS",
        children: [],
      },
      {
        id: 87,
        name: "Misc. Expenses (Asset)",
        underGroup: "Current Assets",
        item: "BALANCE SHEET",
        nature: "ASSETS",
        children: [],
      },
    ],
  },
  {
    id: 9,
    name: "Suspense A/c",
    underGroup: "Primary",
    item: "BALANCE SHEET",
    nature: "ASSETS",
    children: [],
  },
  {
    id: 10,
    name: "Sales Accounts",
    underGroup: "Primary",
    item: "PROFIT AND LOSS",
    nature: "INCOME",
    children: [],
  },
  {
    id: 11,
    name: "Direct Incomes",
    underGroup: "Primary",
    item: "PROFIT AND LOSS",
    nature: "INCOME",
    children: [],
  },
  {
    id: 12,
    name: "Indirect Incomes",
    underGroup: "Primary",
    item: "PROFIT AND LOSS",
    nature: "INCOME",
    children: [],
  },
  {
    id: 13,
    name: "Purchase Accounts",
    underGroup: "Primary",
    item: "PROFIT AND LOSS",
    nature: "EXPENSES",
    children: [],
  },
  {
    id: 14,
    name: "Direct Expenses",
    underGroup: "Primary",
    item: "PROFIT AND LOSS",
    nature: "EXPENSES",
    children: [],
  },
  {
    id: 15,
    name: "Indirect Expenses",
    underGroup: "Primary",
    item: "PROFIT AND LOSS",
    nature: "EXPENSES",
    children: [],
  },
]

export default function ChartsOfAccount({ collapsed }) {
  const [expanded, setExpanded] = useState([1, 2, 4, 6, 7, 8]) // Some groups expanded by default

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const renderRow = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expanded.includes(item.id)
    const paddingLeft = level * 20 + 16

    return (
      <>
        <tr key={item.id} className="border-b hover:bg-gray-50">
          <td className="px-4 py-3" style={{ paddingLeft: `${paddingLeft}px` }}>
            <div className="flex items-center space-x-2">
              {hasChildren ? (
                isExpanded ? (
                  <IoIosArrowDown
                    className="cursor-pointer text-gray-600 hover:text-gray-800"
                    onClick={() => toggleExpand(item.id)}
                  />
                ) : (
                  <IoIosArrowForward
                    className="cursor-pointer text-gray-600 hover:text-gray-800"
                    onClick={() => toggleExpand(item.id)}
                  />
                )
              ) : (
                <span className="inline-block w-4" />
              )}
              <span className="text-gray-900">
                {item.name}
                {item.count ? ` (${item.count})` : ""}
              </span>
            </div>
          </td>
          <td className="px-4 py-3 text-gray-700">{item.underGroup}</td>
          <td className="px-4 py-3 text-gray-700">{item.item}</td>
          <td className="px-4 py-3 text-gray-700">{item.nature}</td>
          <td className="px-4 py-3">
            <button className="text-blue-600 hover:text-blue-800 hover:underline">Add subgroup</button>
          </td>
        </tr>
        {hasChildren && isExpanded && item.children.map((child) => renderRow(child, level + 1))}
      </>
    )
  }

  const wrapperStyle = {
    marginLeft: collapsed ? "1.5rem" : "10.5rem",
    paddingTop: "2rem",
  }

  return (
    <div style={wrapperStyle} className="min-h-screen bg-gray-100 w-full transition-all duration-300">
      <div className="bg-white rounded shadow overflow-x-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-semibold flex items-center">
            Charts Of Account
            <AiOutlineStar className="ml-2 text-gray-400 hover:text-yellow-500 cursor-pointer" />
          </h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <BiExport className="w-5 h-5 hover:text-gray-800 cursor-pointer" />
            <FiCopy className="w-5 h-5 hover:text-gray-800 cursor-pointer" />
            <FiEye className="w-5 h-5 hover:text-gray-800 cursor-pointer" />
            <FiMaximize className="w-5 h-5 hover:text-gray-800 cursor-pointer" />
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border-r">
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      // Toggle between expand all and collapse all based on current state
                      const getAllIds = (items) => {
                        let ids = []
                        items.forEach((item) => {
                          if (item.children && item.children.length > 0) {
                            ids.push(item.id)
                            ids = [...ids, ...getAllIds(item.children)]
                          }
                        })
                        return ids
                      }
                      const allIds = getAllIds(chartData)
                      const allExpanded = allIds.every((id) => expanded.includes(id))

                      if (allExpanded) {
                        setExpanded([]) // Collapse all
                      } else {
                        setExpanded(allIds) // Expand all
                      }
                    }}
                    className="p-1 hover:bg-gray-200 rounded mr-3"
                    title="Expand/Collapse All"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </button>
                  Group Name
                  <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border-r">
                <div className="flex items-center">
                  Under Group
                  <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border-r">
                <div className="flex items-center">
                  Item
                  <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border-r">
                <div className="flex items-center">
                  Nature Of Group
                  <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>{chartData.map((item) => renderRow(item))}</tbody>
        </table>
      </div>
    </div>
  )
}
