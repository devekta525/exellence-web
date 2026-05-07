"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, MonitorPlay, Users, Globe2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  {
    id: 1,
    endValue: 187,
    suffix: "M+",
    label: "Impressions Generated",
    icon: Eye,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    id: 2,
    endValue: 670,
    suffix: "+",
    label: "Creatives Delivered",
    icon: MonitorPlay,
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
  {
    id: 3,
    endValue: 83,
    suffix: "+",
    label: "Accounts Managed",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    id: 4,
    endValue: 5,
    suffix: "+",
    label: "Countries",
    icon: Globe2,
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the section entrance
      gsap.fromTo(
        ".stats-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".stat-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 85%",
          },
        }
      );

      // Animate the numbers counting up
      numbersRef.current.forEach((el, index) => {
        if (!el) return;
        const targetValue = statsData[index].endValue;
        
        gsap.to(el, {
          innerText: targetValue,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          onUpdate: function () {
            // Update the text safely (GSAP updates innerText, we just format if needed)
            el.innerHTML = Math.ceil(Number(this.targets()[0].innerText)).toString();
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 bg-transparent relative">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 stats-header">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4">
            By The Numbers
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Real results from real partnerships. Here's what we've achieved together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 stats-grid">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="stat-card flex flex-col items-center text-center group"
              >
                {/* Icon Container */}
                <div
                  className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 shadow-lg`}
                >
                  <Icon className="w-8 h-8" />
                </div>

                {/* Number */}
                <div className="flex items-baseline justify-center mb-2">
                  <span
                    ref={(el) => {
                      numbersRef.current[index] = el;
                    }}
                    className="text-5xl md:text-6xl font-black font-outfit tracking-tight"
                  >
                    0
                  </span>
                  <span className="text-4xl md:text-5xl font-black font-outfit text-white">
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <p className="text-gray-400 font-medium text-lg">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
