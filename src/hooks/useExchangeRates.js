import { useState, useEffect, useCallback, useRef } from 'react'
import { saveCacheRates, loadCacheRates } from '../utils/storage'

// NOTE: Replace with your own key from https://www.exchangerate-api.com/
// The free plan gives 1,500 requests/month — sufficient for dev/demo
const API_KEY = 'ecb840a20c1733db71dc0446'
const BASE_URL = 'https://v6.exchangerate-api.com/v6'

export const useExchangeRates = (baseCurrency = 'PKR') => {
  const [rates, setRates] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [nextUpdate, setNextUpdate] = useState(null)
  const abortControllerRef = useRef(null)
  const intervalRef = useRef(null)

  const fetchRates = useCallback(async (currency = baseCurrency, force = false) => {
    // Check cache first (10-min TTL)
    if (!force) {
      const cached = loadCacheRates(currency)
      if (cached) {
        setRates(cached.conversion_rates)
        setLastUpdated(cached.time_last_update_utc)
        setNextUpdate(cached.time_next_update_utc)
        setLoading(false)
        setError(null)
        return
      }
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `${BASE_URL}/${API_KEY}/latest/${currency}`,
        { signal: abortControllerRef.current.signal }
      )

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to fetch rates`)
      }

      const data = await res.json()

      if (data.result === 'error') {
        throw new Error(data['error-type'] || 'API error')
      }

      // Cache the result
      saveCacheRates(currency, data)

      setRates(data.conversion_rates)
      setLastUpdated(data.time_last_update_utc)
      setNextUpdate(data.time_next_update_utc)
      setError(null)
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(
        err.message.includes('YOUR_API_KEY')
          ? 'Please add your ExchangeRate-API key in src/hooks/useExchangeRates.js'
          : `Failed to fetch rates: ${err.message}`
      )
    } finally {
      setLoading(false)
    }
  }, [baseCurrency])

  // Initial fetch + auto-refresh every 10 minutes
  useEffect(() => {
    fetchRates(baseCurrency)

    intervalRef.current = setInterval(() => {
      fetchRates(baseCurrency, true)
    }, 10 * 60 * 1000)

    return () => {
      clearInterval(intervalRef.current)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [baseCurrency, fetchRates])

  const convert = useCallback((amount, fromCurrency, toCurrency, currentRates) => {
    if (!currentRates || !amount || isNaN(amount) || parseFloat(amount) <= 0) return null

    const amt = parseFloat(amount)

    if (fromCurrency === toCurrency) return amt

    // If fromCurrency matches base, direct conversion
    if (currentRates[toCurrency]) {
      return amt * currentRates[toCurrency]
    }

    return null
  }, [])

  const getRate = useCallback((toCurrency, currentRates) => {
    if (!currentRates || !currentRates[toCurrency]) return null
    return currentRates[toCurrency]
  }, [])

  const refetch = useCallback(() => fetchRates(baseCurrency, true), [baseCurrency, fetchRates])

  return {
    rates,
    loading,
    error,
    lastUpdated,
    nextUpdate,
    fetchRates,
    convert,
    getRate,
    refetch,
  }
}
