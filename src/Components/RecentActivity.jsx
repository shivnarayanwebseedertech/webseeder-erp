// File: src/components/RecentActivity.jsx
import React from "react";

const activities = [
  { id: 1, phone: "8085262626", datetime: "June 19th 2025, 10:14 am", text: "You have created company: My Company successfully." },
  { id: 2, phone: "8085626262", datetime: "June 18th 2025, 10:52 am", text: "You have sign up successfully." },
];

export default function RecentActivity() {
  return (
    <div className="bg-white w-1/2 rounded-lg border border-gray-200 p-6">
      <h2 className="text-base font-medium text-gray-800 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((act) => (
          <div key={act.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 text-xs">
                {act.id}
              </div>
            </div>
            <div className="flex-grow border-l border-gray-200 pl-3">
              <div className="text-sm font-medium text-gray-800">{act.phone}</div>
              <div className="text-xs text-gray-500">{act.datetime}</div>
              <div className="text-sm text-gray-600 mt-1">{act.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
