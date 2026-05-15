import React from "react";
import { CURRENCY_NAMES } from "../data/currencies";

export default function CurrencyField({ label, currency, onCurrencyChange, value, onValueChange, readOnly = false, inputRef }) {
  const currencies = Object.keys(CURRENCY_NAMES);

  return (
    <div className="flex-1">
      <p className="text-xs font-bold tracking-widest text-[#8F8F8F] uppercase mb-3">{label}</p>
      <div className="bg-[#131313] border border-[#2A2A2A] rounded-2xl p-4 flex flex-col gap-3 focus-within:border-[#3A3A3A] transition-colors">
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="bg-transparent border-none outline-none font-urbanist text-[15px] font-bold text-white cursor-pointer w-full appearance-none"
        >
          {currencies.map((c) => (
            <option key={c} value={c} className="bg-[#131313]">{c} — {CURRENCY_NAMES[c]}</option>
          ))}
        </select>

        {readOnly ? (
          <div className={`text-[32px] font-black tracking-tight leading-none ${value ? "text-[#CFF008]" : "text-[#444]"}`}>
            {value ? Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : "—"}
          </div>
        ) : (
          <input
            ref={inputRef}
            type="number"
            min="0"
            step="any"
            value={value}
            placeholder="0.00"
            onChange={(e) => onValueChange(e.target.value)}
            className="bg-transparent border-none outline-none font-urbanist text-[32px] font-black tracking-tight text-[#CFF008] w-full placeholder-[#444]"
          />
        )}
      </div>
    </div>
  );
}
