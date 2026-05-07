"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-[#38bdf8] to-[#818cf8] text-white shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:scale-110 transition-transform duration-300 focus:outline-none"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-8 h-8" strokeWidth={2.5} />
        </button>
      )}
    </>
  );
}
