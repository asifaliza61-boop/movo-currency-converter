const LiveBadge = ({ lastUpdated, loading }) => {
  const formatDate = (utcStr) => {
    if (!utcStr) return '—'
    try {
      return new Date(utcStr).toLocaleString('en-PK', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    } catch {
      return utcStr
    }
  }

  return (
    <div className="badge-live">
      <span
        className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-yellow-400 animate-pulse' : 'bg-lime animate-pulse-slow'}`}
      />
      <span>
        {loading
          ? 'Fetching live rates…'
          : `Live · Updated ${formatDate(lastUpdated)}`}
      </span>
    </div>
  )
}

export default LiveBadge
