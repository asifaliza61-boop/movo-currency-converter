// LocalStorage helpers for persisting history and cache
const HISTORY_KEY = 'movo_conversion_history'
const RATES_CACHE_KEY = 'movo_rates_cache'
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

export const saveHistory = (history) => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch (e) {
    console.warn('Could not save history to localStorage', e)
  }
}

export const loadHistory = () => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY)
  } catch (e) {
    console.warn('Could not clear history', e)
  }
}

export const saveCacheRates = (base, data) => {
  try {
    const existing = loadCacheAll()
    existing[base] = { data, timestamp: Date.now() }
    localStorage.setItem(RATES_CACHE_KEY, JSON.stringify(existing))
  } catch (e) {
    console.warn('Could not cache rates', e)
  }
}

export const loadCacheRates = (base) => {
  try {
    const all = loadCacheAll()
    const entry = all[base]
    if (!entry) return null
    if (Date.now() - entry.timestamp > CACHE_TTL) return null
    return entry.data
  } catch {
    return null
  }
}

const loadCacheAll = () => {
  try {
    const raw = localStorage.getItem(RATES_CACHE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}
