// File: src/components/FAQs.jsx
import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

export default function FAQs({ items = [], moreHelpUrl = '#' }) {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">FAQs</h2>
        <div className="space-y-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center px-4 py-3 focus:outline-none"
              >
                <span>{item.question}</span>
                {openIndex === i ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-gray-600">
                  {item.answer.startsWith('http') ? (
                    <a
                      href={item.answer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {item.answer}
                    </a>
                  ) : (
                    item.answer
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <a
          href={moreHelpUrl}
          className="text-blue-600 hover:underline font-medium block mt-2"
        >
          Need More Help...
        </a>
      </div>
    </div>
  );
}