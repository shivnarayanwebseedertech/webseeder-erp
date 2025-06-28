import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiHomeSmile2Line, RiHandCoinLine } from "react-icons/ri";
import { MdChatBubbleOutline } from "react-icons/md";
import { PiSuitcase } from "react-icons/pi";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import {
  FiShoppingCart,
  FiCreditCard,
  FiDollarSign,
  FiSettings,
  FiChevronRight,
} from "react-icons/fi";
import {
  AiOutlineFileText,
  AiOutlineCalculator,
  AiOutlineDownload,
} from "react-icons/ai";
import { GiSwapBag } from "react-icons/gi";
import { FaUniversity, FaBook, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo.png";

const SideNavbar = ({ collapsed, onToggle }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const handleNavigation = (to) => {
    if (to) navigate(to);
  };

  const handleMenuClick = (item) => {
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      setActiveSubmenu((prev) => (prev === item.label ? null : item.label));
    } else {
      setActiveSubmenu(null);
      handleNavigation(item.to);
    }
  };

  const handleSubmenuClick = (to) => {
    handleNavigation(to);
    // submenu remains open until overlay click
  };

  const sections = [
    {
      title: "",
      items: [
        { label: "Dashboard", icon: <RiHomeSmile2Line />, to: "/dashboard" },
      ],
    },
    {
      title: "Master",
      items: [
        {
          label: "Account Master",
          icon: <PiSuitcase className="font-extrabold" />,
          children: [
            { label: "Charts Of Account", to: "/charts-of-account" },
            { label: "Account", to: "/account" },
            { label: "Transporter", to: "/transporter" },
          ],
        },
        {
          label: "Item Master",
          icon: <HiOutlineArchiveBox />,
          children: [
            { label: "Item", to: "/item" },
            { label: "Item Group", to: "/item-group" },
            { label: "Item Category", to: "/item-category" },
            { label: "Unit", to: "/unit" },
          ],
        },
      ],
    },
    {
      title: "Transactions",
      items: [
        {
          label: "Sales",
          icon: <FiShoppingCart />,
          to: "/sales-invoice",
          icon: <HiOutlineArchiveBox />,
          children: [
            { label: "Sales Invoice", to: "/sales-invoice" },
            { label: "Quotation", to: "/quotation" },
            { label: "Delivery Challan", to: "/delivery-challan" },
            { label: "Sales Return", to: "/sales-return" },
          ],
        },

        {
          label: "Purchase",
          icon: <FiCreditCard />,
          to: "/purchase",
          icon: <HiOutlineArchiveBox />,
          children: [
            { label: "Purchase Bill", to: "/purchase-bill" },
            { label: "Purchase Order", to: "purchase-order" },
            { label: "Purchase Return", to: "/purchase-return" },
          ],
        },
        {
          label: "Expenses",
          icon: <FiDollarSign />,
          to: "/expenses",
        },
      ],
    },
    {
      title: "Core Accounting",
      items: [
        {
          label: "Receipt",
          icon: <AiOutlineFileText />,
          to: "/receipt",
          children: [
            { label: "Cash Receipt", to: "/cash-receipt" },
            { label: "Bank Receipt", to: "/bank-receipt" },
          ],
        },
        {
          label: "Payment",
          icon: <RiHandCoinLine />,
          to: "/payment",
          children: [
            { label: "Cash Payment", to: "/cash-payment" },
            { label: "Bank Payment", to: "/bank-payment" },
          ],
        },
        {
          label: "Contra Entry",
          icon: <GiSwapBag />,
          to: "/contra",
          children: [
            { label: "Bank to Cash", to: "/bank-to-cash" },
            { label: "Cash to Bank", to: "/cash-to-bank" },
          ],
        },
        {
          label: "Bank Reconciliation",
          icon: <FaUniversity />,
          to: "/bank-recon",
        },
        { label: "Journal Voucher", icon: <FaBook />, to: "/journal" },
      ],
    },
    {
      title: "Business review",
      items: [{ label: "Reports", icon: <FiShoppingCart />, to: "/reports" }],
    },
    {
      title: "Inventory",
      items: [
        {
          label: "Stock Adjustment",
          icon: <FiShoppingCart />,
          to: "/stock-adjustment",
        },
        {
          label: "Stock Journals",
          icon: <FiCreditCard />,
          to: "/stock-journals",
        },
      ],
    },
  ];

  const bottomItems = [
    { label: "Live chat", icon: <MdChatBubbleOutline />, badge: "Online" },
    { label: "Whatsapp", icon: <FaWhatsapp /> },
    { label: "Try GST Filing", icon: <AiOutlineCalculator /> },
    { label: "Download Desktop App", icon: <AiOutlineDownload /> },
    { label: "Settings", icon: <FiSettings />, to: "/settings" },
  ];

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 bg-white border-r flex flex-col justify-between transition-all duration-300 ease-in-out z-30 ${
          collapsed ? "w-12 overflow-hidden" : "w-48"
        }`}
      >
        {/* Logo */}
        <div
          className={`px-0 py-1 flex items-center transition-opacity duration-300`}
        >
          <div className="p-2   ">
            <img src={logo} className={`${collapsed ? "h-full w-full" : "h-full w-1/2"}`} alt="logo" />
          </div>
          {/* <span
            className={`ml-2 text-sm font-semibold text-gray-800 transition-opacity duration-300 ${
              collapsed
                ? "opacity-0 pointer-events-none w-0 overflow-hidden"
                : "opacity-100"
            }`}
          >
            Webseeder
          </span> */}
        </div>

        {/* Main Nav */}
        <div className="flex-1 overflow-y-auto">
          {sections.map((section) => (
            <div key={section.title} className="mt-3">
              {!collapsed && section.title && (
                <p className="text-gray-400 uppercase text-xs font-bold px-2 mb-1.5">
                  {section.title}
                </p>
              )}
              {section.items.map((item) => {
                const isActive = pathname === item.to;
                const hasChildren = item.children && item.children.length > 0;
                const isSubmenuActive = activeSubmenu === item.label;

                return (
                  <div key={item.label} className="relative">
                    <div
                      className={`flex items-center px-3 py-1.5 rounded cursor-pointer transition-colors ${
                        isActive || isSubmenuActive
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                      }`}
                      onClick={() => handleMenuClick(item)}
                    >
                      <span className="text-lg mr-2">{item.icon}</span>
                      {!collapsed && (
                        <span className="flex-1 text-xs font-semibold">
                          {item.label}
                        </span>
                      )}
                      {!collapsed && hasChildren && (
                        <FiChevronRight className="text-sm" />
                      )}
                      {!collapsed && !hasChildren && (
                        <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center hover:border-blue-500 hover:bg-blue-50">
                          <span className="text-gray-400 hover:text-blue-500 text-xs">
                            +
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Submenu */}
                    {isSubmenuActive && hasChildren && (
                      <div
                        className={`mt-2 ml-${
                          collapsed ? "12" : "48"
                        } bg-white border rounded shadow-lg z-40`}
                      >
                        {item.children.map((child) => {
                          const subActive = pathname === child.to;
                          return (
                            <div
                              key={child.label}
                              className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors border-b border-gray-100 ${
                                subActive
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                              onClick={() => handleSubmenuClick(child.to)}
                            >
                              <span className="text-xs font-medium">
                                {child.label}
                              </span>
                              <div className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center hover:border-blue-500 hover:bg-blue-50">
                                <span className="text-gray-400 hover:text-blue-500 text-sm">
                                  +
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Nav */}
        <div className="border-t bg-white px-1.5 py-3 sticky bottom-0">
          {bottomItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between px-2 font-semibold py-1.5 text-gray-700 hover:bg-blue-50 rounded cursor-pointer transition-colors text-xs"
              onClick={() => handleNavigation(item.to)}
            >
              <div className="flex items-center">
                <span className="text-base mr-2">{item.icon}</span>
                {!collapsed && <span className="text-2xs">{item.label}</span>}
              </div>
              {!collapsed && item.badge && (
                <span className="text-2xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Overlay & closing submenu */}
      {activeSubmenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setActiveSubmenu(null)}
        />
      )}
    </>
  );
};

export default SideNavbar;
