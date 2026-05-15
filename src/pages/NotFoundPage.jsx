import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
    <h1 className="text-8xl font-black text-lime tracking-tighter mb-4">404</h1>
    <p className="text-xl font-bold text-white mb-2">Page not found</p>
    <p className="text-muted text-sm mb-8">The page you're looking for doesn't exist.</p>
    <Link
      to="/"
      className="px-6 py-3 bg-lime text-dark font-bold rounded-xl hover:bg-lime-hover transition-colors"
    >
      ← Back to Converter
    </Link>
  </div>
)

export default NotFoundPage
