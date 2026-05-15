import React, { useState } from "react";

export default function SwapButton({ onClick }) {
  const [flipped, setFlipped] = useState(false);
  const handleClick = () => { setFlipped(f => !f); onClick(); };

  return (
    <button
      onClick={handleClick}
      title="Swap currencies"
      style={{ transform: flipped ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.35s ease" }}
      className="w-12 h-12 rounded-full bg-[#CFF008] border-none flex items-center justify-center text-[#131313] text-xl font-bold cursor-pointer flex-shrink-0 hover:bg-[#d6ff1a] hover:scale-110 active:scale-95 self-end mb-1"
    >
      ⇄
    </button>
  );
}
