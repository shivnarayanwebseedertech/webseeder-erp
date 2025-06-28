import React, { useState } from "react";
import DashboardHeader from "../Components/DashboardHeader";
import BusinessOperations from "../Components/BusinessOperations";
import RevenueProjections from "../Components/RevenueProjections";
import QuickAccess from "../Components/QuickAccess";
import TotalAvailableIncome from "../Components/TotalAvailableIncome";
import { RevenueInflow } from "../Components/RevenueInflow";
import { RevenueManagement } from "../Components/RevenueManagement";
import SaleAnalytics from "../Components/SaleAnalytics";
import RecentActivity from "../Components/RecentActivity";

import SetupGuide from "../Components/SetupGuide";
import FAQs from "../Components/FAQs";
import FeedbackRating from "../Components/FeedbackRating";
import FollowUs from "../Components/FollowUs";
import TopBannerAd from "../Components/topbannerad";

export default function DashboardPage({ collapsed }) {
  const [dashboardFilter, setDashboardFilter] = useState("Current month");

  // FAQ & feedback data/functions
  const faqList = [
    {
      question: "Is my data safe on Munim?",
      answer: "Yes, we use industry-standard encryption and storage practices.",
    },
    {
      question: "How to Find HSN/SAC Code?",
      answer: "https://cbic-gst.gov.in/gst-goods-services-rates.html",
    },
  ];
  const handleRating = async (value) => {
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: value }),
      });
    } catch (err) {
      console.error("Failed to submit feedback", err);
    }
  };

  return (
    <div
      className="container mx-auto px-2 bg-gray-100 min-h-screen transition-all duration-300 flex"
      style={{
        marginLeft: collapsed ? "1.5rem" : "10.5rem",
        paddingTop: "2.5rem", // account for fixed navbar
      }}
    >
      {/* Main dashboard widgets */}
      <div className="flex-1 space-y-1">
        <DashboardHeader onFilterChange={setDashboardFilter} />
        <BusinessOperations externalFilter={dashboardFilter} />
        <RevenueProjections />
        <QuickAccess />
        <TotalAvailableIncome />

        <div className="flex flex-col lg:flex-row gap-0.5">
          <RevenueInflow />
          <RevenueManagement />
        </div>

        <div className="flex flex-col lg:flex-row gap-0.5">
          <SaleAnalytics />
          <RecentActivity />
        </div>
      </div>

      {/* Right sidebar area - only here */}
      <aside className="w-full max-w-sm space-y-1 ml-1">
        <TopBannerAd />
        <SetupGuide />

        <FAQs items={faqList} moreHelpUrl="/support" />
        <FeedbackRating onRate={handleRating} />
        <FollowUs
          links={{
            facebook: "https://facebook.com/yourpage",
            instagram: "https://instagram.com/yourpage",
            youtube: "https://youtube.com/yourchannel",
            linkedin: "https://linkedin.com/company/yourcompany",
            x: "https://twitter.com/yourhandle",
          }}
        />
      </aside>
    </div>
  );
}
