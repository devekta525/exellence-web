"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disable scrolling while splash screen is active
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        document.body.style.overflow = "auto";
      },
    });

    // Animate the logo and text
    tl.fromTo(
      ".splash-logo",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        ".splash-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .to(".splash-content", {
        opacity: 0,
        y: -50,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.in",
      })
      .to(".splash-container", {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });

    return () => {
      document.body.style.overflow = "auto";
      tl.kill();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="splash-container fixed inset-0 z-[100] bg-[radial-gradient(circle_at_center,#0c1a3d_0%,#020617_100%)] flex items-center justify-center">
      <div className="splash-content flex flex-col items-center">
        {/* Logo Icon */}
        <div className="splash-logo mb-6">
          <img src="/dviora-logo.png" alt="Dviora Logo" className="w-40 h-40 object-contain" />
        </div>

        {/* Brand Text */}
        <div className="splash-text text-4xl tracking-[0.2em] font-light text-gray-300 uppercase">
          Dviora
        </div>
      </div>
    </div>
  );
}
