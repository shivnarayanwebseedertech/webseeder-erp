// File: src/components/TopBannerAd.jsx
import React, { useState, useEffect } from "react";

const slides = [
  "https://app.themunim.com/assets/images/GstMainFiling.a15f0b89.png",
  "https://app.themunim.com/assets/images/newtdsTcsBanner.6472c267.svg",
  "https://app.themunim.com/assets/images/app-side-banner-account.033aeb9b.png",
  "https://app.themunim.com/assets/images/app-slide-banner-gst.c9c59758.png",
];

export default function TopBannerAd() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-screen  md:max-w-sm mx-auto px-0 overflow-hidden rounded-2xl shadow-lg">
      {/* Slides */}
      <div className="relative h-60">
        {slides.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`slide-${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full ${
              idx === current ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
