// src/layouts/DefaultLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import { TopNavbar } from "./TopNavbar";

export default function DefaultLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Determine if we're on a full-screen route
  const fullScreenRoutes = [
    "/sales-invoice/create",
    "/quotation/create",
    "/delivery-challan/create",
    "/sales-return/create",
    "/expense/create",
    "/receipt/create",
    "/payment/create",
  ];
  const isFullScreen = fullScreenRoutes.includes(location.pathname);

  // Always collapse sidebar on full-screen routes
  useEffect(() => {
    if (isFullScreen) setCollapsed(true);
  }, [isFullScreen]);

  const toggleSidebar = () => setCollapsed((c) => !c);

  return (
    <div className="flex h-screen">
      {/* Sidebar always present; collapsed state applies */}
      <SideNavbar collapsed={collapsed} />

      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{
          // match collapsed (w-12 = 3rem) or expanded (w-48 = 12rem)
          paddingLeft: collapsed ? "3rem" : "12rem",
          paddingTop: "0rem",
        }}
      >
        {/* Hide topbar on full-screen routes */}
        {!isFullScreen && (
          <TopNavbar collapsed={collapsed} onToggleSidebar={toggleSidebar} />
        )}

        <main className="p-4 flex bg-gray-100 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}