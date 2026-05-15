/**
 * Format a number as currency string with appropriate decimal places
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export function formatRate(value, decimals = 4) {
  if (value === null || value === undefined) return "—";
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format a conversion result
 * @param {number} value
 * @returns {string}
 */
export function formatResult(value) {
  if (value === null || value === undefined) return "—";
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

/**
 * Format a date string to readable format
 * @param {string} dateString  e.g. "2024-11-15"
 * @returns {string}
 */
export function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Get current time as HH:MM string
 * @returns {string}
 */
export function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get current date as readable string
 * @returns {string}
 */
export function getCurrentDate() {
  return new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
