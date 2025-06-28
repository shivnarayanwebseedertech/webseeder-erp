// File: src/Components/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TopNavbar } from "./Layouts/TopNavbar";

import DashboardPage from "./Pages/DashboardPage";
import ChartsOfAccount from "./Pages/ChartsOfAccount"; // make sure this filename matches exactly
import SideNavbar from "./Layouts/SideNavbar";
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

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed((c) => !c);

  // Profile dropdown data
  const ownerNumber = "8085264961";
  const supportPin = "7833085872";

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <SideNavbar collapsed={collapsed} />
        <div
          className="flex-1 flex flex-col transition-all duration-300"
          style={{ paddingLeft: "0.5rem", paddingTop: "0rem" }}
        >
          <TopNavbar
            collapsed={collapsed}
            onToggleSidebar={toggleSidebar}
            companyName="My Company"
            onSwitchCompany={() => {}}
            ownerNumber={ownerNumber}
            supportPin={supportPin}
          />

          <main className="p-4 flex bg-gray-100 flex-1 overflow-auto">
            <Routes>
              {/* Dashboard Route */}
              <Route
                path="/dashboard"
                element={<DashboardPage collapsed={collapsed} />}
              />
              {/* Charts Of Account Route */}
              <Route
                path="/charts-of-account"
                element={<ChartsOfAccount collapsed={collapsed} />}
              />

              <Route
                path="/account"
                element={<Account collapsed={collapsed} />}
              />
              <Route
                path="/transporter"
                element={<Transporter collapsed={collapsed} />}
              />
              <Route path="/item" element={<Item collapsed={collapsed} />} />
              <Route
                path="/item-group"
                element={<ItemGroup collapsed={collapsed} />}
              />
              <Route
                path="/item-category"
                element={<ItemCategory collapsed={collapsed} />}
              />
              <Route path="/unit" element={<Unit collapsed={collapsed} />} />
              <Route
                path="/sales-invoice"
                element={<SalesInvoicePage collapsed={collapsed} />}
              />
              <Route
                path="/sales-invoice/create"
                element={
                  <CreateNewSalesInvoice
                    onCancel={() => {
                      setCollapsed(false); // re-open sidebar on cancel
                      navigate("/sales-invoice/create");
                    }}
                    /* other props */
                  />
                }
              />
              <Route
                path="/quotation"
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
              <Route path="/quotation/create" element={<QuotationForm />} />
              <Route
                path="/delivery-challan"
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
              <Route path="/delivery-challan/create" element={<DeliveryChallan />} />
              <Route
                path="/sales-return"
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
                path="/purchase-order"
                element={
                  <VideoExplain
                    collapsed={collapsed}
                    title="Manage your purchase orders from here!"
                    subtitle="Create, change, approve and send purchase orders to your vendors."
                    buttonLabel="Create Purchase Order"
                    imageSrc="/path/to/logo.png"
                  />
                }
              />
              <Route
                path="/purchase-return"
                element={
                  <VideoExplain
                    collapsed={collapsed}
                    title="Do you get any credits?"
                    subtitle="Generate vendor credits and apply them to bills when returning goods to your vendor."
                    buttonLabel="Create Return"
                    
                    imageSrc="/path/to/logo.png"
                  />
                }
              />
              
              <Route
                path="/expense"
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
              <Route path="expense/create" element={<ExpenseForm/>} />
              <Route
                path="/receipt"
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
              <Route path="/receipt/create" element={<ReceiptForm/>} />
              <Route
                path="/payment"
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
              <Route path="/payment/create" element={<PaymentForm/>} />
              <Route
                path="/contra"
                element={
                  <VideoExplain
                    collapsed={collapsed}
                    title="Manage your contra entry."
                    subtitle="Create, manage and update accounting contra entries."
                    buttonLabel="Create Contra Entry"
                    imageSrc="/path/to/logo.png"
                  />
                }
              />
              <Route
                path="/bank-reconciliation-list"
                element={
                  <VideoExplain
                    collapsed={collapsed}
                    title="Manage bookkeeping entries!"
                    subtitle="Create account master for bookkeeping."
                    buttonLabel="Create Bank Account"
                    imageSrc="/path/to/logo.png"
                  />
                }
              />
              <Route
                path="/journal-voucher"
                element={
                  <VideoExplain
                    collapsed={collapsed}
                    title="Manage your manufactured item stocks."
                    subtitle="Create, manage and update manufactured stock entries."
                    buttonLabel="Create Journal Voucher"
                    imageSrc="/path/to/logo.png"
                  />
                }
              />
              <Route
                path="/stock-adjustment"
                element={
                  <VideoExplain
                    collapsed={collapsed}
                    title="Manage your inventory!!"
                    subtitle="Manage your stock using adjustment, wastage, and consumption."
                    buttonLabel="Adjust Stock"
                    imageSrc="/path/to/logo.png"
                  />
                }
              />
              <Route
                path="/stock-journal"
                element={
                  <VideoExplain
                    collapsed={collapsed}
                    title="Manage your manufactured item stocks."
                    subtitle="Create, manage and update manufactured stock entries."
                    buttonLabel="Create Stock Journal"
                    imageSrc="/path/to/logo.png"
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
