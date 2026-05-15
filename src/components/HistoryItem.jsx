/**
 * HistoryItem
 * Renders a single row in the conversion history list.
 *
 * Props:
 *  - item {object} - A history entry with shape:
 *      { id, from, to, amount, result, rate, time, date }
 */
function HistoryItem({ item }) {
  const { from, to, amount, result, rate, time, date } = item;

  const formattedAmount = amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });

  const formattedResult = parseFloat(result).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });

  return (
    <div className="history-item">

      {/* Left: conversion summary */}
      <div>
        <div className="flex items-center flex-wrap gap-1">
          <span className="text-base font-bold text-white">
            {formattedAmount} {from}
          </span>
          <span className="text-lime font-bold mx-1">→</span>
          <span className="text-base font-bold text-lime">
            {formattedResult} {to}
          </span>
        </div>
        <p className="text-xs text-[#555] font-medium mt-1.5">
          {date} · {time}
        </p>
      </div>

      {/* Right: rate badge */}
      <div className="shrink-0 bg-dark border border-dark-border rounded-full px-3.5 py-1.5 text-xs font-semibold text-muted hidden sm:block">
        1 {from} = {rate?.toFixed(4)} {to}
      </div>

    </div>
  );
}

export default HistoryItem;
