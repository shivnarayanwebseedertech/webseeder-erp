// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

// Auth & Setup Pages
import Login from "./Auth and Setup Pages/Login";
import ForgotPassword from "./Auth and Setup Pages/ForgotPassword";
import CreateCompanyPage from "./Auth and Setup Pages/CreateCompanyPage";
import SubscriptionPage from "./Auth and Setup Pages/SubscriptionPage";

// Layouts & Main App
import { TopNavbar } from "./Layouts/TopNavbar";
import SideNavbar from "./Layouts/SideNavbar";

// Pages
import DashboardPage from "./Pages/DashboardPage";
import ChartsOfAccount from "./Pages/ChartsOfAccount";
import Account from "./Pages/Account";
import Transporter from "./Pages/Transporter";
import Item from "./Pages/Item";
import ItemGroup from "./Pages/ItemGroup";
import ItemCategory from "./Pages/ItemCategory";
import Unit from "./Pages/Unit";
import SalesInvoicePage from "./Pages/SalesInvoice";
import CreateNewSalesInvoice from "./Pages/CreateNewSalesInvoice";

import VideoExplain from "./Components/VideoExplain";
import QuotationForm from "./Pages/QuotationForm";
import DeliveryChallan from "./Pages/DeliveryChallan";
import SalesReturnForm from "./Pages/SalesReturnForm";
import ExpenseForm from "./Pages/ExpenseForm";
import ReceiptForm from "./Pages/ReceiptForm";
import PaymentForm from "./Pages/PaymentForm";
import CreateJournalVoucher from "./Pages/CreateJournalVoucher";
import CreateAccount from "./Pages/CreateAccountForm";
import AddStockAdjust from "./Pages/AddStockAdjust";
import ContraEntryForm from "./Pages/ContraEntryForm";

// A simple authentication check (replace with real auth logic)
const isAuthenticated = () => !!localStorage.getItem("authToken");

// Protected layout wrapper
function ProtectedLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // List your “full‑screen” paths here:
  const fullScreenRoutes = [
    "/sales-invoice/create",
    "/quotation/create",
    "/delivery-challan/create",
    "/sales-return/create",
    "/expense/create",
    "/receipt/create",
    "/payment/create",
    "/journal-voucher/create",
    "/account/create",
    "/stock-adjustment/add",
    "/contra/create",
  ];
  const isFullScreen = fullScreenRoutes.includes(location.pathname); // ← ADDED

  useEffect(() => {
    // if (!isAuthenticated()) {
    //   navigate("/log-in", { replace: true });
    // }
  }, [navigate]);

  // Auto‑collapse sidebar on full‑screen routes:
  useEffect(() => {
    if (isFullScreen) setCollapsed(true);
  }, [isFullScreen]);

  const toggleSidebar = () => setCollapsed((c) => !c);
  const ownerNumber = "8085264961";
  const supportPin = "7833085872";

  return (
    <div className="flex h-screen">
      <SideNavbar collapsed={collapsed} />
      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ paddingLeft: "0.5rem", paddingTop: "0rem" }}
      >
        {/* only render topbar when NOT full‑screen */}
        {!isFullScreen && (
          <TopNavbar
            collapsed={collapsed}
            onToggleSidebar={toggleSidebar}
            companyName="My Company"
            onSwitchCompany={() => {}}
            ownerNumber={ownerNumber}
            supportPin={supportPin}
          />
        )}

        <main className="p-4 flex bg-gray-100 flex-1 overflow-auto">
          <Routes>
            {/* Main App Routes */}
            <Route
              path="dashboard"
              element={<DashboardPage collapsed={collapsed} />}
            />
            <Route
              path="charts-of-account"
              element={<ChartsOfAccount collapsed={collapsed} />}
            />
            <Route path="account" element={<Account collapsed={collapsed} />} />
            <Route
              path="transporter"
              element={<Transporter collapsed={collapsed} />}
            />
            <Route path="item" element={<Item collapsed={collapsed} />} />
            <Route
              path="item-group"
              element={<ItemGroup collapsed={collapsed} />}
            />
            <Route
              path="item-category"
              element={<ItemCategory collapsed={collapsed} />}
            />
            <Route path="unit" element={<Unit collapsed={collapsed} />} />
            <Route
              path="sales-invoice"
              element={<SalesInvoicePage collapsed={collapsed} />}
            />
            <Route
              path="sales-invoice/create"
              element={
                <CreateNewSalesInvoice
                  onCancel={() => {
                    setCollapsed(false);
                    navigate("/sales-invoice", { replace: true });
                  }}
                />
              }
            />
            <Route
              path="quotation"
              element={
                <VideoExplain
                  collapsed={collapsed}
                  title="Do estimate for win the deal!"
                  subtitle="With perfect estimation, give your customers an offer they can't reject!"
                  buttonLabel="Create Quotation"
                  buttonRoute="/quotation/create"
                  videoId="YOUR_VIDEO_ID"
                />
              }
            />
            <Route path="quotation/create" element={<QuotationForm />} />
            <Route
              path="delivery-challan"
              element={
                <VideoExplain
                  collapsed={collapsed}
                  title="Keep records of delivered goods efficiently!"
                  subtitle="Create, convert to invoice, and print delivery challan."
                  buttonLabel="Create Delivery Challan"
                  buttonRoute="/delivery-challan/create"
                  imageSrc="/path/to/logo.png"
                />
              }
            />
            <Route
              path="delivery-challan/create"
              element={<DeliveryChallan />}
            />
            <Route
              path="sales-return"
              element={
                <VideoExplain
                  collapsed={collapsed}
                  title="Do you get any goods back from your customers?"
                  subtitle="Generate sales returns and apply against invoices when returning goods by your customers."
                  buttonLabel="Create Sales Return"
                  buttonRoute="/sales-return/create"
                  imageSrc="/path/to/logo.png"
                />
              }
            />
            <Route path="sales-return/create" element={<SalesReturnForm />} />
            <Route
              path="expense"
              element={
                <VideoExplain
                  collapsed={collapsed}
                  title="Manage your expenses."
                  subtitle="Create, manage and update expenses from here."
                  buttonLabel="Create Expense"
                  buttonRoute="/expense/create"
                  imageSrc="/path/to/logo.png"
                />
              }
            />
            <Route path="expense/create" element={<ExpenseForm />} />
            <Route
              path="receipt"
              element={
                <VideoExplain
                  collapsed={collapsed}
                  title="Record your income against sales invoices!"
                  subtitle="Create, modify and send the receipt from here."
                  buttonLabel="Create Receipt"
                  buttonRoute="/receipt/create"
                  imageSrc="/path/to/logo.png"
                />
              }
            />
            <Route path="receipt/create" element={<ReceiptForm />} />
            <Route
              path="payment"
              element={
                <VideoExplain
                  collapsed={collapsed}
                  title="You haven't paid anything yet!"
                  subtitle="Your payment against bills will show up here."
                  buttonLabel="Create Payment"
                  buttonRoute="/payment/create"
                  imageSrc="/path/to/logo.png"
                />
              }
            />
            <Route path="payment/create" element={<PaymentForm />} />
            <Route
              path="/journal-voucher"
              element={
                <VideoExplain
                  collapsed={collapsed}
                  title="Manage your manufactured item stocks."
                  subtitle="Create, manage and update manufactured stock entries."
                  buttonLabel="Create Journal Voucher"
                  buttonRoute="/journal-voucher/create"
                  imageSrc="/path/to/logo.png"
                />
              }
            />
            <Route
              path="/journal-voucher/create"
              element={<CreateJournalVoucher />}
            />
            <Route
              path="/bank-reconciliation-list"
              element={
                <VideoExplain
                  collapsed={collapsed}
                  title="Manage bookkeeping entries!"
                  subtitle="Create account master for bookkeeping."
                  buttonLabel="Create Bank Account"
                  buttonRoute="/account/create"
                  imageSrc="/path/to/logo.png"
                />
              }
            />
            <Route path="/account/create" element={<CreateAccount />} />
            <Route
              path="/stock-adjustment"
              element={
                <VideoExplain
                  collapsed={collapsed}
                  title="Manage your inventory!!"
                  subtitle="Manage your stock using adjustment, wastage, and consumption.."
                  buttonLabel="Adjust Stock"
                  buttonRoute="/stock-adjustment/add"
                  imageSrc="/path/to/logo.png"
                />
              }
            />
            <Route path="/stock-adjustment/add" element={<AddStockAdjust />} />

            <Route
              path="/contra"
              element={
                <VideoExplain
                  collapsed={collapsed}
                  title="Manage your inventory!!"
                  subtitle="Manage your stock using adjustment, wastage, and consumption.."
                  buttonLabel="Adjust Stock"
                  buttonRoute="/contra/create"
                  imageSrc="/path/to/logo.png"
                />
              }
            />
            <Route path="/contra/create" element={<ContraEntryForm />} />

            {/* catch-all inside protected routes */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- AUTH & SETUP ROUTES --- */}
        <Route path="/" element={<Navigate to="/log-in" replace />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/company/create" element={<CreateCompanyPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />

        {/* --- PROTECTED APP LAYOUT --- */}
        <Route path="/*" element={<ProtectedLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
