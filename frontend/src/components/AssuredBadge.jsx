import React from 'react';

export default function AssuredBadge({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center text-[10px] font-bold italic tracking-wider select-none ${className}`}
      title="Flipkart Assured Quality"
    >
      <span className="text-[#2874f0] bg-blue-50 px-1 py-0.5 rounded-l border border-[#2874f0]/30 border-r-0">
        Plus
      </span>
      <span className="bg-[#2874f0] text-[#ffe500] px-1.5 py-0.5 rounded-r flex items-center gap-0.5 shadow-xs">
        <span className="text-[9px]">★</span>
        <span className="text-[10px] uppercase font-black text-white">Assured</span>
      </span>
    </span>
  );
}
