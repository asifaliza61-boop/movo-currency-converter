import { useState, useCallback, useRef, useEffect } from 'react'
import { ArrowLeftRight, RefreshCw, TrendingUp } from 'lucide-react'
import { useExchangeRates } from '../hooks/useExchangeRates'
import { useAppContext } from '../context/AppContext'
import { CURRENCIES, POPULAR_CURRENCIES, formatAmount } from '../utils/currencies'
import LiveBadge from '../components/LiveBadge'
import ErrorBanner from '../components/ErrorBanner'

const ConverterPage = () => {
  const [fromCurrency, setFromCurrency] = useState('PKR')
  const [toCurrency, setToCurrency]     = useState('USD')
  const [amount, setAmount]             = useState('')
  const [result, setResult]             = useState(null)
  const [error, setError]               = useState(null)
  const [swapping, setSwapping]         = useState(false)
  const [justConverted, setJustConverted] = useState(false)

  const amountRef = useRef(null)
  const { addToHistory } = useAppContext()

  const {
    rates,
    loading,
    error: apiError,
    lastUpdated,
    refetch,
    convert,
    getRate,
    fetchRates,
  } = useExchangeRates(fromCurrency)

  // When fromCurrency changes, refetch rates for new base
  useEffect(() => {
    fetchRates(fromCurrency)
  }, [fromCurrency, fetchRates])

  // Clear result when inputs change
  useEffect(() => {
    setResult(null)
    setJustConverted(false)
  }, [amount, fromCurrency, toCurrency])

  const handleConvert = useCallback(() => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount greater than zero.')
      return
    }
    if (loading) return

    const converted = convert(parseFloat(amount), fromCurrency, toCurrency, rates)
    if (converted === null) {
      setError('Conversion failed. Rate not available for selected currency.')
      return
    }

    setResult(converted)
    setJustConverted(true)
    setError(null)

    // Log to history
    addToHistory({
      fromCurrency,
      toCurrency,
      amount: parseFloat(amount),
      result: converted,
      rate: getRate(toCurrency, rates),
      fromName: CURRENCIES[fromCurrency]?.name,
      toName: CURRENCIES[toCurrency]?.name,
      fromFlag: CURRENCIES[fromCurrency]?.flag,
      toFlag: CURRENCIES[toCurrency]?.flag,
    })
  }, [amount, fromCurrency, toCurrency, rates, loading, convert, getRate, addToHistory])

  const handleSwap = useCallback(() => {
    setSwapping(true)
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setResult(null)
    setAmount(result !== null ? result.toFixed(2) : amount)
    setTimeout(() => setSwapping(false), 300)
    amountRef.current?.focus()
  }, [fromCurrency, toCurrency, result, amount])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleConvert()
  }

  const liveRate = getRate(toCurrency, rates)
  const currencies = Object.entries(CURRENCIES)

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="mb-10">
        <div className="mb-5">
          <LiveBadge lastUpdated={lastUpdated} loading={loading} />
        </div>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none mb-4">
          Convert <span className="text-lime">Any</span><br />
          Currency,{' '}
          <span className="italic font-black text-white/60">Instantly.</span>
        </h1>
        <p className="text-muted text-lg font-medium max-w-md leading-relaxed">
          Real-time exchange rates from ExchangeRate-API. Base currency: Pakistani Rupee (PKR).
        </p>
      </div>

      <ErrorBanner message={error || apiError} onDismiss={() => { setError(null) }} />

      {/* Main Converter Card */}
      <div className="card p-6 sm:p-8 mb-6">

        {/* Amount input */}
        <div className="mb-5">
          <p className="field-label">Amount</p>
          <div className="input-wrap">
            <input
              ref={amountRef}
              type="number"
              min="0"
              step="any"
              placeholder="Enter amount…"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={handleKeyDown}
              className="amount-input placeholder:text-white/20"
              autoFocus
            />
          </div>
        </div>

        {/* Currency pair row */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end mb-6">
          {/* FROM */}
          <div>
            <p className="field-label">From</p>
            <div className="input-wrap">
              <select
                className="currency-select"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencies.map(([code, { name, flag }]) => (
                  <option key={code} value={code} style={{ background: '#1A1A1A' }}>
                    {flag} {code} — {name}
                  </option>
                ))}
              </select>
              <div className="text-xs text-muted font-medium mt-1">
                {CURRENCIES[fromCurrency]?.flag} {CURRENCIES[fromCurrency]?.name}
              </div>
            </div>
          </div>

          {/* Swap button */}
          <button
            onClick={handleSwap}
            className={`w-12 h-12 rounded-full bg-lime flex items-center justify-center self-end mb-0 sm:mb-0
                        transition-all duration-200 hover:bg-lime-hover hover:scale-110 active:scale-95
                        ${swapping ? 'rotate-180' : ''}`}
            title="Swap currencies"
          >
            <ArrowLeftRight size={18} className="text-dark" strokeWidth={2.5} />
          </button>

          {/* TO */}
          <div>
            <p className="field-label">To</p>
            <div className="input-wrap">
              <select
                className="currency-select"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currencies.map(([code, { name, flag }]) => (
                  <option key={code} value={code} style={{ background: '#1A1A1A' }}>
                    {flag} {code} — {name}
                  </option>
                ))}
              </select>
              <div className="text-xs text-muted font-medium mt-1">
                {CURRENCIES[toCurrency]?.flag} {CURRENCIES[toCurrency]?.name}
              </div>
            </div>
          </div>
        </div>

        {/* Rate display */}
        {liveRate !== null && !loading && (
          <div className="flex items-center justify-between bg-dark rounded-xl border border-dark-border p-4 mb-5">
            <div>
              <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-1">Live Rate</p>
              <p className="text-sm font-bold">
                1 {fromCurrency} ={' '}
                <span className="text-lime">{formatAmount(liveRate, 4)}</span>{' '}
                {toCurrency}
              </p>
            </div>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 text-xs text-muted hover:text-lime transition-colors font-semibold"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        )}

        {/* Convert button */}
        <button
          className="btn-primary"
          onClick={handleConvert}
          disabled={loading || !amount}
        >
          {loading
            ? '⏳ Fetching Live Rates…'
            : `Convert ${fromCurrency} → ${toCurrency}`}
        </button>
      </div>

      {/* Result Card */}
      {result !== null && justConverted && (
        <div className="card p-6 sm:p-8 border-lime/30 bg-lime/5 mb-6 animate-slide-up">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-lime/60 font-bold uppercase tracking-widest mb-2">Converted Result</p>
              <p className="text-muted text-sm font-medium mb-1">
                {formatAmount(parseFloat(amount), 2)} {fromCurrency} =
              </p>
              <p className="text-4xl sm:text-5xl font-black text-lime tracking-tighter">
                {formatAmount(result, 2)}
                <span className="text-2xl text-lime/70 ml-2">{toCurrency}</span>
              </p>
              <p className="text-muted text-xs mt-3 font-medium">
                Rate: 1 {fromCurrency} = {formatAmount(liveRate, 6)} {toCurrency}
              </p>
            </div>
            <div className="bg-lime/10 rounded-2xl p-3 shrink-0">
              <TrendingUp size={28} className="text-lime" />
            </div>
          </div>
          <p className="text-xs text-muted/60 mt-4 font-medium">
            ✓ Saved to History
          </p>
        </div>
      )}

      {/* Popular Rates Grid */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <p className="field-label m-0">Popular Rates (1 {fromCurrency} =)</p>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-1.5 text-xs text-muted hover:text-lime transition-colors font-semibold"
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            Refresh all
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {POPULAR_CURRENCIES.filter((c) => c !== fromCurrency).map((code) => {
            const rate = rates[code]
            const { flag } = CURRENCIES[code] || {}
            return (
              <button
                key={code}
                className="rate-card text-left"
                onClick={() => setToCurrency(code)}
              >
                <p className="text-lg mb-1">{flag}</p>
                <p className="text-xs font-bold text-muted uppercase tracking-wider">{code}</p>
                <p className="text-base font-black text-white mt-0.5">
                  {loading
                    ? <span className="skeleton h-4 w-16 block" />
                    : rate ? formatAmount(rate, rate < 1 ? 6 : 2) : '—'
                  }
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ConverterPage
