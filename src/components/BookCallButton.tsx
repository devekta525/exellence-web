"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function BookCallButton() {
  const { openContactModal } = useModal();

  return (
    <button 
      onClick={openContactModal}
      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-bold py-4 rounded-2xl hover:scale-105 transition-transform"
    >
      Book a Strategy Call
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}
