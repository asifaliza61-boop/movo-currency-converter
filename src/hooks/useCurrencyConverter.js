import { useState, useEffect, useCallback, useRef } from "react";

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const API_BASE = "https://api.frankfurter.app";

/**
 * useCurrencyConverter
 *
 * Custom hook that:
 * - Fetches live exchange rates from the Frankfurter public API (useEffect)
 * - Caches responses in a useRef map to avoid redundant network calls
 * - Cancels in-flight requests via AbortController stored in useRef
 * - Memoizes convert() and fetchRates() with useCallback to prevent re-renders
 */
export function useCurrencyConverter() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // useRef: persists across renders without triggering re-renders
  const cacheRef = useRef({}); // { [baseCurrency]: { data, ts, updatedAt } }
  const abortRef = useRef(null); // holds the current AbortController

  /**
   * fetchRates — wrapped in useCallback so its reference stays stable.
   * Components that call this in their own useEffect won't create
   * infinite loops because the function reference doesn't change.
   */
  const fetchRates = useCallback(async (base = "USD") => {
    const cached = cacheRef.current[base];

    // Return cached data if still fresh
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
      setRates(cached.data);
      setLastUpdated(cached.updatedAt);
      setLoading(false);
      return;
    }

    // Cancel any previous in-flight request
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/latest?from=${base}`, {
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch rates`);
      }

      const json = await response.json();

      // Include the base currency itself at rate 1
      const fullRates = { ...json.rates, [base]: 1 };

      // Store in cache
      cacheRef.current[base] = {
        data: fullRates,
        ts: Date.now(),
        updatedAt: json.date,
      };

      setRates(fullRates);
      setLastUpdated(json.date);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Could not fetch live rates. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * convert — memoized conversion utility.
   */
  const convert = useCallback((amount, from, to, ratesMap) => {
    if (!ratesMap || !ratesMap[to] || !amount) return null;
    if (from === to) return parseFloat(amount).toFixed(4);
    const result = parseFloat(amount) * ratesMap[to];
    return result.toFixed(4);
  }, []);

  // Fetch on mount with default base USD
  useEffect(() => {
    fetchRates("USD");

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetchRates]);

  return { rates, loading, error, lastUpdated, fetchRates, convert };
}
