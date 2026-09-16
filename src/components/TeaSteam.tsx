"use client";

import React from "react";

export default function TeaSteam() {
  return (
    <div className="relative w-12 h-14 flex flex-col items-center justify-end">
      {/* Steam Wisps */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 pointer-events-none flex justify-center">
        <svg viewBox="0 0 40 50" className="w-full h-full overflow-visible">
          <path
            d="M18 40 Q 15 28 22 18 T 19 2"
            fill="none"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="steam-wisp-1 filter blur-[1px]"
          />
          <path
            d="M23 42 Q 27 30 20 20 T 24 4"
            fill="none"
            stroke="rgba(255, 240, 220, 0.4)"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="steam-wisp-2 filter blur-[1px]"
          />
          <path
            d="M14 41 Q 12 32 16 22 T 13 6"
            fill="none"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="2"
            strokeLinecap="round"
            className="steam-wisp-3 filter blur-[1px]"
          />
        </svg>
      </div>

      {/* Terracotta Ceramic Cup */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Cup rim */}
        <div className="w-9 h-2.5 rounded-full bg-[#df8061] border border-[#f5b39b] shadow-inner" />
        {/* Cup body */}
        <div className="w-8 h-7 bg-gradient-to-b from-[#c25e3e] to-[#9b4124] rounded-b-xl shadow-md relative">
          {/* Handle */}
          <div className="absolute right-[-6px] top-1.5 w-3 h-4 border-2 border-[#c25e3e] rounded-r-full" />
        </div>
        {/* Saucer */}
        <div className="w-11 h-1.5 rounded-full bg-[#8c381e] shadow-sm -mt-0.5" />
      </div>
    </div>
  );
}
