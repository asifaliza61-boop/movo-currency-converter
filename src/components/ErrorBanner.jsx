import { AlertCircle, X } from 'lucide-react'

const ErrorBanner = ({ message, onDismiss }) => {
  if (!message) return null
  return (
    <div className="flex items-start gap-3 bg-red-950/60 border border-red-800/50 rounded-xl p-4 mb-4 animate-slide-up">
      <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
      <p className="text-red-300 text-sm font-medium flex-1">{message}</p>
      {onDismiss && (
        <button onClick={onDismiss} className="text-red-400 hover:text-red-200 transition-colors">
          <X size={16} />
        </button>
      )}
    </div>
  )
}

export default ErrorBanner
