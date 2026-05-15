import { useState } from 'react'
import { Trash2, X, BarChart2, Clock, TrendingUp, Download } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { formatAmount } from '../utils/currencies'

const HistoryPage = () => {
  const { history, removeFromHistory, clearHistory } = useAppContext()
  const [filter, setFilter] = useState('')
  const [confirmClear, setConfirmClear] = useState(false)

  const filteredHistory = history.filter((item) => {
    const q = filter.toLowerCase()
    return (
      item.fromCurrency?.toLowerCase().includes(q) ||
      item.toCurrency?.toLowerCase().includes(q) ||
      item.fromName?.toLowerCase().includes(q) ||
      item.toName?.toLowerCase().includes(q)
    )
  })

  const formatTimestamp = (iso) => {
    try {
      const d = new Date(iso)
      return {
        date: d.toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: d.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      }
    } catch {
      return { date: '—', time: '—' }
    }
  }

  const downloadCSV = () => {
    const headers = ['Date','Time','From','To','Amount','Result','Rate']
    const rows = history.map((h) => {
      const { date, time } = formatTimestamp(h.timestamp)
      return [date, time, h.fromCurrency, h.toCurrency,
              h.amount, h.result?.toFixed(4), h.rate?.toFixed(6)]
    })
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `movo-history-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Stats
  const totalConversions = history.length
  const uniquePairs = new Set(history.map((h) => `${h.fromCurrency}-${h.toCurrency}`)).size
  const mostUsed = history.length > 0
    ? history.reduce((acc, h) => {
        const key = `${h.fromCurrency}→${h.toCurrency}`
        acc[key] = (acc[key] || 0) + 1
        return acc
      }, {})
    : {}
  const topPair = Object.entries(mostUsed).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8">
        <div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter leading-none mb-3">
            Conversion <span className="text-lime">History</span>
          </h1>
          <p className="text-muted font-medium">
            {totalConversions} conversions recorded · Persisted locally
          </p>
        </div>
        {history.length > 0 && (
          <div className="flex items-center gap-2">
            <button onClick={downloadCSV} className="btn-outline flex items-center gap-2">
              <Download size={14} />
              Export CSV
            </button>
            {confirmClear ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted font-medium">Sure?</span>
                <button
                  onClick={() => { clearHistory(); setConfirmClear(false) }}
                  className="px-3 py-2 rounded-lg bg-red-900/60 border border-red-700/50 text-red-300 text-xs font-bold hover:bg-red-800/60 transition-colors"
                >
                  Yes, clear
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="px-3 py-2 rounded-lg border border-dark-border text-muted text-xs font-bold hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="btn-outline flex items-center gap-2 hover:border-red-700 hover:text-red-400"
              >
                <Trash2 size={14} />
                Clear All
              </button>
            )}
          </div>
        )}
      </div>

      {/* Stats */}
      {history.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {[
            { icon: BarChart2, label: 'Total Conversions', value: totalConversions },
            { icon: TrendingUp, label: 'Unique Pairs',       value: uniquePairs },
            { icon: Clock,      label: 'Most Used Pair',     value: topPair, small: true },
          ].map(({ icon: Icon, label, value, small }) => (
            <div key={label} className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className="text-lime" />
                <p className="text-xs text-muted font-bold uppercase tracking-wider">{label}</p>
              </div>
              <p className={`font-black text-white ${small ? 'text-base' : 'text-2xl'}`}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Search / Filter */}
      {history.length > 0 && (
        <div className="mb-5">
          <input
            type="text"
            placeholder="Filter by currency code or name…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-sm font-medium text-white
                       placeholder:text-muted focus:outline-none focus:border-lime/40 transition-colors font-urbanist"
          />
        </div>
      )}

      {/* Empty state */}
      {history.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-dark-card border border-dark-border rounded-2xl flex items-center justify-center mb-5">
            <BarChart2 size={28} className="text-muted" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No conversions yet</h3>
          <p className="text-muted text-sm max-w-xs">
            Head to the Converter and make your first conversion — it will appear here instantly.
          </p>
        </div>
      )}

      {/* Filter no results */}
      {history.length > 0 && filteredHistory.length === 0 && (
        <div className="text-center py-16 text-muted text-sm font-medium">
          No results for "{filter}"
        </div>
      )}

      {/* History list */}
      <div className="flex flex-col gap-3">
        {filteredHistory.map((item) => {
          const { date, time } = formatTimestamp(item.timestamp)
          return (
            <div key={item.id} className="history-item group">
              {/* Left: flag + currencies */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex -space-x-1">
                  <span className="text-xl">{item.fromFlag}</span>
                  <span className="text-xl">{item.toFlag}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-base font-black text-white">
                      {formatAmount(item.amount, 2)} {item.fromCurrency}
                    </span>
                    <span className="text-lime font-black">→</span>
                    <span className="text-base font-black text-lime">
                      {formatAmount(item.result, item.result < 1 ? 4 : 2)} {item.toCurrency}
                    </span>
                  </div>
                  <p className="text-xs text-muted font-medium mt-0.5">
                    Rate: 1 {item.fromCurrency} = {formatAmount(item.rate, 6)} {item.toCurrency}
                  </p>
                </div>
              </div>

              {/* Right: time + delete */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-muted font-semibold">{date}</p>
                  <p className="text-xs text-muted/60 font-medium">{time}</p>
                </div>
                <button
                  onClick={() => removeFromHistory(item.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg
                             text-muted hover:text-red-400 hover:bg-red-900/20"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HistoryPage
