import React from "react";
import { CURRENCY_NAMES } from "../data/currencies";

export default function RateCard({ currency, rate, loading, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-4 text-left cursor-pointer transition-all duration-200 hover:border-[#CFF008] hover:bg-[#222] group w-full"
    >
      <p className="text-xs font-bold text-[#8F8F8F] mb-2 tracking-wider uppercase group-hover:text-[#CFF008] transition-colors">{currency}</p>
      {loading ? (
        <div className="skeleton-shimmer h-6 w-16 rounded mb-1" />
      ) : (
        <p className="text-[22px] font-extrabold text-white tracking-tight leading-none">{rate ? Number(rate).toFixed(4) : "—"}</p>
      )}
      <p className="text-[11px] text-[#555] mt-1.5 font-medium truncate">{CURRENCY_NAMES[currency] || currency}</p>
    </button>
  );
}
